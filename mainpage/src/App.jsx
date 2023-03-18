import React from "react";
import ReactDOM from "react-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img from './img/Main-Page-Order-Cocktail-Process.jpg';
import background from './img/Main-Page-Background.jpg';
import "./index.css";
import Carousel from './Collaborator-Carousel';
import Header from './Header';
import Footer from './Footer';
import Input from 'create_cocktail/Input';

const App = () => (
  <>
    <Header/>
    <Container fluid className='p-0 m-0'>
        <div className="topImage" style={{ backgroundImage: `url(${background})` }}></div>
    </Container>

    <Container className='p-5'>
        <Row>
          <Col className="title">PRELIMINARY</Col>        
        </Row>
        <Row>
          <Col className="subtitle">Introduction</Col>
        </Row>
        <Row>
          <Col>
            <ol>
              <li>
                <p>— (1) Barrister allows you to customize and create your very own cocktail. 
                It specializes in formulating your perfect cocktail using the *Golden Ratio.
                </p>
                <a 
                  href="https://www.foodandwine.com/cocktails/what-is-the-golden-ratio-of-cocktails"
                  className="link"
                >
                  *Golden Ratio
                </a>
                <br/>
                <p>(2) Barrister allows you to share your own cocktail recipes, as well as tasting recipes of others.</p>
              </li>
            </ol>
          </Col>
        </Row>
      </Container>

      <Container className='p-5'>
          <Row>
              <Col className="title">PROCESSES AND FLOWS</Col>        
          </Row>
          <Row>
              <Col className="subtitle">Cocktail Creation</Col>
          </Row>
          <Row>
          <Col>
            <ol start="2">
              <li>
                <p>Select the ingredients to mix your very own cocktail.
                </p>
              </li>
            </ol>
          </Col>
        </Row>
      </Container>

      <Input/>

      <Container className='p-5'>
          <Row>
              <Col className="subtitle">Order Cocktail</Col>
          </Row>
          <Col>
            <ol start="3">
              <li>
                <p>Pick the cocktail you want to order from the recipe book.
                </p>
              </li>
            </ol>
          </Col>
          <Row>
              <div className="orderProcess"><img src={img} alt=""/></div>
          </Row>
      </Container>
      

      <Container className='p-5'>
          <Row>
            <Col className="title">PARTNERS AND COLLABORATORS</Col>        
          </Row>
          <Row>
              <Col className="subtitle">Brand Introduction</Col>
          </Row>
          <Col>
            <ol start="4">
              <li>
                <p>Our partners in crime.
                </p>
              </li>
            </ol>
          </Col>
          <Row className='p-5'>
            <Carousel/>
          </Row>
      </Container>
      <Footer />
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
