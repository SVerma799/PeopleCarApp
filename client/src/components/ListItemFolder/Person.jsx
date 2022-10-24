import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Update from "../forms/Person/Update";
import Car from "../ListFolder/Car";
import RemovePerson from "../buttons/RemovePerson";

const Person = (props) => {
  const [id] = useState(props.id);
  const [personName, setPersonName] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
  });
  const [editMode, setEditMode] = useState(false);
  const handleButtonClick = () => {
    setEditMode(!editMode);
  };
  const updateStateVariable = (variable, target) => {
    const { name, value } = target;
    setPersonName({ ...personName, [name]: value });
  };

  return (
    <div>
      {editMode ? (
        <Update
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          // action for the edit button and remove button
          actions={[
            <EditOutlined
              style={{ color: "blue" }}
              key="edit"
              onClick={handleButtonClick}
            />,
            <RemovePerson id={id} ownCars={props.ownCars} />,
          ]}
          style={{
            width: "400px",
            backgroundColor: "lightgrey",
            border: "1px solid grey",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontSize: "20px",
            }}
          >
            {personName.firstName} {personName.lastName}
          </p>
          {/* Showing the  list of cars of the Person */}
          {props.ownCars.map(({ id, make, model }) => (
            <Car key={id} id={id} make={make} model={model} />
          ))}
          <Link
            to={`/people/${id}`}
            style={{
              fontWeight: "bold",
              color: "Blue",
            }}
          >
            Edit
          </Link>
        </Card>
      )}
    </div>
  );
};

export default Person;
