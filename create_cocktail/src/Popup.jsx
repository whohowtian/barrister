import React from "react";
import { BoxArrowLeft } from 'react-bootstrap-icons';
 
const Popup = props => {
  return (
    <div className="popup-box">
        <div className="box">
            <p className="title">SUBMISSION STATUS</p>
            <hr></hr>
            <span className="close-icon" onClick={props.handleClose}><BoxArrowLeft/></span>
            {props.content}
        </div>
    </div>
  );
};
 
export default Popup;