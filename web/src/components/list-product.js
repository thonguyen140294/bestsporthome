import React from 'react';
import { Table, Pagination, Form, Button } from 'react-bootstrap'
import FileBase64 from 'react-file-base64';

class ListProduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden_form: true,
            total_page: 1,
            page: 1,
            limit: 10,
            products: []
        }
        this.getDetail = this.getDetail.bind(this)
        this.cancel = this.cancel.bind(this)
        this.update = this.update.bind(this)
        this.create = this.create.bind(this)
        this.setPage = this.setPage.bind(this)
    }
    componentDidMount(){
        this.setState({
            products: [{id: 1, name: 'abc',image: 'abc',price: 'abc', desc:'abc',season:'abc',sale:'abc',status:'abc'},
            {id: 2, name: 'qwe',image: 'qwe',price: 'qwe', desc:'qwe',season:'qwe',sale:'qwe',status:'qwe'}],
            total_page: 3,
            page: 1,
        })
    }
    getDetail(o){
        console.log(o)
        this.setState({
            hidden_form: false
        })
    }
    cancel(){
        this.setState({
            hidden_form: true
        })
    }
    update(o){
        this.setState({
            hidden_form: true
        })
    }
    create(){
        this.setState({
            hidden_form: false
        })
    }
    setPage(i){
        if(this.state.page === i)return
        this.setState({
            page: i
        })
    }

    getFile(){
    }
    render() {
        let pagination = []
        for(let i = 1; i <= this.state.total_page;i++){
            pagination.push(<Pagination.Item key={i} active={i === this.state.page} onClick={e => this.setPage(i)}>{i}</Pagination.Item>)
        }
        let tbody = this.state.products.map(o => 
            <tr key={o.id}>
                <td>{o.image}</td>
                <td>{o.name}</td>
                <td>{o.price}</td>
                <td><Button variant="primary"  onClick={e => this.getDetail(o)}>Chi tiết</Button></td>
            </tr>
        )
        return (
           <>
           <Form hidden={this.state.hidden_form}>
                <Form.Group controlId="formPersonalName">
                    <Form.Label className="text-center product-detail-form-label"><h4>Hình ảnh</h4></Form.Label>
                    <div className="profile-img">
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"} alt=""/>
                        <div className="file btn btn-lg btn-primary">
                            Thay đổi
                            <FileBase64 multiple={ false } onDone={this.getFile.bind(this)}/>
                        </div>
                    </div>
                </Form.Group>
                <Form.Group controlId="formPersonalNumber">
                    <Form.Label className="text-center product-detail-form-label"><h4>Tên</h4></Form.Label>
                    <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formPersonalSize">
                    <Form.Label className="text-center product-detail-form-label"><h4>Giá</h4></Form.Label>
                    <Form.Control type="text" placeholder="Enter price" />
                </Form.Group>
                <Form.Group controlId="formPersonalSize">
                    <Form.Label className="text-center product-detail-form-label"><h4>Mô tả</h4></Form.Label>
                    <Form.Control type="text" placeholder="Enter description" />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={e => this.update()} hidden={this.state.hidden_form}>
                Update
            </Button>
            <Button variant="secondary" onClick={e => this.cancel()} hidden={this.state.hidden_form}>
                Cancel
            </Button>
            <Button variant="primary" hidden={!this.state.hidden_form} onClick={e => this.create()}>Add</Button>
            <Table striped bordered hover size="sm" style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                    <th>Hình ảnh</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    { tbody }
                </tbody>
            </Table>
            <Pagination>
                {/* <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last /> */}
                { pagination }
            </Pagination>
           </>
        );
    }
}

export default ListProduct;
