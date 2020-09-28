import React from 'react';
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import requestApi from '../helper/baseService'
import encodeDecode from '../helper/encodeDecode'
import Constant from '../helper/constant'
import config from '../helper/config'

class Register extends React.Component {
    constructor(props){
        super(props);
        this.register = this.register.bind(this)
        this.toHome = this.toHome.bind(this)
    }

    async register(event){
        event.preventDefault();
        // console.log(this.phone.value, this.name.value, this.pass.value)
        if(this.pass.value !== this.cofirm_pass.value){
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: 'Password is not match'}})
            return
        }
        store.dispatch({type: 'LOADING'})
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/register`,
            {auth: await encodeDecode.encode(`${this.phone.value}:${this.name.value}:${this.pass.value}`)}
        ).then(async result => {
            requestApi(
                Constant.POST,
                `${config.getApiHost()}/login`,
                {auth: await encodeDecode.encode(`${this.phone.value}:${this.pass.value}`)}
            ).then(user => {
                localStorage.setItem('token', user.token)
                localStorage.setItem('refreshToken', user.refreshToken)
                store.dispatch({type: 'LOGIN'})
                this.props.history.push('/')
            })
            .catch(error => {
                store.dispatch({type: 'READY'})
                store.dispatch({type: 'DISPLAY_ERROR_POPUP', message: error.response.data.message})
            })
        })
        .catch(error => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'DISPLAY_ERROR_POPUP', message: error.response.data.message})
        })
    }
    async toHome(){
        store.dispatch({type: 'HIDDEN_HF', hidden_hf: false})
    }
    render(){
        return (
            <Container className="form-section">
                <div className="wrap-form">
                    <form className="form">
                        <span className="form-title">
                            <Link to='/' onClick={() => this.toHome()}>
                                <img src='./images/logo.png' alt="" ></img>
                            </Link>
                        </span>
                        <div className="wrap-input">
                            <input type="text" name="phone" ref={c => this.phone = c} placeholder='Phone'></input>
                            {/* <span>Phone</span> */}
                        </div>
                        <div className="wrap-input">
                            <input type="text" name="name" ref={c => this.name = c} placeholder='Name'></input>
                            {/* <span>Name</span> */}
                        </div>
                        <div className="wrap-input">
                            <input type="password" name="pass" ref={c => this.pass = c} placeholder='Password'></input>
                            {/* <span>Password</span> */}
                        </div>
                        <div className="wrap-input">
                            <input type="password" name="cofirm-pass" ref={c => this.cofirm_pass = c} placeholder='Confirm password'></input>
                            {/* <span>Confirm password</span> */}
                        </div>
                        <div className="text-center wrap-btn">
                            <button className="site-btn" onClick={e => this.register(e)}>Register</button>
                        </div>
                        <div className="text-center text-wrap">
                            <span>Already have an account? </span>
                            <Link to="/login">Sign In</Link>
                        </div>
                    </form>
                </div>
            </Container>
        );
    }
  }

export default Register;
