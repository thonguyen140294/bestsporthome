import React from 'react';
import Hero from '../components/hero'
import Feature from '../components/features'
import Product from '../components/products'
import NewestProduct from '../components/newest-product'
import { connect } from 'react-redux'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'
import _ from 'lodash'

class Home extends React.Component {
  componentDidMount(){
    store.dispatch({type: 'LOADING'})
    Promise.all([this.getBrands(), this.getCategories(), this.getNewProducts(), this.getProducts()])
    .then(results => {
      store.dispatch({type: 'GET_HOME', brands: results[0], categories: results[1], new_products: results[2], products: results[3]})
      store.dispatch({type: 'READY'})
    })
    .catch(error => {
      store.dispatch({type: 'READY'})
      store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.message}})
    })
  }
  async getBrands(){
    if(_.isEmpty(this.props.ui.brands)){
      return await requestApi(
        Constant.GET,
        `${config.getApiHost()}/brand`
      )
    }
    return null
  }
  async getCategories(){
    if(_.isEmpty(this.props.ui.categories)){
      return await requestApi(
        Constant.GET,
        `${config.getApiHost()}/category`
      )
    }
    return null
  }
  async getProducts(){
    if(_.isEmpty(this.props.ui.products)){
      return await requestApi(
        Constant.GET,
        `${config.getApiHost()}/products?limit=12&page=1`
      )
    }
    return null
  }
  async getNewProducts(){
    if(_.isEmpty(this.props.ui.new_products)){
      const nprd = await requestApi(
        Constant.GET,
        `${config.getApiHost()}/products?limit=6&page=1`
      )
      return nprd.data
    }
    return null
  }
  render(){
    return (
        <>
          <Hero></Hero>
          <Feature></Feature>
          <NewestProduct items={this.props.ui.new_products}></NewestProduct>
          <Product 
            categories={this.props.ui.categories}
            brands={this.props.ui.brands}
            products={this.props.ui.products}
          ></Product>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
