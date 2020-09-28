import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { BsSearch, BsPerson, BsBag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'
import { connect } from 'react-redux'
import _ from 'lodash'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
        this.loginOfRegister = this.loginOfRegister.bind(this)
    }
    componentDidMount(){
        if(localStorage.getItem('token')){
            store.dispatch({type: 'LOGIN'})
            if(_.isEmpty(this.props.ui.carts)){
                store.dispatch({type: 'LOADING'})
                requestApi(
                    Constant.GET,
                    `${config.getApiHost()}/user/cart`,
                    {token: localStorage.getItem('token')}
                ).then(result => {
                    store.dispatch({type: 'GET_CARTS', carts: result})
                    store.dispatch({type: 'READY'})
                })
                .catch(error => {
                    console.log(error)
                    store.dispatch({type: 'READY'})
                })
            }
        }
    }
    async logout(event){
        store.dispatch({type: 'LOADING'})
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/logout`,
            {token: localStorage.getItem('token')}
        )
        store.dispatch({type: 'LOGOUT'})
        store.dispatch({type: 'READY'})
    }
    async loginOfRegister(){
        store.dispatch({type: 'HIDDEN_HF', hidden_hf: true})
    }
    render() {
        if (this.props.ui.hidden) return null;
        const user = this.props.authen.isLogin ? 
        <>
            <Link to="/profile">Hồ sơ </Link>
            hoặc
            <Link to="#" onClick={e => this.logout(e)}> Đăng xuất</Link> 
            
        </>
        : 
        <>
            <Link to="/login" onClick={() => this.loginOfRegister()}>Đăng nhập </Link> 
            hoặc 
            <Link to="/register" onClick={() => this.loginOfRegister()}> Đăng kí</Link>
        </>
        const cart = this.props.authen.isLogin ? <div className="up-item">
                        <div className="shopping-card">
                            <BsBag></BsBag>
                            <span>{this.props.ui.carts && this.props.authen.isLogin ? this.props.ui.carts.length : 0}</span>
                        </div>
                        {/* eslint-disable-next-line */}
                        <Link to="/cart">Giỏ hàng</Link>
                    </div> : ''
        return (
           <header className="header-section">
               <React.Fragment>
                    <Container className='header-top'>
                        <Row className="justify-content-md-center text-center">
                            <Col sm={2}>
                                {/* eslint-disable-next-line */}
                                <a href='/'>
                                    {/* eslint-disable-next-line */}
                                    <img src='./images/logo.png'></img>
                                </a>
                            </Col>
                            <Col sm={6}>
                                <form className="header-search-form">
                                    <input type="text" placeholder="Tìm ...."></input>
                                    <button><BsSearch></BsSearch></button>
                                </form>
                            </Col>
                            <Col sm={4} className="user-info">
                                <div className="user-panel">
                                        <div className="up-item">
                                            <BsPerson></BsPerson>
                                            {/* eslint-disable-next-line */}
                                            {
                                                user
                                            }
                                        </div>
                                        { cart }
                                    </div>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
                <React.Fragment>
                    <nav className="main-navbar">
                        <Container>
                            <ul className="main-menu">
                                <li><Link to="/">Tranh chủ</Link></li>
                                <li><Link to="/">Sản phẩm</Link></li>
                                <li><Link to="/">Dịch vụ</Link></li>
                                <li><Link to="/contact">Liên hệ</Link></li>
                                <li><Link to="/about">Về chúng tôi</Link></li>
                            </ul>
                        </Container>
                    </nav>
                </React.Fragment>
           </header>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        authen: state.authen,
        ui: state.ui
    }
}

export default connect(mapStateToProps, null)(Header);
