import React from 'react';
import PageTitle from '../components/page-title'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import store from '../store'

class Contact extends React.Component {
    submitContact(){
        store.dispatch({type: 'LOADING'})
        const data = {
            name: document.getElementById('contact_name').value,
            enail: document.getElementById('contact_email').value,
            title: document.getElementById('contact_title').value,
            content: document.getElementById('contact_content').value
        }
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/contact`,
            {},
            data
        ).then(result => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Success', message: 'Thành công'}})
        })
        .catch(error => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.message}})
        })
    }
    render(){
        return (
            <>
                <PageTitle title="Liên hệ" links="Trang chủ:/Liên hệ:contact"/>
                <Container style={{padding: '75px'}}>
                    <Row>
                        <Col sm={6} className="bg-white rounded shadow-sm mb-2">
                            <input type="text" className="form-control border-0" placeholder="Tên" id="contact_name"/>
                        </Col>
                        <Col sm={6} className="bg-white rounded shadow-sm mb-2">
                            <input type="text" className="form-control border-0" placeholder="Email" id="contact_email"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="bg-white rounded shadow-sm mb-2">
                            <input type="text" className="form-control border-0" placeholder="Tiêu đề" id="contact_title"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="bg-white rounded shadow-sm mb-3">
                            <textarea style={{border: 'none'}} name="" cols="30" rows="8" className="form-control" placeholder="Nội dung" id="contact_content"></textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <button className="sub-btn site-btn" onClick={e => this.submitContact()}>
                                Gửi
                            </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
