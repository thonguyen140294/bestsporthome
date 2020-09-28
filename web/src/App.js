import React from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Detail from './pages/detail'
import Profile from './pages/profile'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/cart'
import Admin from './pages/admin'
import Contact from './pages/contact'
import About from './pages/about'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/PulseLoader'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import store from './store'
import CreateOrder from './components/create-order'

class App extends React.Component {
  closePopup(e){
    store.dispatch({type: 'TOGGLE_POPUP', popup: {display: false, title: this.props.ui.popup.title, message: this.props.ui.popup.message}})
  }
  render(){
    return (
      <LoadingOverlay
        active={this.props.ui.isLoading}
        spinner={<BounceLoader color={"#cf3035"}/>}
        styles={{
          wrapper: {
            maxHeight: '100%'
          }
        }}
      >
        <Modal show={this.props.ui.popup.display} centered className="text-center">
            <Modal.Header style={ { backgroundColor: this.props.ui.popup.title ==='Error'?'#dc3545':'#28a745' }}>
              <Modal.Title>{this.props.ui.popup.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{this.props.ui.popup.message}</p>
            </Modal.Body>

            <Modal.Footer className="text-center">
              <Button variant="secondary" onClick={e => this.closePopup(e)}>Close</Button>
            </Modal.Footer>
        </Modal>
        <CreateOrder show={this.props.ui.hidden_modal}></CreateOrder>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} />
            <Route path="/admin" component={Admin} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
          </Switch>
          <Footer hidden={this.props.ui.hidden_hf}></Footer>
        </Router>
      </LoadingOverlay>
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

export default connect(mapStateToProps, null)(App);
