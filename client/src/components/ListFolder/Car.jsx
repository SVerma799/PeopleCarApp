import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";

const Car = ({ id, make, model }) => {
  return (
    <Card
      type="inner"
      style={{
        width: "80%",
        margin: "30px  0",
        backgroundColor: "#ebebeb",
      }}
      // Action for the remove button
      actions={[<RemoveCar id={id} />]}
    >
      {make} {model}
    </Card>
  );
};

export default Car;
