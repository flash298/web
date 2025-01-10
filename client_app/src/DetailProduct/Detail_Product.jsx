import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { useParams } from 'react-router';
import Product from '../API/Product';
import { useDispatch, useSelector } from 'react-redux';
import { stringify } from 'query-string';
import { addCart } from '../Redux/Action/ActionCart';
import { changeCount } from '../Redux/Action/ActionCount';
import { Link } from 'react-router-dom';
import Cart from '../API/CartAPI';
import CommentAPI from '../API/CommentAPI';
import CartsLocal from '../Share/CartsLocal';
import SaleAPI from '../API/SaleAPI';

Detail_Product.propTypes = {

};

function Detail_Product(props) {

    const { id } = useParams()

    const [product, set_product] = useState({})
    const [mainImage, setMainImage] = useState("");

    const dispatch = useDispatch()

    //id_user được lấy từ redux
    const id_user = useSelector(state => state.Cart.id_user)

    // Get count từ redux khi user chưa đăng nhập
    const count_change = useSelector(state => state.Count.isLoad)

    const [sale, setSale] = useState()

    // Hàm này dùng để gọi API hiển thị sản phẩm
    useEffect(() => {

        const fetchData = async () => {

            const response = await Product.Get_Detail_Product(id)

            set_product(response)
            setMainImage(response.images?.[0] || response.image);

            const resDetail = await SaleAPI.checkSale(id)
            
            if (resDetail.msg === "Thanh Cong"){
                setSale(resDetail.sale)
            }

        }

        fetchData()

    }, [id])

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const [count, set_count] = useState(1)

    const [show_success, set_show_success] = useState(false)

    const [size, set_size] = useState('S')

    // Hàm này dùng để thêm vào giỏ hàng
    const handler_addcart = (e) => {

        e.preventDefault()
        window.open(product?.link)

        // const data = {
        //     id_cart: Math.random().toString(),
        //     id_product: id,
        //     name_product: product.name_product,
        //     price_product: sale ? parseInt(sale.id_product.price_product) - ((parseInt(sale.id_product.price_product) * parseInt(sale.promotion)) / 100) : product.price_product,
        //     count: count,
        //     image: product.image,
        //     size: size,
        // }

        // CartsLocal.addProduct(data)

        // const action_count_change = changeCount(count_change)
        // dispatch(action_count_change)

        // set_show_success(true)

        // setTimeout(() => {
        //     set_show_success(false)
        // }, 1000)

    }



    // Hàm này dùng để giảm số lượng
    const downCount = () => {
        if (count === 1) {
            return
        }

        set_count(count - 1)
    }

    const upCount = () => {
        set_count(count + 1)
    }


    // State dùng để mở modal
    const [modal, set_modal] = useState(false)

    // State thông báo lỗi comment
    const [error_comment, set_error_comment] = useState(false)

    const [star, set_star] = useState(1)

    const [comment, set_comment] = useState('')

    const [validation_comment, set_validation_comment] = useState(false)

    // state load comment
    const [load_comment, set_load_comment] = useState(true)

    // State list_comment
    const [list_comment, set_list_comment] = useState([])

    // Hàm này dùng để gọi API post comment sản phẩm của user
    const handler_Comment = () => {

        if (!sessionStorage.getItem('id_user')) { // Khi khách hàng chưa đăng nhập

            set_error_comment(true)

        } else { // Khi khách hàng đã đăng nhập

            if (!comment) {
                set_validation_comment(true)
                return
            }

            const data = {
                id_user: sessionStorage.getItem('id_user'),
                content: comment,
                star: star
            }

            const post_data = async () => {

                const response = await CommentAPI.post_comment(data, id)

                console.log(response)

                set_load_comment(true)

                set_comment('')

                set_modal(false)

            }

            post_data()

        }

        setTimeout(() => {
            set_error_comment(false)
        }, 1500)

    }


    // Hàm này dùng để GET API load ra những comment của sản phẩm
    useEffect(() => {

        if (load_comment) {
            const fetchData = async () => {

                const response = await CommentAPI.get_comment(id)

                set_list_comment(response)

            }

            fetchData()

            set_load_comment(false)
        }

    }, [load_comment])


    return (
        <div>
            {
                show_success &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Bạn Đã Thêm Hàng Thành Công!</h4>
                    </div>
                </div>
            }
            {
                error_comment &&
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i className="fa fa-bell fix_icon_bell" style={{ fontSize: '40px', color: '#fff', backgroundColor: '#f84545' }}></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: '#fff' }}>Vui Lòng Kiểm Tra Lại Đăng Nhập!</h4>
                    </div>
                </div>
            }


            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Chi tiết sản phẩm</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper">
                <div className="container">
                    <div className="row single-product-area">
                        <div className="col-lg-5 col-md-6">
                            <div className="product-details-left">
                                <div className="product-details-images slider-navigation-1">
                                    <div className="lg-image">
                                        <img src={mainImage} alt="product image" />
                                    </div>
                                    <div className="product-thumbnails" style={{ marginLeft: "20px"}}>
                                    {product.images?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`thumbnail-${index}`}
                                            className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                                            onClick={() => handleImageClick(image)}
                                            style={{
                                                cursor: 'pointer',
                                                width: '70px',
                                                height: '70px',
                                                margin: '5px',
                                                border: mainImage === image ? '2px solid #000' : '1px solid #ccc',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ))}
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-6">
                            <div className="product-details-view-content pt-60">
                                <div className="product-info">
                                    <h2>{product.name_product}</h2>
                                    <div className="price-box pt-20">
                                        {
                                            sale ? (<del className="new-price new-price-2" style={{ color: '#525252'}}>{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(product.price_product)+ ' VNĐ'}</del>) :
                                            <span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'}).format(product.price_product)+ ' VNĐ'}</span>
                                        }
                                        <br />
                                        {
                                            sale && (
                                                <span className="new-price new-price-2">{new Intl.NumberFormat('vi-VN',{style: 'decimal',decimal: 'VND'})
                                                .format(parseInt(sale.id_product.price_product) - ((parseInt(sale.id_product.price_product) * parseInt(sale.promotion)) / 100)) + ' VNĐ'}</span>
                                            )
                                        }
                                    </div>
                                    <div className="product-desc">
                                        <p>
                                            <span  style={{ whiteSpace: "pre-wrap" }}>{product.describe}</span>
                                        </p>
                                    </div>
                                    {/* <div className="product-desc">
                                        <p>
                                        Link shopee: <a href={product.link} target="_blank" rel="noopener noreferrer">{product.link?.slice(0, 50)}...</a>
                                        </p>
                                    </div> */}
                                    <div className="single-add-to-cart">
                                        <form action="#" className="cart-quantity">
                                            
                                            <a target="_blank" href="#" className="add-to-cart" type="submit" onClick={handler_addcart}>Mua sản phẩm</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-area pt-35" style={{ marginLeft: "40px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-product-tab">
                                <ul className="nav li-product-menu">
                                    <li><a className="active" data-toggle="tab" href="#description"><span>Chi tiết sản phẩm</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="description" className="tab-pane active show" role="tabpanel">
                            <div className="product-description">
                            <ul>
                                {product.details?.map((detail, index) => (
                                    <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                        <strong style={{ display: "inline-block", width: "100px", fontWeight: "bold" }}>
                                            {detail.type}
                                        </strong>
                                        {detail.value}
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail_Product;