import React from 'react';
import PageTitle from '../components/page-title'
import { Container, Row } from 'react-bootstrap'

class About extends React.Component {
    render(){
        return (
            <>
                <PageTitle title="Liên hệ" links="Trang chủ:/Về chúng tôi:about"/>
                <Container style={{padding: '75px'}}>
                    <Row>
                        <h3>BEST SPORT HOME</h3>
                    </Row>
                    <Row>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    </Row>
                    <Row>
                        <h3>Chính sách</h3>
                    </Row>
                    <Row>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                    </Row>
                    <Row>
                        <img src="/images/policy.png" alt=""></img>
                    </Row>
                </Container>
            </>
        );
    }
}
export default About;
