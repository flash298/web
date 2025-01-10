import React from "react";
import PropTypes from "prop-types";
import logo from "../Image/logo.png";
import { Link } from "react-router-dom";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      {/* <div className="footer-static-top">
                <div className="container">
                    <div className="footer-shipping pt-60 pb-55 pb-xs-25">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer1} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Free Delivery</h2>
                                        <p>And free returns. See checkout for delivery dates.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer2} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Safe Payment</h2>
                                        <p>Pay with the world's most popular and secure payment methods.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer3} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Shop with Confidence</h2>
                                        <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer4} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>24/7 Help Center</h2>
                                        <p>Have a question? Call a Specialist or chat online.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      <div className="footer-static-middle">
        <div className="container">
          <div className="footer-logo-wrap pt-50 pb-35">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-lg-4 col-md-6 footer-logo-container">
                <div className="footer-logo">
                  <img src={logo} className="footer-logo-img" alt="Footer Logo" style={{ width: "10rem"}} />
                </div>
              </div>
              <div className="col-lg-8 col-md-6">
                <p className="info">
                  <span className="info-title">Chúng tôi luôn lắng nghe bạn</span><br />
                  <span className="info-content">
                    Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp
                    trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
