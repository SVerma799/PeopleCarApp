import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Update from "../forms/Person/Update";

const getStyles = () => ({
  card: {
    width: "500px",
    backgroundColor: "#eee",
    marginBottom: "70px",
    border: "1px solid grey",
  },
});

const Person = (props) => {
  const styles = getStyles();
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
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            // <RemovePerson id={id} ownCars={props.ownCars} />,
          ]}
          style={styles.card}
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
          {/* {props.ownCars.map(({ id, make, model }) => (
            <Car key={id} id={id} make={make} model={model} />
          ))} */}
          <Link
            to={`/people/${id}`}
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "navy",
            }}
          >
            Learn More to Edit Car Info
          </Link>
        </Card>
      )}
    </div>
  );
};

export default Person;
