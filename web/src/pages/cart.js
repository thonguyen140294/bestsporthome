import React from 'react';
import PageTitle from '../components/page-title'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import validUtils from '../helper/validUtils.helper'
import { connect } from 'react-redux'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'

class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            profile: {
                name: '',
                phone: '',
                address: ''
            }
        }
        this.updateCart = this.updateCart.bind(this)
        this.removeCart = this.removeCart.bind(this)
    }
    componentDidMount(){
        store.dispatch({type: 'LOADING'})
        Promise.all([this.getCart(), this.getProfile()])
        .then(result => {
            store.dispatch({type: 'READY'})
        })
        .catch(error => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'LOGOUT'})
            this.props.history.push('/login')
        })
    }
    getCart(){
        if(!this.props.ui.carts){
            return new Promise((resolve, reject) => {
                store.dispatch({type: 'LOADING'})
                requestApi(
                    Constant.GET,
                    `${config.getApiHost()}/user/cart`,
                    {token: localStorage.getItem('token')}
                ).then(result => {
                    store.dispatch({type: 'GET_CARTS', carts: result})
                    store.dispatch({type: 'READY'})
                    resolve()
                })
                .catch(error => {
                    store.dispatch({type: 'READY'})
                    store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.response.data.message}})
                })
            })
        }
    }
    getProfile(){
        return new Promise((resolve, reject) => {
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/user/profile`,
                {token: localStorage.getItem('token')}
            ).then(user => {
                this.setState({profile: user})
                resolve()
            })
            .catch(error => {
                reject()
            })
        })
    }
    async updateCart(cart_id, num){
        return new Promise((resolve, reject) => {
            const cart = this.props.ui.carts.find(cart => cart.id === cart_id)
            store.dispatch({type: 'LOADING'})
            requestApi(
                Constant.PUT,
                `${config.getApiHost()}/user/cart`,
                {token: localStorage.getItem('token')},
                {cart_id: cart.id, qty: cart.qty+num}
            ).then(result => {
                const carts = this.props.ui.carts.map(cart => {
                    if(cart.id === cart_id)cart.qty = cart.qty+num
                    return cart
                })
                store.dispatch({type: 'GET_CARTS', carts: carts})
                store.dispatch({type: 'READY'})
                resolve()
            })
            .catch(error => {
                store.dispatch({type: 'READY'})
                store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.response.data.message}})
            })
        })
    }
    async removeCart(cart_id){
        return new Promise((resolve, reject) => {
            store.dispatch({type: 'LOADING'})
            requestApi(
                Constant.DELETE,
                `${config.getApiHost()}/user/cart`,
                {token: localStorage.getItem('token')},
                {cart_id: cart_id}
            ).then(result => {
                const carts = this.props.ui.carts.filter(cart => {
                    return cart.id !== cart_id
                })
                store.dispatch({type: 'GET_CARTS', carts: carts})
                store.dispatch({type: 'READY'})
                resolve()
            })
            .catch(error => {
                store.dispatch({type: 'READY'})
                store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.response.data.message}})
            })
        })
    }
    handleChange(){
        let profile = this.state.profile
        profile.name = document.getElementById('user_name').value
        profile.phone = document.getElementById('user_phone').value
        profile.address = document.getElementById('user_address').value
        this.setState({
            profile
        })
    }
    payment(){
        const data = {
            name: this.state.profile.name,
            phone: this.state.profile.phone,
            address: this.state.profile.address,
            // coupon: document.getElementById('payment_coupon').value,
            note: document.getElementById('payment_note').value
        }
        store.dispatch({type: 'LOADING'})
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/user/payment`,
            {token: localStorage.getItem('token')},
            data
        ).then(result => {
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/user/cart`,
                {token: localStorage.getItem('token')}
            ).then(carts => {
                store.dispatch({type: 'GET_CARTS', carts: carts})
                store.dispatch({type: 'READY'})
                store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Success', message: result.message}})
            })
            .catch(error => {
                store.dispatch({type: 'READY'})
                store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.message}})
            })
        })
        .catch(error => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.message}})
        })
    }
    render(){
        const carts = this.props.ui.carts || []
        const listCart = carts.map(cart => 
            <tr key={cart.id}>
                <th scope="row">
                    <div className="p-2">
                    <img src={cart.product.image} alt="" width="70" className="img-fluid rounded shadow-sm" />
                    <div className="ml-3 d-inline-block align-middle">
                        <h5 className="mb-0">
                            <a href="/" className="text-dark d-inline-block align-middle">{cart.product.name}</a>
                        </h5>
                        {/* <span className="text-muted font-weight-normal font-italic d-block">Category: Watches</span> */}
                    </div>
                    </div>
                </th>
                <td className="align-middle text-center"><strong>{validUtils.formatPrice(cart.product.price)} VND</strong></td>
                <td className="align-middle text-center">
                    <MdKeyboardArrowLeft className="change-qty" onClick={e => this.updateCart(cart.id, 1)}></MdKeyboardArrowLeft>
                    <strong>{cart.qty}</strong>
                    <MdKeyboardArrowRight className="change-qty" onClick={e => this.updateCart(cart.id, -1)}></MdKeyboardArrowRight>
                    </td>
                <td className="align-middle text-center"><MdDelete className="remove-cart" onClick={e => this.removeCart(cart.id)}></MdDelete></td>
            </tr>
        )
        const total_qty = (this.props.ui.carts || []).reduce((total, cart) => {
            return total + (cart.product.price*cart.qty)
        }, 0)
        return (
            <>
                <PageTitle title="Giỏ hàng" links="Trang chủ:/Giỏ hàng:cart"/>
                <Container>
                    <Row>
                        <Col className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                        <div className="table-responsive">
                            <Table className="table">
                            <thead>
                                <tr>
                                <th scope="col" className="border-0 bg-light">
                                    <div className="p-2 px-3 text-uppercase">Sản phẩm</div>
                                </th>
                                <th scope="col" className="border-0 bg-light  text-center">
                                    <div className="py-2 text-uppercase">Giá</div>
                                </th>
                                <th scope="col" className="border-0 bg-light  text-center">
                                    <div className="py-2 text-uppercase">Số lượng</div>
                                </th>
                                <th scope="col" className="border-0 bg-light  text-center">
                                    <div className="py-2 text-uppercase">Xoá</div>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                { listCart }
                            </tbody>
                            </Table>
                        </div>
                        </Col>
                    </Row>
                    <Row className="py-5 p-4 bg-white rounded shadow-sm">
                        <Col sm={6}>
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Thông tin khách hàng</div>
                        <div className="p-4">
                            {/* <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between py-3 border-bottom">
                                <strong className="text-muted">Tên</strong><input type="text" placeholder="Áp dụng mã giảm giá" aria-describedby="button-addon3" className="form-control border-0" />
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom">
                                <strong className="text-muted">Số điện thoại</strong><input style={{border: '0px'}} placeholder="Thọ nguyễn"/>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom">
                                <strong className="text-muted">Địa chỉ</strong><input style={{border: '0px'}} placeholder="Vui lòng nhập ..."/>
                            </li>
                            </ul> */}
                            <Row className="d-flex justify-content-between py-3 border-bottom"><Col sm={4}>Tên</Col><Col sm={8} name="name"><input type="text" id="user_name" className="form-control border-0" placeholder="Vui lòng nhập ..." value={this.state.profile.name} onChange={e => this.handleChange(e)}/></Col></Row>
                            <Row className="d-flex justify-content-between py-3 border-bottom"><Col sm={4}>Số điện thoại</Col><Col sm={8} name="phone"><input type="text" id="user_phone" className="form-control border-0" placeholder="Vui lòng nhập ..." value={this.state.profile.phone} onChange={e => this.handleChange(e)}/></Col></Row>
                            <Row className="d-flex justify-content-between py-3 border-bottom"><Col sm={4}>Địa chỉ</Col><Col sm={8} name="address"><input type="text" id="user_address" className="form-control border-0" placeholder="Vui lòng nhập ..." value={this.state.profile.address} onChange={e => this.handleChange(e)}/></Col></Row>
                        </div>
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Thông tin thêm cho người bán</div>
                        <div className="p-4">
                            <p className="font-italic mb-4">Nếu bạn có thông tin gì cần bổ sung khi đặt hàng, vui lòng nhập vào đây</p>
                            <textarea id="payment_note" name="" cols="30" rows="2" className="form-control"></textarea>
                        </div>
                        </Col>
                        <Col sm={6}>
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Mã giảm giá</div>
                        <div className="p-4">
                            <p className="font-italic mb-4">Nếu bạn có mã giảm giá, vui lòng nhập vào ô bên dưới</p>
                            <div className="input-group mb-4 border rounded-pill p-2">
                            <input id="payment_coupon" type="text" placeholder="Áp dụng mã giảm giá" aria-describedby="button-addon3" className="form-control border-0" readOnly/>
                            {/* <div className="input-group-append border-0">
                                <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill" style={{ background: "#cf3035", border: 0}}>Apply</button>
                            </div> */}
                            </div>
                        </div>
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Đơn hàng</div>
                        {/* <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p> */}
                        <div className="p-4">
                            <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tổng phụ</strong><strong>{validUtils.formatPrice(total_qty)} VND</strong></li>
                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tổng</strong>
                                <h5 className="font-weight-bold">{validUtils.formatPrice(total_qty)} VND</h5>
                            </li>
                            </ul><button className="btn btn-dark rounded-pill py-2 btn-block" style={{ background: "#cf3035", border: 0}} onClick={e => this.payment()}>Tiến hành đặt hàng</button>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loading: () => {
            dispatch({type: 'LOADING'})
        }
    };
}
function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        ui: state.ui
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
