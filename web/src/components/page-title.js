import React from 'react';
import { Container } from 'react-bootstrap'
class PageTitle extends React.Component {
    render(){
        const links = this.props.links.split('/')
        const link = links.map( (e, index) => 
            index === links.length-1 ? 
            <a key={ index } href={`/${e.split(':')[1]}`}>{e.split(':')[0]}</a> : 
            <a key={ index } href={`/${e.split(':')[1]}`}>{e.split(':')[0]}&nbsp;/&nbsp;</a>
        )
        return (
            <div className="page-title">
                <Container>
                    <h4>{this.props.title}</h4>
                    <div className="pt-link">
                        {link}
                    </div>
                </Container>
            </div>
        );
    }
}

export default PageTitle;
