import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import validUtils from '../helper/validUtils.helper'
import store from '../store'
import { connect } from 'react-redux'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'

class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            qty: 1,
            popup:false
        }
        this.addCart = this.addCart.bind(this)
    }
    addCart(id){
        if(!localStorage.getItem('token')){
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: "Vui lòng đăng nhập để được thêm vào giỏ hàng"}})
            return
        }
        store.dispatch({type: 'LOADING'})
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/user/cart`,
            {token: localStorage.getItem('token')},
            { product_id: id, qty: 1}
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
            })
        })
        .catch(error => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.response.data.message}})
        })
    }
    render(){
        // const thumbs = this.props.thumbs.map((thumb, index) => 
        //     <Col key={index} className="pt">
        //         <img src={thumb} alt=""></img>
        //     </Col>
        // )
        const rating = []
        let rate = Math.random() * (5 - 3.5) + 3.5
        for(let i=1;i<=5;i++){
            if(rate >= i)rating.push(<BsStarFill key={i} style={{ color: "#cf3035"}}></BsStarFill>)
            else if(rate+0.5 === i)rating.push(<BsStarHalf key={i} style={{ color: "#cf3035"}}></BsStarHalf>)
            else rating.push(<BsStar key={i} style={{ color: "#cf3035"}}></BsStar>)
        }
        const sizesDemo = ['S', 'M', 'L', 'XL', 'XXL']
        const sizes = sizesDemo.map((size, index) => 
            <div key={index} className="sc-item">
                <input type="radio" name="sc"></input>
                <label> { size.toUpperCase() }</label>
            </div>
        )
        return (
            <div className="product-detail">
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <div className="product-pic-zoom">
                                    <img className="product-big-img" src={this.props.product.image} alt=""></img>
                                    <img role="presentation" alt="" src={this.props.product.image} name="zoomImg" 
                                        style={{
                                            zIndex: -1,
                                            position: "absolute",
                                            top: "-600.066px",
                                            left: "-348.047px", 
                                            opacity: "0",
                                            border: "none",
                                            maxWidth: "none",
                                            maxHeight: "none",
                                            width: "1000px",
                                            height: "1358px"}}></img>
                                </div>
                            </Row>
                            <Row className="product-thumbs" tabIndex="1" style={{"overflow": "hidden", "outline": "none"}}>
                                {/* { thumbs } */}
                            </Row>
                        </Col>
                        <Col>
                            <h2 className="p-title">{this.props.product.name}</h2>
                            <h3 className="p-price">{validUtils.formatPrice(this.props.product.price)} VND</h3>
                            <h4 className="p-stock">Trạng thái: <span>Còn hàng</span></h4>
                            <div className="p-rating">{ rating }</div>
                            <div className="fw-size-choose"><p>Size</p>{ sizes }</div>
                            <div className="quantity">
                                <p>Số lượng</p>
                                <div className="pro-qty">
                                    <span className="dec qtybtn">-</span>
                                    <input id="product-qty" type="text" defaultValue={1} />
                                    <span className="inc qtybtn">+</span>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button className="sub-btn site-btn" onClick={e => this.addCart(this.props.product.id)}>
                                    Đặt hàng
                                </button>
                            </div>
                            <div className="desc">
                                <h2>Thông tin</h2>
                                <p>{ this.props.product.desc }</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
