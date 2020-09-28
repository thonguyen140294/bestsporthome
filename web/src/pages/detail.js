import React from 'react';
import PageTitle from '../components/page-title'
import { Container } from 'react-bootstrap'
import ProductDetail from '../components/product-detail'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'
import { connect } from 'react-redux'
import NewestProduct from '../components/newest-product';
import _ from 'lodash'

class Detail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            product: {}
        }
    }
    componentDidMount() {
        try {
            store.dispatch({type: 'LOADING'})
            Promise.all([this.getProduct(this.props.match.params.id), this.getNewProducts()]).then(() => {
                store.dispatch({type: 'READY'})
            })
        } catch (error) {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.response.data.message}})
        }
    }
    async getProduct(id){
        return new Promise((resolve, reject) => {
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/product/detail/${id}`
            ).then(result => {
                this.setState({
                    product: result
                })
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
    }
    async getNewProducts(){
        return new Promise((resolve, reject) => {
            if(_.isEmpty(this.props.ui.new_products)){
                requestApi(
                    Constant.GET,
                    `${config.getApiHost()}/products?limit=6&page=1`
                ).then(result => {
                    store.dispatch({type: 'GET_HOME', new_products: result.data})
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
            }
            else {resolve()}
        })
    }
    render(){
        // console.log(this.props.match.params.id)
        return (
            <>
                <PageTitle title="TRANG CHI TIẾT" links="Trang chủ:/Chi tiết:detail"/>
                <Container>
                    <ProductDetail product={this.state.product}/>
                    <NewestProduct items={this.props.ui.new_products}></NewestProduct>
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
