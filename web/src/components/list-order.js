import React from 'react';
import { Table, Pagination, Button } from 'react-bootstrap'

class ListOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden_form: false,
            total_page: 1,
            page: 1,
            limit: 10,
            orders: []
        }
        this.setPage = this.setPage.bind(this)
        this.setPage = this.setPage.bind(this)
    }
    componentDidMount(){
        this.setState({
            orders: [{id: 1, name: 'abc',phone: 'abc',type: 'đội',qty: '8'}],
            total_page: 5,
            page: 1,
        })
    }
    setPage(i){
        if(this.state.page === i)return
        this.setState({
            page: i
        })
    }
    getDetail(o){
        console.log(o)
        this.setState({
            hidden_form: false
        })
    }
    render() {
        let pagination = []
        for(let i = 1; i <= this.state.total_page;i++){
            pagination.push(<Pagination.Item key={i} active={i === this.state.page} onClick={e => this.setPage(i)}>{i}</Pagination.Item>)
        }
        let tbody = this.state.orders.map(o => 
            <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.phone}</td>
                <td>{o.type}</td>
                <td>{o.qty}</td>
                <td><Button variant="primary" onClick={e => this.getDetail(o)}>Detail</Button></td>
            </tr>
        )
        return (
           <>
           <Table striped bordered hover size="sm" style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Loại</th>
                    <th>Số lượng</th>
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

export default ListOrder;
