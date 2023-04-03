import React, { useEffect, useState } from "react";
import background from './img/cocktail_bg.jpg';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Popup from './details_popup';
import Alert from './alert';
import Row from 'react-bootstrap/Row';
import { CaretLeftSquareFill, CaretRightSquareFill, Cart } from 'react-bootstrap-icons';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default () => {
    const user = 1;
    const [cocktail_name, setName] = useState({});

    useEffect(() => {
      axios
        .get("http://localhost:3003/barrister_cocktail/cocktail")
        .then((resp) => {
          const names = [];
          for (let name of resp.data.data.cocktails) {
            names.push([name.cocktail_id, name.cocktail_name]);
          }
          setName(names);
        })
        .catch((err) => console.log(err));
    }, []);

    const [isOpen, setIsOpen] = useState(false);
 
    const [detail, setDetails] = useState({});
    const [addons, setAddons] = useState([]);
    function togglePopup(id){
        setDetails({});
        setAddons([]);
        setNum(0);
        setIsOpen(!isOpen);

        if(Number.isInteger(id)){
            axios
            .get("http://localhost:3004/barrister_ingredient")
            .then((response) => {
                return axios.get("http://localhost:3003//barrister_cocktail/cocktail/" + id).then((resp) => {
                    const values = {};
                    const addons = [];
                    values["cocktail_id"] = id;
                    values["cocktail_name"] = resp.data.data.cocktail.cocktail_name;
                    values["cocktail_price"] = resp.data.data.cocktail.cocktail_price;

                    for (let ingredient of response.data.data.ingredients) {
                        if(ingredient.ingredient_id == resp.data.data.cocktail.first_spirit) {
                            values["first_spirit"] = ingredient.ingredient_name;
                        }else if(ingredient.ingredient_id == resp.data.data.cocktail.second_spirit){
                            values["second_spirit"] = ingredient.ingredient_name;
                        }else if(ingredient.ingredient_id == resp.data.data.cocktail.sweet_base){
                            values["sweet_base"] = ingredient.ingredient_name;
                        }else if(ingredient.ingredient_id == resp.data.data.cocktail.sour_base){
                            values["sour_base"] = ingredient.ingredient_name;
                        }

                        
                        for(let addon of resp.data.data.addons){
                            if(ingredient.ingredient_id == addon.addOn_id) {
                                addons.push(ingredient.ingredient_name);
                            }
                        }
                    }
                    setDetails(values);
                    setAddons(addons);

                }).catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
    }

    let [num, setNum]= useState(0);
    let incNum =()=>{
      if(num<=99)
      {
      setNum(Number(num)+1);
      }
    };
    let decNum = () => {
       if(num>0)
       {
        setNum(num - 1);
       }
    }
    let handleChange = (e)=>{
        setNum(e.target.value);
        }

    let submit_item = ()=>{
        //Pseudo code. Will change after order microservice is established.

        //Axios GET order under user_id. Maybe can just condition SQL statement to get just the cart status order.
        const isCart = true;

        if(isCart){
            //Axios POST cart item
            //Post detail["cocktail_id"]
            //Post num
            //Post total = detail["cocktail_price"] * num
            //Retrieve message for alert
        }else{
            //Axios POST cart item and create new cart order - refer to barrister_cocktail for reference
            //Post detail["cocktail_id"]
            //Post num
            //Post total = detail["cocktail_price"] * num
            //Retrieve message for alert
        }
        console.log(num);
        console.log(detail);
        togglePopup();
        toggleAlert();
    }

    const [isAlert, setAlert] = useState(false);
    

    function toggleAlert(){
        setAlert(!isAlert);
    }

  return (
    <>
        <Row>
            {(() => {
                var cols = [];
                for(let x = 0; x < cocktail_name.length; x ++){
                cols.push(
                            <Col xs="3" key={x}>
                                <div className="item" style={{ backgroundImage: `url(${background})` }}>
                                    <p className="m-5" onClick={() => togglePopup(cocktail_name[x][0])}>{cocktail_name[x][1]}</p>
                                </div>
                            </Col>
                        )
                }
                return cols
            })()}
        </Row>

        <div>
            {isOpen && <Popup
            content={
                <>
                    <h1><b>{detail["cocktail_name"]}(${detail["cocktail_price"]})</b></h1>
                    <Container>
                        <Row>
                            <Col xs="6">
                                <p>2oz of {detail["first_spirit"]}</p>
                                <p>2oz of {detail["second_spirit"]}</p>
                                <p>2oz of {detail["sweet_base"]}</p>
                                <p>2oz of {detail["sour_base"]}</p>
                            </Col>
                            <Col xs="6">
                                {(() => {
                                    var add_ons = [];
                                    for(let i = 0; i < addons.length; i ++){
                                        add_ons.push(<p key={i}>1x of {addons[i]}</p>)
                                    }
                                    return add_ons
                                })()}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="5">
                                <Row>
                                    <Col xs="3"><Button className="input" variant="secondary" onClick={decNum}><CaretLeftSquareFill/></Button></Col>
                                    <Col xs="4">
                                        <Form.Group>
                                            <Form.Control
                                            style={{fontSize:"20px", textAlign:"center", backgroundColor:"#AA937F", color:"white"}}
                                            type="number"
                                            placeholder="0"
                                            value={num}
                                            onChange={handleChange}
                                            readOnly
                                            min={1}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs="3"><Button className="input" variant="secondary" onClick={incNum}><CaretRightSquareFill/></Button></Col>
                                </Row>
                            </Col>
                            <Col>
                                <Button variant="secondary" className="input" onClick={submit_item}><Cart/> Add to My Cart</Button>
                            </Col>
                        </Row>
                        
                    </Container>
                </>
            }
            handleClose={togglePopup}
            />}
        </div>

        <div>
            {isAlert && <Alert
            content={
                <>
                    <p><i>add AXIOS message</i></p>
                </>
            }
            handleClose={toggleAlert}
            />}
        </div>
    </>    
  );
};