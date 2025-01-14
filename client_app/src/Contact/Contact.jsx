import React from 'react';
import PropTypes from 'prop-types';

Contact.propTypes = {

};

function Contact(props) {
    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Trang chủ</a></li>
                            <li className="active">Liên hệ</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
                <div className="container mb-60">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.604284915344!2d105.84861567508035!3d21.00849378063583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a923b2add%3A0xf87c3c9efbb0d962!2zMSDEkC4gxJDhuqFpIEPhu5MgVmnhu4d0LCBD4bqndSBE4buBbiwgSGFpIELDoCBUcsawbmcsIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1735749152282!5m2!1svi!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="container mb-60" style={{ marginTop: "30px" }}>
                    <div className="contact-page-side-content row">
                        <div className='col-md-12'>
                            <h3 className="contact-page-title">Liên hệ</h3>
                            <p className="contact-page-message mb-25">
                                Hãy để đội ngũ tư vấn của Fashion hỗ trợ bạn dù ở bất kỳ nơi đâu
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h4><i className="fa fa-fax"></i> Địa chỉ</h4>
                            <p>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                        </div>
                        <div className="col-md-4">
                            <h4><i className="fa fa-phone"></i> Điện thoại</h4>
                            <p>Hotline: 0393144777</p>
                        </div>
                        <div className="col-md-4">
                            <h4><i className="fa fa-envelope-o"></i> Email</h4>
                            <p>phuctm163201@sis.hust.edu.vn</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Contact;