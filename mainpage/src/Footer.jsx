import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import footer from './img/Footer.jpg';

function Footer() {
  return (
    <Container  fluid className='p-0 m-0' style={{backgroundColor:"#584B3C", color:"white", fontSize:"18px"}}>
        <Row>
            <Col className='py-3 text-center'>
                <img src={footer} alt=""></img>
            </Col>
            <Col className='pt-5' lg={2}>
                <p>Our Services: <br/></p>
                <a href="#1">Recipe book<br/></a>
                <a href="#2">Your cart<br/></a>
                <a href="#3">Your order<br/></a>
            </Col>
            <Col className='pt-5' lg={2}>
                <p>About Us: <br/></p>
                <a href="#1">Telegram<br/></a>
                <a href="#2">Instagram<br/></a>
                <a href="#3">Twitter<br/></a>
            </Col>
            <Col className='pt-5' lg={2}>
                <p>About You: <br/></p>
                <a href="#1">Profile<br/></a>
                <a href="#2">Log Out<br/></a>
            </Col>v
        </Row>
    </Container>
  );
}

export default Footer;