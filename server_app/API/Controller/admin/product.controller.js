const Detail_Product = require('../../../Models/detail_product');
const Products = require('../../../Models/product');
const Product = require('../../../Models/product')

module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Product.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const products = await Product.find().populate('id_category');


    if (!keyWordSearch) {
        res.json({
            products: products.slice(start, end),
            totalPage: totalPage
        })

    } else {
        var newData = products.filter(value => {
            return value.name_product?.toUpperCase().indexOf(keyWordSearch?.toString()?.toUpperCase()) !== -1 ||
                value.price_product?.toUpperCase().indexOf(keyWordSearch?.toString()?.toUpperCase()) !== -1 ||
                value.id.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
            // value.id_category.category.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            products: newData.slice(start, end),
            totalPage: totalPage
        })
    }
}

module.exports.create = async (req, res) => {
    try {
        const product = await Product.find();

        const productFilter = product.filter((c) => {
            return c.name_product.toUpperCase() === req.body.name.toUpperCase().trim();
        });

        if (productFilter.length > 0) {
            res.json({ msg: 'Sản phẩm đã tồn tại' });
        } else {
            var newProduct = new Product();
            req.body.name = req.body.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase(); });
            newProduct.name_product = req.body.name;
            newProduct.price_product = req.body.price;
            newProduct.sale_product = req.body.sale;
            newProduct.id_category = req.body.category;
            newProduct.describe = req.body.description;
            newProduct.gender = req.body.gender;
            newProduct.link = req.body.link;

            if (req.files && req.files.files) {
                let images = [];
                req.files.files.forEach(file => {
                    var fileName = file.name;
                    var fileProduct = "/img/" + fileName;
                    images.push("http://localhost:8000" + fileProduct);
                    file.mv('./public/img/' + fileName);
                });
                newProduct.images = images; // Lưu mảng ảnh
            } else {
                newProduct.images = ['http://localhost:8000/img/nophoto.jpg'];
            }

            const savedProduct = await newProduct.save(); // Lưu sản phẩm mới vào bảng Products

            console.log("details ", req.body.details);
            let d = req.body.details;
            console.log("type of details: ", typeof d);
            if (typeof d === 'string') {
                console.log("vao day");
                d = JSON.parse(d);
            }
            // Lưu chi tiết sản phẩm (Detail_Product)
            if (req.body.details && Array.isArray(d)) {
                console.log("vao")
                const details = d.map(detail => ({
                    id_product: savedProduct._id, // Liên kết với sản phẩm vừa lưu
                    type: detail.key,
                    value: detail.value
                }));
    
                try {
                    await Detail_Product.insertMany(details);
                    const allDetails = await Detail_Product.find({ id_product: savedProduct._id });
                    console.log("added details: ", allDetails);
                } catch (err) {
                    console.error("Lỗi khi lưu chi tiết sản phẩm: ", err);
                    return res.status(500).json({ msg: "Đã xảy ra lỗi khi lưu chi tiết sản phẩm" });
                }
            }

            res.json({ msg: "Bạn đã thêm thành công" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Đã xảy ra lỗi khi thêm sản phẩm" });
    }
};

module.exports.delete = async (req, res) => {
    const id = req.query.id;

    await Product.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: err })
            return;
        }
        res.json({ msg: "Thanh Cong" })
    })
    
}

module.exports.details = async (req, res) => {
    const id = req.params.id

    const product = await Products.findOne({ _id: id })

    const productDetails = await Detail_Product.find({ id_product: id });

    const response = {
        ...product.toObject(),
        details: productDetails
    };

    res.json(response);
}

module.exports.update = async (req, res) => {
    try {
        const { id, name, price, sale, category, description, gender, link, details } = req.body;
        console.log(req.body);
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
        }

        const existingProduct = await Product.findOne({
            name_product: name.trim().toUpperCase(),
            _id: { $ne: id },
        });

        if (existingProduct) {
            return res.status(400).json({ msg: 'Sản phẩm đã tồn tại' });
        }

        // Format the name
        const formattedName = name.toLowerCase().replace(/^.|\s\S/g, (a) => a.toUpperCase());

        // Handle file uploads if provided
        let images = product.images; // Preserve existing images if no new ones are uploaded
        if (req.files && req.files.files) {
            images = req.files.files.map((file) => {
                const fileName = file.name;
                const filePath = `/img/${fileName}`;
                file.mv(`./public/img/${fileName}`);
                return `http://localhost:8000${filePath}`;
            });
        }

        // Update product fields
        product.name_product = formattedName;
        product.price_product = price;
        product.sale_product = sale;
        product.id_category = category;
        product.describe = description;
        product.gender = gender;
        product.link = link;
        product.images = images;

        await product.save();

        // Update product details if provided
        console.log("details ", req.body.details);
        let parsedDetails = details;
        if (typeof details === 'string') {
            parsedDetails = JSON.parse(details);
        }

        if (Array.isArray(parsedDetails)) {
            // Remove old details
            await Detail_Product.deleteMany({ id_product: id });

            // Add new details
            const newDetails = parsedDetails.map((detail) => ({
                id_product: id,
                type: detail.type,
                value: detail.value,
            }));
            await Detail_Product.insertMany(newDetails);
        }

        res.json({ msg: 'Bạn đã update thành công', product });
    } catch (err) {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        res.status(500).json({ msg: 'Đã xảy ra lỗi khi cập nhật sản phẩm' });
    }
};
