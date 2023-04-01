import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import Header from 'mainpage/Header';
//import Footer from 'mainpage/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Lists from './lists';

const App = () => (
  <>

    <Container className='p-5'>
      <br></br>
        <Row>
          <Col className="title">RECIPE BOOK</Col>        
        </Row>
        <Row>
          <Col className="subtitle">My Cocktail Recipe</Col>
        </Row>
        <Container fluid className='p-0 m-0'>
          <Lists/>
      </Container>
    </Container>

  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
