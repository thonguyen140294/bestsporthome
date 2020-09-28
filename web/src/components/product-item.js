import React from 'react';
import { BsBag, BsInfoCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import validUtils from '../helper/validUtils.helper'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'
import { OverlayTrigger,Tooltip } from 'react-bootstrap'
import { connect } from 'react-redux'

class ProductItem extends React.Component {
    constructor(props){
        super(props)
        this.addToCard = this.addToCard.bind(this)
    }
    async addToCard(id){
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
        return (
            <div className="product-item">
                <div className="pi-pic">
                    <img src={ this.props.product.image } alt=""></img>
                    <div className="pi-links">
                        {/* eslint-disable-next-line */}
                        <OverlayTrigger key='top-add-cart' placement='top'
                            overlay={
                                <Tooltip id={`tooltip-top-add-cart`}>Thêm</Tooltip>
                            }
                        >
                        {/* eslint-disable-next-line */}
                            <a className="add-cart" href="#" onClick={e => this.addToCard(this.props.product.id)}>
                                <BsBag className="pi-icon"></BsBag>
                            </a>
                        </OverlayTrigger>
                        <OverlayTrigger key='top-show-detail' placement='top'
                            overlay={
                                <Tooltip id={`tooltip-top-show-detail`}>Chi tiết</Tooltip>
                            }
                        >
                            <Link className="show-detail" to={`/detail/${this.props.product.id}`}>
                                <BsInfoCircle className="pi-icon"></BsInfoCircle>
                            </Link>
                        </OverlayTrigger>
                    </div>
                </div>
                <div className="pi-text">
                    <h6>{ validUtils.formatPrice(this.props.product.price) }VND</h6>
                    {/* <p>{ this.props.product.name }</p> */}
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
