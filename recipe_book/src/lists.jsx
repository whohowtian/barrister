import React, { useEffect, useState } from "react";
import background from './img/cocktail_bg.jpg';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Popup from './details_popup';
import Row from 'react-bootstrap/Row';

export default () => {
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
        setIsOpen(!isOpen);

        if(Number.isInteger(id)){
            axios
            .get("http://localhost:3004/barrister_ingredient")
            .then((response) => {
                return axios.get("http://localhost:3003//barrister_cocktail/cocktail/" + id).then((resp) => {
                    const values = {};
                    const addons = [];
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
                    </Container>
                </>
            }

            handleClose={togglePopup}
            />}
        </div>
    </>    
  );
};