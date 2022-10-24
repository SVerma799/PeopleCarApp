import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE, UPDATE_CAR } from "../../../queries";

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [personId, setPersonId] = useState();
  const [car, setCar] = useState({
    year: props.year,
    make: props.make,
    model: props.model,
    price: props.price,
    personId: props.personId,
  });

  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    if (!personId) {
      alert("Please select an owner");
    } else {
      const { make, model } = values;
      const year = parseInt(values.year);
      const price = parseFloat(values.price);

      updateCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      });

      props.onButtonClick();
    }
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

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: car.year,
        make: car.make,
        model: car.model,
        price: car.price,
        personId: personId,
      }}
    >
      <Form.Item
        name="year"
        rules={[
          { required: true, message: "Please input the year of the car" },
        ]}
      >
        <Input
          placeholder="i.e. 1991"
          name="year"
          onChange={(e) => updateStateVariable("year", e.target)}
        />
      </Form.Item>

      <Form.Item
        name="make"
        rules={[
          { required: true, message: "Please input the make of the car" },
        ]}
      >
        <Input
          name="make"
          placeholder="i.e. Ford"
          onChange={(e) => updateStateVariable("make", e.target)}
        />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[
          { required: true, message: "Please input the model of the car" },
        ]}
      >
        <Input
          placeholder="i.e. Mustang"
          name="model"
          onChange={(e) => updateStateVariable("model", e.target)}
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Please input the price of the car" },
        ]}
      >
        <Input
          placeholder="i.e. 20,000"
          name="price"
          onChange={(e) => updateStateVariable("price", e.target)}
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select the owner of the car",
          },
        ]}
      >
        <Select
          style={{ width: "180px" }}
          name="personId"
          defaultValue={props.personId}
          onChange={(value) => {
            setPersonId(value);
            updateStateVariable("personId", value);
          }}
        >
          {data.people.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !personId) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
