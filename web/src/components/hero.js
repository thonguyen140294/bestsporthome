import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap'

class Hero extends React.Component {
    render() {
        return (
           <section className="hero-section">
                <div className="hs-item set-bg" style ={ { backgroundImage: "url('./images/bg.jpg')" } }>
                    {/* <Container>
                        <Row>
                            <Col sm={12} className="text-white">
                                <span>Điểm đến mới</span>
                                <h2>Best sport home</h2>
                                <p>Địa điểm bán áo quần bóng đá uy tín tại Đà Nẵng. Với nhiều mặt hàng chất lượng, nhiều loại vải từ F1, thun lạnh, Thái nhập,...</p>
                                <a href="/" className="site-btn sb-line">SHOP NOW</a>
                            </Col>
                        </Row>
                        <div className="offer-card text-white">
                            <span>Chỉ</span>
                            <h2>95K</h2>
                        </div>
                    </Container> */}
                </div>
           </section>
        );
    }
}

export default Hero;
