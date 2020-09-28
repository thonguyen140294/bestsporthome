import React from 'react';
// import _ from 'lodash'
import PageTitle from '../components/page-title'
import { Container, Row, Col, ProgressBar, Table, Pagination } from 'react-bootstrap'
import Select from 'react-select';
import DatePicker from 'react-datepicker'
import store from '../store'
import requestApi from '../helper/baseService'
import Constant from '../helper/constant'
import config from '../helper/config'
import "react-datepicker/dist/react-datepicker.css";
import FileBase64 from 'react-file-base64';
import { FaCircle } from 'react-icons/fa'
import validUtilsHelper from '../helper/validUtils.helper';

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            profile: {},
            order_history: {
                data: []
            },
            isEdit: false,
            avatar: null,
            startDate: null,
            gender: null
        }
    }
    componentDidMount(){
        store.dispatch({type: 'LOADING'})
        Promise.all([this.getProfile(), this.getOrderHistory()])
        .then(result => {
            store.dispatch({type: 'READY'})
        })
        .catch(async error => {
            console.log(error)
            await store.dispatch({type: 'READY'})
            await store.dispatch({type: 'LOGOUT'})
            localStorage.setItem('token', '')
            // document.location.href="/login"
            
        })
    }
    getProfile(){
        return new Promise((resolve, reject) => {
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/user/profile`,
                {token: localStorage.getItem('token')}
            ).then(user => {
                const update = {}
                if(user.birthday){
                    update.startDate = new Date(user.birthday)
                    let birthday = new Date(user.birthday)
                    user.birthday = `${birthday.getUTCMonth()+1}/${birthday.getUTCDate()}/${birthday.getUTCFullYear()}`
                    update.profile = user
                }
                this.setState(update)
                resolve()
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
    getOrderHistory(i){
        return new Promise((resolve, reject) => {
            requestApi(
                Constant.GET,
                `${config.getApiHost()}/user/cart/history?limit=${10}&page=${i || 1}`,
                {token: localStorage.getItem('token')}
            ).then(orders => {
                this.setState({
                    order_history: orders
                })
                resolve()
            })
            .catch(error => {
                reject()
            })
        })
    }
    editProfile(e){
        this.setState({
            isEdit: true
        })
    }
    submitProfile(e){
        this.setState({
            isEdit: false
        })
        const data = {
            name: document.getElementById('editName').value,
            phone: document.getElementById('editPhone').value,
            email: document.getElementById('editEmail').value,
            address: document.getElementById('editAddress').value,
            zip_code: document.getElementById('editZipcode').value
        }
        if(this.state.avatar)data.avatar = this.state.avatar
        if(this.state.startDate)data.birthday = this.state.startDate
        if(this.state.gender)data.gender = this.state.gender
        store.dispatch({type: 'LOADING'})
        requestApi(
            Constant.POST,
            `${config.getApiHost()}/user/kyc`,
            {token: localStorage.getItem('token')},
            data
        ).then(async result => {
            await this.componentDidMount()
            store.dispatch({type: 'READY'})
        })
        .catch(error => {
            store.dispatch({type: 'READY'})
            store.dispatch({type: 'TOGGLE_POPUP', popup: {display: true, title: 'Error', message: error.message}})
        })
    }
    cancelProfile(e){
        this.setState({
            isEdit: false,
            avatar: null,
            startDate: null,
            gender: null
        })
    }
    setBirthday(birthday){
        this.setState({
            startDate: birthday
        })
    }
    setGender(e){
        this.setState({
            gender: e.label
        })
    }
    setAvatar(e){
        // console.log(e)
        this.setState({
            avatar: e.base64
        })
    }
    render(){
        const options = [
            { value: '1', label: 'Nam' },
            { value: '2', label: 'Nữ' },
            { value: '3', label: 'Khác' }
        ]
        const selected = options.find(o => o.label = this.state.profile.gender)
        const srcImg = !this.state.isEdit ? this.state.profile.avatar || "./images/image.png" : this.state.avatar || this.state.profile.avatar || "./images/image.png"
        let pagination = []
        let extra = this.state.order_history.amount%this.state.order_history.limit
        let total_page = this.state.order_history.amount/this.state.order_history.limit + extra ? 1 : 0  
        for(let i = 1; i <= total_page;i++){
            pagination.push(<Pagination.Item key={i} active={i === this.state.order_history.page} onClick={e => this.getOrderHistory(i)}>{i}</Pagination.Item>)
        }
        let tbody = this.state.order_history.data.map(o => {
            let time = new Date(o.updated_at)
            let status = ['black', 'yellow', 'blue', 'green', 'red']
            return <tr key={o.id}>
                <td>{`${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`}</td>
                <td><img src={o.product.image} style={{maxWidth:'100px'}} alt=""></img></td>
                <td>{o.product.name}</td>
                <td>{o.product.price} VND</td>
                <td>{o.qty}</td>
                <td><FaCircle style={{color: status[o.status]}}></FaCircle> {Constant.STATUS[o.status]}</td>
            </tr>
        })
        let ranking = function(rank){
            switch (rank) {
                case 'COPPER':
                    return 'Đồng'
                case 'SILVER':
                    return 'Bạc'
                case 'GOLD':
                    return 'Vàng'
                case 'PLATINUM':
                    return 'Bạch kim'
                case 'DIAMOND':
                    return 'Kim cương'
                default:
                    return;
            }
        }(this.state.profile.ranking)
        return (
            <>
                <PageTitle title="TRANG HỒ SƠ" links="Trang chủ:/Hồ sơ:profile"/>
                <Container className="profile-section">
                    <Row>
                        <Col sm={3}>
                            <div className="profile-img">
                                <img src={srcImg} alt=""/>
                                <div className="file btn btn-lg btn-primary" hidden={!this.state.isEdit}>
                                    Thay đổi
                                    <FileBase64 multiple={ false } onDone={this.setAvatar.bind(this)}/>
                                </div>
                            </div>
                            <input className="site-btn btn-block" hidden/>
                            <input id="editBtn" className="site-btn btn-block" defaultValue="Chỉnh sửa" onClick={e => this.editProfile(e)} hidden={this.state.isEdit}/>
                            <input id="submitBtn" className="site-btn btn-block" defaultValue="Cập nhật" onClick={e => this.submitProfile(e)} hidden={!this.state.isEdit}/>
                            <input id="cancelBtn" className="site-btn btn-block" defaultValue="Huỷ bỏ" onClick={e => this.cancelProfile(e)} hidden={!this.state.isEdit}/>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={8}>
                            <div className="profile-head" id="profile-display" hidden={this.state.isEdit}>
                                <Row className="profile"><Col sm={4}>Tên</Col><Col sm={8} className="profile-value" name="name">{this.state.profile.name}</Col></Row>
                                <Row className="profile"><Col sm={4}>Năm sinh</Col><Col sm={8} className="profile-value" name="birthday">{this.state.profile.birthday}</Col></Row>
                                <Row className="profile"><Col sm={4}>Giới tính</Col><Col sm={8} className="profile-value" name="sex">{this.state.profile.gender}</Col></Row>
                                <Row className="profile"><Col sm={4}>Số điện thoại</Col><Col sm={8} className="profile-value" name="phone">{this.state.profile.phone}</Col></Row>
                                <Row className="profile"><Col sm={4}>Email</Col><Col sm={8} className="profile-value" name="email">{this.state.profile.email}</Col></Row>
                                <Row className="profile"><Col sm={4}>Địa chỉ</Col><Col sm={8} className="profile-value" name="address">{this.state.profile.address}</Col></Row>
                                <Row className="profile"><Col sm={4}>Mã bưu điện</Col><Col sm={8} className="profile-value" name="zip_code">{this.state.profile.zip_code}</Col></Row>
                                <Row className="profile"><Col sm={4}>Bậc thành viên</Col><Col sm={8} className="profile-value">{ranking}</Col></Row>
                                <ProgressBar now={this.state.profile.exp/this.state.profile.next_exp*100} label={`${validUtilsHelper.formatPrice(this.state.profile.exp)}/${validUtilsHelper.formatPrice(this.state.profile.next_exp)}`}></ProgressBar>
                            </div>
                            <div className="profile-head" id="profile-edit" hidden={!this.state.isEdit}>
                                <Row className="profile"><Col sm={4}>Tên</Col><Col sm={8} className="profile-value" name="name"><input id="editName" type="text" defaultValue={this.state.profile.name || ''}></input></Col></Row>
                                <Row className="profile"><Col sm={4}>Năm sinh</Col><Col sm={8} className="profile-value" name="birthday">
                                    <DatePicker selected={this.state.startDate || new Date()} onChange={date => this.setBirthday(date)} styles={{width: '100%'}}/>
                                </Col></Row>
                                <Row className="profile"><Col sm={4}>Giới tính</Col><Col sm={8} className="profile-value" name="sex"><Select options={options} value={selected} onChange={this.setGender.bind(this)}/></Col></Row>
                                <Row className="profile"><Col sm={4}>Số điện thoại</Col><Col sm={8} className="profile-value" name="phone"><input id="editPhone" defaultValue={this.state.profile.phone || ''} ></input></Col></Row>
                                <Row className="profile"><Col sm={4}>Email</Col><Col sm={8} className="profile-value" name="email"><input id="editEmail" defaultValue={this.state.profile.email || ''} ></input></Col></Row>
                                <Row className="profile"><Col sm={4}>Địa chỉ</Col><Col sm={8} className="profile-value" name="address"><input id="editAddress" defaultValue={this.state.profile.address || ''} ></input></Col></Row>
                                <Row className="profile"><Col sm={4}>Mã bưu điện</Col><Col sm={8} className="profile-value" name="zip_code"><input id="editZipcode" defaultValue={this.state.profile.zip_code || ''} ></input></Col></Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className="term" >
                        <Col sm={12}>
                            <h4>Lịch sử mua hàng</h4>
                        </Col>
                    </Row>
                    <Row className="term">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Ngày</th>
                            <th>Hình ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody style={{textAlign: 'center'}}>
                            { tbody }
                        </tbody>
                    </Table>
                    <Pagination>{ pagination }</Pagination>
                    </Row>
                </Container>
            </>
        );
    }
  }

export default Profile;
