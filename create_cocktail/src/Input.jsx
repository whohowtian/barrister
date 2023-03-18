import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import background from './img/create-cocktail-blueprint.jpg';
import "./index.css";

export default() =>{
    return(
        <Form>
        <div className="Create_Order">
          <img src={background} alt=""></img>

          <Form.Group className="Cocktail_Name">
            <Form.Label>Cocktail's Name:</Form.Label>
            <Form.Control type="text" className="Input"/>
          </Form.Group>

          <Form.Group className="Cocktail_1stSpirit">
            <Form.Select className="Input">
              <option>Select</option>
              <option>Select1</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="Cocktail_Sweet">
            <Form.Select className="Input">
              <option>Select</option>
              <option>Select1</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="Cocktail_2stSpirit">
            <Form.Select className="Input">
              <option>Select</option>
              <option>Select1</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="Cocktail_Sour">
            <Form.Select className="Input">
              <option>Select</option>
              <option>Select1</option>
            </Form.Select>
          </Form.Group>

          <div className="Cocktail_AddOns">
            <Form.Group className='pb-1'>
              <Form.Select className="Input">
                <option>Select</option>
                <option>Select1</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='pb-1'>
              <Form.Select className="Input">
                <option>Select</option>
                <option>Select1</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Select className="Input">
                <option>Select</option>
                <option>Select1</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="Cocktail_Calc">
            <Form.Group className='pr-1'>
              <Form.Control type="text" className="Input2" placeholder="$ - " disabled/>
            </Form.Group>
          </div>

          <div className="Submit">
            <Button variant="secondary" type="submit" className="Input2">Mix!</Button>
          </div>

        </div>
      </Form>
    )
}