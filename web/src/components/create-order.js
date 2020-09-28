import React from 'react';
import { Modal, Form } from 'react-bootstrap'
import store from '../store'
import { connect } from 'react-redux'
class CreateOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            qty: 1,
        }
        this.closePopup = this.closePopup.bind(this)
    }
    closePopup(){
        store.dispatch({type: 'TOGGLE_MODAL'})
    }
    render(){
        // console.log(this.state.popup)
        return (
            <Modal show={this.props.show} centered>
                <Modal.Header closeButton onClick={e => this.closePopup()}>
                    <Modal.Title>Thông tin đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formPersonalName">
                        <Form.Label className="text-center product-detail-form-label"><h4>Tên in</h4></Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên" />
                    </Form.Group>
                    <Form.Group controlId="formPersonalNumber">
                        <Form.Label className="text-center product-detail-form-label"><h4>Số áo</h4></Form.Label>
                        <Form.Control type="text" placeholder="Nhập số" />
                    </Form.Group>
                    <Form.Group controlId="formPersonalSize">
                        <Form.Label className="text-center product-detail-form-label"><h4>Size</h4></Form.Label>
                        <Form.Control type="text" placeholder="Nhập size" />
                    </Form.Group>
                    <Form.Group controlId="formPersonalSize">
                        <Form.Label className="text-center product-detail-form-label"><h4>Số lượng</h4></Form.Label>
                        <Form.Control type="number" min="1" max="100" defaultValue="1"/>
                    </Form.Group>
                    <Form.Group controlId="formPersonalNumberCheckbox">
                        <Form.Check type="checkbox" label="In số quần" name="checkboxPersonalNumber"/>
                    </Form.Group>
                    <button className="sub-btn site-btn" type="submit">
                        Thêm vào giỏ
                    </button>
                    </Form>
                </Modal.Body>
            </Modal>
                
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
