import React from 'react';
import { Row, Col, Modal, Form, Tabs, Tab } from 'react-bootstrap'
import store from '../store'
import { connect } from 'react-redux'
class CreateOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            qty: 1,
        }
        this.addMember = this.addMember.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }
    addMember(){
        let row = document.createElement('div');
        row.className= "row"
        row.style = "marginBottom: 1%"

        let col1 = document.createElement('div');
        col1.className= "col"
        let input1 = document.createElement('input');
        input1.className= "form-control"
        input1.placeholder="Tên in"
        col1.appendChild(input1)

        let col2 = document.createElement('div');
        col2.className= "col"
        let input2 = document.createElement('input');
        input2.className= "form-control"
        input2.placeholder="Số áo"
        col2.appendChild(input2)

        let col3 = document.createElement('div');
        col3.className= "col"
        let input3 = document.createElement('input');
        input3.className= "form-control"
        input3.placeholder="Size"
        col3.appendChild(input3)

        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(col3)

        document.getElementById('list-member').appendChild(row); 
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
                <Tabs defaultActiveKey="personal" id="tab-order">
                    <Tab eventKey="personal" title="Cá nhân" style={{"marginTop": "5%"}}>
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
                            <Form.Group controlId="formPersonalTypeCheckbox">
                                <Form.Label className="text-center product-detail-form-label"><h4>Loại vải</h4></Form.Label>
                                <Form.Check type="radio" label="Thun lạnh (95.000 VND)" name="radioPersonalType" defaultChecked/>
                                <Form.Check type="radio" label="F1 Thái (170.000 VND)" name="radioPersonalType"/>
                            </Form.Group>
                            <Form.Group controlId="formPersonalNumberCheckbox">
                                <Form.Label className="text-center product-detail-form-label"><h4>In số quần</h4></Form.Label>
                                <Form.Check type="radio" label="Không" name="radioPersonalNumber" defaultChecked/>
                                <Form.Check type="radio" label="Có" name="radioPersonalNumber"/>
                            </Form.Group>
                            <hr></hr>
                            <Form.Group controlId="formPersonalTotal">
                                <Form.Label className="product-detail-form-label">Thành tiền</Form.Label>
                                <Form.Control type="text" defaultValue="95.000 VND" readOnly/>
                            </Form.Group>
                            <button className="sub-btn site-btn" type="submit">
                                Thêm vào giỏ
                            </button>
                        </Form>
                    </Tab>
                    <Tab eventKey="team" title="Đội" style={{"marginTop": "5%"}}>
                        <Form>
                            <Form.Group controlId="formTeamName">
                                <Form.Label className="text-center product-detail-form-label"><h4>Tên đội</h4></Form.Label>
                                <Form.Control type="text" placeholder="Nhập tên đội" />
                            </Form.Group>
                            <Form.Group controlId="formTeamMember" id="list-member">
                                <Form.Label className="text-center product-detail-form-label"><h4>Thành viên</h4></Form.Label>
                                <Row style={{"marginBottom": "1%"}}>
                                    <Col>
                                        <Form.Control placeholder="Tên in" />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Số áo" />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="size" />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="formTeamAddMember" style={{width: "100%"}} className="text-center">
                                <button type="button" onClick={e => this.addMember()}>+</button>
                            </Form.Group>
                            <Form.Group controlId="formTeamNameRadio">
                                <Form.Label className="text-center product-detail-form-label"><h4>Vị trí in tên đội</h4></Form.Label>
                                <Form.Check type="radio" name="teamNameLocation" label="Sau lưng, trên số" />
                                <Form.Check type="radio" name="teamNameLocation" label="Sau lưng, dưới số" />
                                <Form.Check type="radio" name="teamNameLocation" label="Trước ngực" />
                            </Form.Group>
                            <Form.Group controlId="formTeamNameRadio">
                                <Form.Label className="text-center product-detail-form-label"><h4>Vị trí in tên thành viên</h4></Form.Label>
                                <Form.Check type="radio" label="Sau lưng, trên số" name="radioTeamMemberName"/>
                                <Form.Check type="radio" label="Sau lưng, dưới số" name="radioTeamMemberName"/>
                                <Form.Check type="radio" label="Trước ngực" name="radioTeamMemberName"/>
                                <Form.Check type="radio" label="Không in" name="radioTeamMemberName"/>
                                <Form.Text style={{color: "red"}}>
                                    Lưu ý: Tên in sẽ bị bỏ qua nếu vị trí in trùng với tên đội
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formTeamTypeCheckbox">
                                <Form.Label className="text-center product-detail-form-label"><h4>Loại vải</h4></Form.Label>
                                <Form.Check type="radio" label="Thun lạnh (95.000 VND)" name="radioTeamType" defaultChecked/>
                                <Form.Check type="radio" label="F1 Thái (170.000 VND)" name="radioTeamType"/>
                            </Form.Group>
                            <Form.Group controlId="formTeamNumberCheckbox">
                                <Form.Label className="text-center product-detail-form-label"><h4>In số quần</h4></Form.Label>
                                <Form.Check type="radio" label="Có" name="radioTeamNumber"/>
                                <Form.Check type="radio" label="Không" name="radioTeamNumber"/>
                            </Form.Group>
                            <button className="sub-btn site-btn" type="submit">
                                Thêm vào giỏ
                            </button>
                        </Form>
                    </Tab>
                </Tabs>
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
