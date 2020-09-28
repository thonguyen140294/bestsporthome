import React from 'react';
import Carousel from 'nuka-carousel';
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

class NewestProduct extends React.Component {
    render(){
        const products = this.props.items || []
        const listProduct = products.map(product => 
            <Col key={product.id}><img src={product.image} alt={product.name}/></Col>
        )
        return (
            <div className="slider-section text-center">
                <Container>
                    <div className="product-title ">
                        <h2>Sản phẩm mới</h2>
                    </div>
                    <Row>
                        <Carousel slidesToShow={4} renderBottomCenterControls={()=>{return false}} autoplay={true} >
                            { listProduct }
                        </Carousel>
                    </Row>
                </Container>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewestProduct);
