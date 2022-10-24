import { useState } from "react";
import { Card } from "antd";

import { EditOutlined } from "@ant-design/icons";
import UpdateCar from "../forms/Car/UpdateCar.jsx";
import RemoveCar from "../buttons/RemoveCar.jsx";

const CarInfo = (props) => {
  const [id] = useState(props.id);
  const [car, setCar] = useState({
    year: props.year,
    make: props.make,
    model: props.model,
    price: props.price,
    personId: props.personId,
  });
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, target) => {
    if (variable === "personId") {
      setCar({ ...car, [variable]: target });
      return;
    } else {
      let { name, value } = target;
      setCar({ ...car, [name]: value });
      props.updateStateVariable(variable, value);
    }
  };

  const numberWithComma = new Intl.NumberFormat();
  const formattedPrice = numberWithComma.format(props.price);

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          type="inner"
          style={{
            width: "80%",
            margin: "5px auto",
            border: "1px solid darkgrey",
            marginBottom: "40px",
          }}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          <p>
            <span className="car-detail-label" style={{ fontWeight: "bold" }}>
              Year:
            </span>{" "}
            {props.year}
          </p>
          <p>
            <span className="car-detail-label" style={{ fontWeight: "bold" }}>
              Make:
            </span>{" "}
            {props.make}
          </p>
          <p>
            <span className="car-detail-label" style={{ fontWeight: "bold" }}>
              Model:
            </span>{" "}
            {props.model}
          </p>
          <p>
            <span className="car-detail-label" style={{ fontWeight: "bold" }}>
              Price:
            </span>{" "}
            ${formattedPrice}
          </p>
          <p>
            <span className="car-detail-label" style={{ fontWeight: "bold" }}>
              Owner
            </span>{" "}
            ID: {props.personId}
          </p>
        </Card>
      )}
    </div>
  );
};

export default CarInfo;
