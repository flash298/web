import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Product from '../../API/Product';
import { Link } from 'react-router-dom';

Home_Product.propTypes = {
    gender: PropTypes.string,
    category: PropTypes.string,
    GET_id_modal: PropTypes.func
};

Home_Product.defaultProps = {
    gender: '',
    category: '',
    GET_id_modal: null
}

function Home_Product(props) {
    const { gender, category } = props;
    const [products, set_products] = useState([]);

    // Gọi API lấy danh sách sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            const response = await Product.Get_Random(category);
            set_products(response);
        };
        fetchData();
    }, [category]);

    // Chia sản phẩm thành các nhóm 4 sản phẩm
    const groupedProducts = [];
    for (let i = 0; i < products.length; i += 4) {
        groupedProducts.push(products.slice(i, i + 4));
    }

    return (
        <section className="product-area li-laptop-product pt-60 pb-45">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="li-section-title">
                            <h2>
                                <span>{gender}</span>
                            </h2>
                        </div>
                        {groupedProducts.map((group, index) => (
                            <div className="row" key={index}>
                                {group.map(value => (
                                    <div className="col-lg-3 col-md-4 col-sm-6 mt-40" key={value._id}>
                                        <div className="single-product-wrap">
                                            <div className="product-image">
                                                <Link to={`/detail/${value._id}`}>
                                                    <img src={value.image || value.images?.[0]} alt={value.name_product} />
                                                </Link>
                                                <span className="sticker">New</span>
                                            </div>
                                            <div className="product_desc">
                                                <div className="product_desc_info">
                                                    <h5 className="manufacturer">
                                                        <Link to={`/detail/${value._id}`}>{value.name_product}</Link>
                                                    </h5>
                                                    <div className="price-box">
                                                        <span className="new-price">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.price_product)}
                                                        </span> 
                                                        <span style={{ color: 'red' }}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value.sale_product)}
                                                        </span> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home_Product;
