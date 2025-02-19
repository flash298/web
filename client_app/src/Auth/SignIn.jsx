import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string'
import User from '../API/User';
import { useDispatch, useSelector } from 'react-redux';
import { addSession } from '../Redux/Action/ActionSession';
import Cart from '../API/CartAPI';
import { changeCount } from '../Redux/Action/ActionCount';

SignIn.propTypes = {
    
};

function SignIn(props) {

    const dispatch = useDispatch()

    const [username, set_username] = useState('')
    const [password, set_password] = useState('')

    const [error_username, set_error_username] = useState(false)
    const [error_password, set_error_password] = useState(false)

    const [redirect, set_redirect] = useState(false)

    // Get carts từ redux khi user chưa đăng nhập
    const carts = useSelector(state => state.Cart.listCart)

    // Get isLoad từ redux để load lại phần header
    const count_change = useSelector(state => state.Count.isLoad)

    const handler_signin = (e) => {

        e.preventDefault()

        const fetchData = async () => {

            const params = {
                username,
                password
            }

            const query = '?' + queryString.stringify(params)

            const response = await User.Get_Detail_User(query)

            if (response === "Khong Tìm Thấy User"){
                set_error_username(true)
            }else{
                if (response === "Sai Mat Khau"){
                    set_error_username(false)
                    set_error_password(true)
                }else{

                   console.log(response)

                    const action = addSession(response._id)
                    dispatch(action)

                    sessionStorage.setItem('id_user', response._id)
                    
                    const action_count_change = changeCount(count_change)
                    dispatch(action_count_change)

                    set_redirect(true)

                }
            }

        }

        fetchData()

    }

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Đăng nhập</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-section mb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30 mr_signin">
                            <form action="#" >
                                <div className="login-form">
                                    <h4 className="login-title">Đăng nhập</h4>
                                    <div className="row">
                                        <div className="col-md-12 col-12 mb-20">
                                            <label>Tài khoản *</label>
                                            <input className="mb-0" type="text" placeholder="Email" value={username} onChange={(e) => set_username(e.target.value)} />
                                            {
                                                error_username && <span style={{ color: 'red' }}>* Tài khoản không đúng!</span>
                                            }
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>Mật khẩu *</label>
                                            <input className="mb-0" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => set_password(e.target.value)} />
                                            {
                                                error_password && <span style={{ color: 'red' }}>* Sai mật khẩu!</span>
                                            }
                                        </div>
                                        <div className="col-md-12">
                                            {
                                                redirect && <Redirect to="/" />
                                            }
                                            <button className="register-button mt-0" style={{ cursor: 'pointer'}} onClick={handler_signin}>Đăng nhập</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;