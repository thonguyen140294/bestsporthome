import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
class Footer extends React.Component {
    render() {
        if (window.location.pathname === '/login') return null;
        if (window.location.pathname === '/register') return null;
        return (
            <div id="footer-section" className="footer-section">
                <Container>
                    <div className="footer-logo text-center">
                        <a href="/"><img src="./images/logo.png" alt=""></img></a>
                    </div>
                    <Row>
                        <Col sm={4} className="footer-widget">
                            <h2>THÔNG TIN</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            <Row>
                                <Col><TiSocialFacebook style={{ color: "#cf3035"}}></TiSocialFacebook></Col>
                                <Col><TiSocialTwitter style={{ color: "#cf3035"}}></TiSocialTwitter></Col>
                                <Col><TiSocialInstagram style={{ color: "#cf3035"}}></TiSocialInstagram></Col>
                                <Col><TiSocialYoutube style={{ color: "#cf3035"}}></TiSocialYoutube></Col>
                            </Row>
                        </Col>
                        <Col sm={4} className="footer-widget">
                            <h2>LIÊN HỆ</h2>
                            <Row>
                                <Col sm={4}><p>Địa chỉ:</p></Col>
                                <Col sm={8}><p>Mian Str, no 23, New York</p></Col>
                            </Row>
                            <Row>
                                <Col sm={4}><p>Số điện thoại:</p></Col>
                                <Col sm={8}><p>+536 985917 141</p></Col>
                            </Row>
                            <Row>
                                <Col sm={4}><p>Email:</p></Col>
                                <Col sm={8}><p>lyliy.cosmetic@gmail.com</p></Col>
                            </Row>
                        </Col>
                        <Col sm={4} className="footer-widget">
                            <h2>THEO DÕI</h2>
                            <form>
                                <Row><input className="sub-input" type="text" placeholder="Tên "></input></Row>
                                <Row><input className="sub-input" type="text" placeholder="Số điện thoại"></input></Row>
                                <Row><button className="sub-btn site-btn">Gửi</button></Row>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;
