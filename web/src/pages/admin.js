import React from 'react';
// import _ from 'lodash'
import PageTitle from '../components/page-title'
import ListUser from '../components/list-user'
import ListProduct from '../components/list-product'
import ListOrder from '../components/list-order'
import { Tabs, Tab, Container } from 'react-bootstrap'

class Admin extends React.Component {
    render(){
        return (
            <>
                <PageTitle title="TRANG QUẢN LÝ" links="Trang chủ:/Quản lý:admin"/>
                <Container>
                    <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
                        <Tab eventKey="user" title="User">
                            <ListUser></ListUser>
                        </Tab>
                        <Tab eventKey="product" title="Product">
                            <ListProduct></ListProduct>
                        </Tab>
                        <Tab eventKey="order" title="Order">
                            <ListOrder></ListOrder>
                        </Tab>
                    </Tabs>
                </Container>
            </>
        );
    }
  }

export default Admin;
