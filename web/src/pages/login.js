import React from 'react';
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import requestApi from '../helper/baseService'
import encodeDecode from '../helper/encodeDecode'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this)
        this.toHome = this.toHome.bind(this)
    }
    async login(event){
        event.preventDefault();
        if(!this.phone.value || !this.password.value){
            console.log('error')
        }
        store.dispatch({type: 'LOADING'})
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/login`,
            {auth: await encodeDecode.encode(`${this.phone.value}:${this.password.value}`)}
        ).then(user => {
            localStorage.setItem('token', user.token)
            localStorage.setItem('refreshToken', user.refreshToken)
            store.dispatch({type: 'LOGIN'})
            this.toHome()
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
            document.getElementById('login-form').reset()
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.response.data.message}})
        })
    }
    async toHome(){
        store.dispatch({type: 'HIDDEN_HF', hidden_hf: false})
    }

    render(){
        return (
            <Container className="form-section">
                <div className="wrap-form">
                    <form className="form" id="login-form">
                        <span className="form-title">
                            <Link to='/' onClick={() => this.toHome()}>
                               <img src='./images/logo.png' alt="" ></img>
                           </Link>
                        </span>
                        <div className="wrap-input">
                            <input type="text" name="phone" ref={c => this.phone = c} placeholder='Phone'></input>
                        </div>
                        <div className="wrap-input">
                            <input type="password" name="pass" ref={c => this.password = c} placeholder='Password'></input>
                        </div>
                        <div className="text-center wrap-btn">
                            <button className="site-btn" onClick={e => this.login(e)}>Login</button>
                        </div>
                        <div className="text-center text-wrap">
                            <span>Don’t have an account? </span>
                            <Link to="/register">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </Container>
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
export default connect(null, mapDispatchToProps)(Login);
