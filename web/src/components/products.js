import React from 'react';
import _ from 'lodash'
import { Container, Row, Col } from 'react-bootstrap';
import ProductItem from './product-item'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'
import { connect } from 'react-redux'

class Products extends React.Component{
    constructor(props){
        super(props)
        this.loadMore = this.loadMore.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.state = {
            page: 1,
            limit: 12,
            category: ''
        }
    }
    async loadMore(e){
        return new Promise((resolve, reject) => {
            store.dispatch({type: 'LOADING'})
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/products?limit=12&page=${this.state.page+1}${this.state.category ? `&category_id=${this.state.category}`: ''}`
            ).then(result => {
                let products = this.props.ui.products.data
                result.data = products.concat(result.data)
                store.dispatch({type: 'LOAD_MODE_PRODUCTS', products: result})
                store.dispatch({type: 'READY'})
                this.setState({ page: this.state.page + 1})
                resolve()
            })
            .catch(error => {
                store.dispatch({type: 'READY'})
                // store.dispatch({type: 'DISPLAY_ERROR_POPUP', message: error.response.data.message})
                resolve()
            })
        })
    }
    async getProduct(e, id){
        const categories = document.getElementsByClassName('category')
        for(let category of categories){
            if(category.name !== e.target.name)category.classList.remove('cate-query')
            else category.classList.add('cate-query')
        }
        return new Promise((resolve, reject) => {
            store.dispatch({type: 'LOADING'})
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/products?limit=12&page=1${id?`&category_id=${id}`:''}`
            ).then(result => {
                store.dispatch({type: 'LOAD_MODE_PRODUCTS', products: result})
                store.dispatch({type: 'READY'})
                this.setState({ page: 1, category: id || ''})
                resolve()
            })
            .catch(error => {
                store.dispatch({type: 'READY'})
                // store.dispatch({type: 'DISPLAY_ERROR_POPUP', message: error.response.data.message})
                resolve()
            })
        })
    }
    render(){
        const products = this.props.products.data || []
        const listProduct = products.map(product => 
            <Col sm={3} key={product.id}>
                <ProductItem product={product}></ProductItem>
            </Col>
        )
        const categories = this.props.categories
        const listCategory = categories.map(category => 
            /* eslint-disable-next-line */
            <li key={category.id}><a href="#"  className="category" name={category.id} onClick={e => this.getProduct(e, category.id)}>{category.name}</a></li>
        )
        /* eslint-disable-next-line */
        listCategory.push(<li key='all'><a href="#" className="category cate-query" onClick={e => this.getProduct(e)}>TẤT CẢ</a></li>)
        let btnLoadMore = <button className="pill-btn" onClick={e => this.loadMore(e)}>XEM THÊM</button>
        if(!_.isEmpty(this.props.products) && this.props.products.amount === this.props.products.data.length){
            btnLoadMore = null
        }
        return (
            <div id="product-section" className="product-section text-center">
                <Container>
                    <div className="product-title ">
                        <h2>SẢN PHẨM</h2>
                    </div>
                    <ul className="product-menu">
                        { listCategory }
                    </ul>
                    <Row>{ listProduct }</Row>
                    <div className="text-center">
                    {btnLoadMore}
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);