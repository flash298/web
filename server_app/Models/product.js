var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_category: {
            type: String,
            ref: 'Category'
        },
        name_product: String,
        price_product: String,
        sale_product: String,
        images: [String],
        describe: String,
        gender: String,
        link: String
        // number: Number,
    }
);

var Products = mongoose.model('Products', schema, 'product');

module.exports = Products;