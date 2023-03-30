import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import background from "./img/create-cocktail-blueprint.jpg";
import "./index.css";
import axios from "axios";

export default () => {
  const [ings, setIngs] = useState({
    spirit: [],
    sweet: [],
    sour: [],
    add_on: [],
  });
  const user = 1;
  const nameRef = useRef(null);
  const [spirit1, setSpirit1] = useState({ ingredient_price: 0 });
  const [spirit2, setSpirit2] = useState({ ingredient_price: 0 });
  const [sweet, setSweet] = useState({ ingredient_price: 0 });
  const [sour, setSour] = useState({ ingredient_price: 0 });
  const [add1, setAdd1] = useState({ ingredient_price: 0 });
  const [add2, setAdd2] = useState({ ingredient_price: 0 });
  const [add3, setAdd3] = useState({ ingredient_price: 0 });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3004/barrister_ingredient")
      .then((resp) => {
        const ingredients = { spirit: [], sweet: [], sour: [], add_on: [] };
        for (let ingredient of resp.data.data.ingredients) {
          ingredients[ingredient.ingredient_category].push(ingredient);
        }
        setIngs(ingredients);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3003/barrister_cocktail/create_cocktail", {
      name: nameRef.current.value,
      spirit1: spirit1.ingredient_id,
      spirit2: spirit2.ingredient_id,
      sweet: sweet.ingredient_id,
      sour: sour.ingredient_id,
      add_ons: [add1.ingredient_id && add1.ingredient_id, add2.ingredient_id && add2.ingredient_id,
        add3.ingredient_id && add3.ingredient_id],
      total: total,
      user: user
    })
    .then(resp => console.log(resp.data.data))
    .catch(err => console.log(err))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="Create_Order">
        <img src={background} alt=""></img>

        <Form.Group className="Cocktail_Name">
          <Form.Label>Cocktail's Name:</Form.Label>
          <Form.Control type="text" className="Input" ref={nameRef} required />
        </Form.Group>

        <Form.Group className="Cocktail_1stSpirit">
          <Form.Select
            className="Input"
            required
            onChange={(e) => {
              const newIng = ings.spirit[e.target.value];
              setTotal(
                total - spirit1.ingredient_price + newIng.ingredient_price
              );
              setSpirit1(newIng);
            }}
          >
            <option value="" hidden>
              Select
            </option>
            {ings.spirit.map((spirit, i) => (
              <option value={i} key={spirit.ingredient_id}>
                {spirit.ingredient_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="Cocktail_Sweet">
          <Form.Select
            className="Input"
            required
            onChange={(e) => {
              const newIng = ings.sweet[e.target.value];
              setTotal(
                total - sweet.ingredient_price + newIng.ingredient_price
              );
              setSweet(newIng);
            }}
          >
            <option value="" hidden>
              Select
            </option>
            {ings.sweet.map((sweet, i) => (
              <option value={i} key={sweet.ingredient_id}>
                {sweet.ingredient_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="Cocktail_2stSpirit">
          <Form.Select
            className="Input"
            required
            onChange={(e) => {
              const newIng = ings.spirit[e.target.value];
              setTotal(
                total - spirit2.ingredient_price + newIng.ingredient_price
              );
              setSpirit2(newIng);
            }}
          >
            <option value="" hidden>
              Select
            </option>
            {ings.spirit.map((spirit, i) => (
              <option value={i} key={spirit.ingredient_id}>
                {spirit.ingredient_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="Cocktail_Sour">
          <Form.Select
            className="Input"
            required
            onChange={(e) => {
              const newIng = ings.sour[e.target.value];
              setTotal(total - sour.ingredient_price + newIng.ingredient_price);
              setSour(newIng);
            }}
          >
            <option value="" hidden>
              Select
            </option>
            {ings.sour.map((sour, i) => (
              <option value={i} key={sour.ingredient_id}>
                {sour.ingredient_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="Cocktail_AddOns">
          <Form.Group className="pb-1">
            <Form.Select
              className="Input"
              onChange={(e) => {
                let newIng = { ingredient_price: 0 };
                if (e.target.value !== "") {
                  newIng = ings.add_on[e.target.value];
                }
                setTotal(
                  total - add1.ingredient_price + newIng.ingredient_price
                );
                setAdd1(newIng);
              }}
            >
              <option value="">Select</option>
              {ings.add_on.map((add_on, i) => (
                <option value={i} key={add_on.ingredient_id}>
                  {add_on.ingredient_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="pb-1">
            <Form.Select
              className="Input"
              onChange={(e) => {
                let newIng = { ingredient_price: 0 };
                if (e.target.value !== "") {
                  newIng = ings.add_on[e.target.value];
                }
                setTotal(
                  total - add2.ingredient_price + newIng.ingredient_price
                );
                setAdd2(newIng);
              }}
            >
              <option value="">Select</option>
              {ings.add_on.map((add_on, i) => (
                <option value={i} key={add_on.ingredient_id}>
                  {add_on.ingredient_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Select
              className="Input"
              onChange={(e) => {
                let newIng = { ingredient_price: 0 };
                if (e.target.value !== "") {
                  newIng = ings.add_on[e.target.value];
                }
                setTotal(
                  total - add3.ingredient_price + newIng.ingredient_price
                );
                setAdd3(newIng);
              }}
            >
              <option value="">Select</option>
              {ings.add_on.map((add_on, i) => (
                <option value={i} key={add_on.ingredient_id}>
                  {add_on.ingredient_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="Cocktail_Calc">
          <Form.Group className="pr-1">
            <Form.Control
              type="text"
              className="Input2"
              placeholder="$ - "
              value={total}
              disabled
            />
          </Form.Group>
        </div>

        <div className="Submit">
          <Button variant="secondary" type="submit" className="Input2">
            Mix!
          </Button>
        </div>
      </div>
    </Form>
  );
};
