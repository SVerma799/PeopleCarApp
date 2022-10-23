import { List } from "antd";
import Person from "../ListItemFolder/Person";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const People = ({ peopleWithCars }) => {
  const styles = getStyles();

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {peopleWithCars.map(({ id, firstName, lastName, ownCars }) => (
        <List.Item key={id}>
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
