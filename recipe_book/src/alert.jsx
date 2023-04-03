import React from "react";
import { BoxArrowLeft } from 'react-bootstrap-icons';
 
const Popup = props => {
  return (
    <div className="popup-alert">
      <div className="alert">
        <p className="title">CART STATUS</p>
        <span className="close-icon" onClick={props.handleClose}><BoxArrowLeft/></span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;