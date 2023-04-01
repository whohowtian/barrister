import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import background from './img/popup.jpg';
import { BoxArrowLeft } from 'react-bootstrap-icons';
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}><BoxArrowLeft/></span>
        <Container>
            <Row>
                <Col xs="3" className="popup_img" style={{ backgroundImage: `url(${background})` }}></Col>
                <Col>{props.content}</Col>
            </Row>
        </Container>
      </div>
    </div>
  );
};
 
export default Popup;