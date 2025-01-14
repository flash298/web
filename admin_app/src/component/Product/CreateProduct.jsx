import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import categoryAPI from '../Api/categoryAPI';
import isEmpty from 'validator/lib/isEmpty'
import productAPI from '../Api/productAPI';

function CreateProduct(props) {
    const [category, setCategory] = useState([])
    const [link, setLink] = useState('');
    const [gender] = useState(["Unisex", "Male", "Female"])
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [sale, setSale] = useState('');
    const [description, setDescription] = useState('');
    const [number, setNumber] = useState('');
    const [categoryChoose, setCategoryChoose] = useState('');
    const [genderChoose, setGenderChoose] = useState('Unisex');
    const [file, setFile] = useState();
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("");
    const [validationMsg, setValidationMsg] = useState('');
    const [details, setDetails] = useState([{ key: '', value: '' }]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const { handleSubmit } = useForm();


    useEffect(() => {
        const fetchAllData = async () => {
            const ct = await categoryAPI.getAPI()
            setCategory(ct)
        }
        fetchAllData()
    }, [])

    const saveFile = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        const previews = selectedFiles.map(file =>
            URL.createObjectURL(file)
        );
        setImagePreviews(previews);
    };

    const onChangeNumber = (e) => {
        const value = e.target.value
        if (!Number.isNaN(value) && Number(value) >= 0) {
            setNumber(value)
        }
    }

    const onChangePrice = (e) => {
        const value = e.target.value
        if (!Number.isNaN(value) && Number(value) > 0) {
            setPrice(value)
        }
    }

    const onChangeSale = (e) => {
        const value = e.target.value
        if (!Number.isNaN(value) && Number(value) > 0) {
            setSale(value)
        }
    }

    


    const validateAll = () => {
        const priceRegex = /^[1-9](?=.+[0-9]).{0,}$/
        let msg = {}
        if (isEmpty(name)) {
            msg.name = "Tên không được để trống"
        }
        if (isEmpty(price)) {
            msg.price = "Giá không được để trống"
        } else if (!priceRegex.test(price)) {
            msg.price = "Giá sai định dạng"
        }
        if (isEmpty(description)) {
            msg.description = "Mô tả không được để trống"
        }

        if(isEmpty(link)) {
            msg.link = "Link sản phẩm không được để trống"
        }
        // if (isEmpty(number)) {
        //     msg.number = "Số lượng không được để trống"
        // } else if (!priceRegex.test(number)) {
        //     msg.number = "Số lượng sai định dạng"
        // }
        if (isEmpty(categoryChoose)) {
            msg.category = "Vui lòng chọn loại"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleCreate = () => {

        const isValid = validateAll();
        if (!isValid) return
        console.log(file)
        addProduct();

    }

    const handleAddDetail = () => {
        setDetails([...details, { key: '', value: '' }]);
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...details];
        updatedDetails[index][field] = value;
        setDetails(updatedDetails);
    };
    
    const handleRemoveDetail = (index) => {
        const updatedDetails = details.filter((_, i) => i !== index);
        setDetails(updatedDetails);
    };

    const addProduct = async () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("fileName", fileName);
        formData.append("link", link);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("sale", sale);
        formData.append("category", categoryChoose);
        formData.append("description", description);
        formData.append("gender", genderChoose);
        formData.append("details", JSON.stringify(details));
    
        const response = await productAPI.create(formData);
    
        if (response.msg === "Bạn đã thêm thành công") {
            setName('');
            setPrice('');
            setSale('');
            setDescription('');
            setCategoryChoose('');
            setGenderChoose('Unisex');
            setFiles([]);
            setFileName('');
            setLink('');
            setDetails([{ key: '', value: '' }]);
            window.scrollTo(0, 0);
        }
        setValidationMsg({ api: response.msg });
    };
    
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Create Product</h4>
                                {
                                    validationMsg.api === "Bạn đã thêm thành công" ?
                                        (
                                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                {validationMsg.api}
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                        ) :
                                        (
                                            <p className="form-text text-danger">{validationMsg.api}</p>
                                        )
                                }


                                <form onSubmit={handleSubmit(handleCreate)}>
                                    <div className="form-group w-50">
                                        <label htmlFor="name">Tên Sản Phẩm</label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.name}</p>
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="name">Link Sản Phẩm</label>
                                        <input type="text" className="form-control" id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)} required />
                                        <p className="form-text text-danger">{validationMsg.link}</p>
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="price">Giá Sản Phẩm</label>
                                        <input type="text" className="form-control" id="price" name="price" value={price} onChange={(e) => onChangePrice(e)} required />
                                        <p className="form-text text-danger">{validationMsg.price}</p>
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="price">Giá Sale</label>
                                        <input type="text" className="form-control" id="price" name="price" value={price} onChange={(e) => onChangeSale(e)} required />
                                        <p className="form-text text-danger">{validationMsg.sale}</p>
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="description">Mô tả</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            rows="5"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                        <p className="form-text text-danger">{validationMsg.description}</p>
                                    </div>
                                    {/* <div className="form-group w-50">
                                        <label htmlFor="number">Số lượng: </label>
                                        <input type="number" className="form-control" id="number" name="number" value={number} onChange={(e) => onChangeNumber(e)} required />
                                        <p className="form-text text-danger">{validationMsg.number}</p>
                                    </div> */}

                                    <div className="form-group w-50">
                                        {/* <label htmlFor="categories" className="mr-2">Chọn loại:</label> */}
                                        <label htmlFor="categories" className="mr-2">Chọn phân loại:</label>
                                        <select name="categories" id="categories" value={categoryChoose} onChange={(e) => setCategoryChoose(e.target.value)}>
                                            <option >Chọn loại</option>
                                            {
                                                category && category.map((item, index) => (
                                                    <option value={item._id} key={index} >{item.category}</option>
                                                ))
                                            }

                                        </select>
                                        <p className="form-text text-danger">{validationMsg.category}</p>
                                    </div>

                                    {/* <div className="form-group w-50">
                                        <label htmlFor="gender" className="mr-2">Chọn giới tính:</label>
                                        <select name="gender" id="gender" value={genderChoose} onChange={(e) => setGenderChoose(e.target.value)}>
                                            {
                                                gender && gender.map((item, index) => (
                                                    <option value={item} key={index}>{item}</option>
                                                ))
                                            }

                                        </select>
                                    </div> */}

                                    <div className="form-group w-50">
                                        <label>Chi tiết sản phẩm</label>
                                        {details.map((detail, index) => (
                                            <div key={index} className="d-flex align-items-center mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control mr-2"
                                                    placeholder="Tên chi tiết (e.g., Kích thước)"
                                                    value={detail.key}
                                                    onChange={(e) => handleDetailChange(index, 'key', e.target.value)}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control mr-2"
                                                    placeholder="Giá trị chi tiết (e.g., Lớn)"
                                                    value={detail.value}
                                                    onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveDetail(index)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-secondary" onClick={handleAddDetail}>
                                            Thêm chi tiết
                                        </button>
                                    </div>

                                    <div className="form-group w-50">
                                        <label>Hình Ảnh</label>
                                        <input type="file" className="form-control-file" name="file" onChange={saveFile} multiple />
                                        <div className="mt-3">
                                            {imagePreviews.length > 0 && (
                                                <div className="d-flex">
                                                    {imagePreviews.map((preview, index) => (
                                                        <img key={index} src={preview} alt="Preview" style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 10 }} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Create Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by <a href="https://wrappixel.com">WrapPixel</a>.
            </footer>
        </div>
    );
}

export default CreateProduct;