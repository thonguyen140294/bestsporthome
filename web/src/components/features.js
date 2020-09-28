import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
class Features extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={4} className="feature">
                        <div className="feature-inner">
                                <div className="feature-icon">
                                    <img src="./images/icons/feature_1.png" alt="/"></img>
                                </div>
                                <h2>Thanh toán trực tiếp</h2>
                        </div>
                    </Col>
                    <Col sm={4} className="feature">
                        <div className="feature-inner feature-main">
                                <div className="feature-icon">
                                    <img src="./images/icons/feature_2.png" alt="/"></img>
                                </div>
                                <h2>Sản phẩm chất lượng</h2>
                        </div>
                    </Col>
                    <Col sm={4} className="feature">
                        <div className="feature-inner">
                                <div className="feature-icon">
                                    <img src="./images/icons/feature_3.png" alt="/"></img>
                                </div>
                                <h2>Free ship khi đặt đội</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Features;
