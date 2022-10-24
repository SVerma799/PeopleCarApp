import { List } from "antd";
import Person from "../ListItemFolder/Person";

const People = ({ peopleWithCars }) => {
  return (
    <List
      style={{
        display: "flex ",
        justifyContent: "flex-start",
        margin: "1rem",
      }}
    >
      {peopleWithCars.map(({ id, firstName, lastName, ownCars }) => (
        <List.Item key={id}>
          {/* using Person card to show list of person with cars list */}
          <Person
            key={id}
            id={id}
            firstName={firstName}
            lastName={lastName}
            ownCars={ownCars}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default People;
