import { useMutation } from "@apollo/client";
import { DeleteOutlined } from "@ant-design/icons";
import { GET_CARS, REMOVE_CAR } from "../../queries";
import { filter } from "lodash";

const RemoveCar = (props) => {
  const { id } = props;
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => c.id !== removeCar.id),
        },
      });
    },
  });
  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to remove selected car?"
    );
    if (result) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="Delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemoveCar;
