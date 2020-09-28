import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class RegisterForm extends React.Component{
    render(){
        return (
            <Container className="text-center">
                <Row>
                    <div className="product-title ">
                        <h2>PRODUCTS</h2>
                    </div>
                    <ul className="product-menu">
                        <li><a href="/">TOPS</a></li>
                        <li><a href="/">JUMPSUIT</a></li>
                        <li><a href="/">LEGGINGS</a></li>
                        <li><a href="/">COAT</a></li>
                    </ul>
                    <div className="text-center">
                    <button className="pill-btn">LOAD MORE</button>
                    </div>
                </Row>
                
            </Container>
        );
    }
}

export default RegisterForm;
