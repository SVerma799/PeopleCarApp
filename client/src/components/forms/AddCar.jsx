import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

export default function AddCar() {
  const [form] = Form.useForm();
  const [id, setId] = useState(uuidv4());
  const [personId, setPersonId] = useState("");
  const [addCar] = useMutation(ADD_CAR);

  const onFinish = (values) => {
    if (!personId) {
      alert("Please select an owner");
    } else {
      const { make, model } = values;
      const year = parseInt(values.year);
      const price = parseFloat(values.price);
      setId(uuidv4());

      addCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId,
        },
        update: (proxy, { data: { addCar } }) => {
          const data = proxy.readQuery({ query: GET_CARS });
          proxy.writeQuery({
            query: GET_CARS,
            data: {
              ...data,
              cars: [...data.cars, addCar],
            },
          });
        },
      });
    }
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  return (
    <>
      <h2>Add a Car</h2>
      <Form
        form={form}
        name="add-car-form"
        layout="inline"
        size="middle"
        style={{
          marginBottom: "100px",
          width: "60%",
          justifyContent: "center",
          alignContent: "space-between",
          height: "90px",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="year"
          rules={[
            {
              required: true,
              message: "Please input the year of the car",
            },
          ]}
        >
          <Input placeholder="i.e. 1980"></Input>
        </Form.Item>
        <Form.Item
          name="make"
          rules={[
            {
              required: true,
              message: "Please input the make of the car",
            },
          ]}
        >
          <Input placeholder="i.e. Ford"></Input>
        </Form.Item>
        <Form.Item
          name="model"
          rules={[
            {
              required: true,
              message: "Please input the model of the car",
            },
          ]}
        >
          <Input placeholder="i.e. Mustang"></Input>
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price of the car",
            },
          ]}
        >
          <Input placeholder="i.e. 20,000"></Input>
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
            placeholder="Select the owner ID"
            name="personId"
            onChange={(value) => setPersonId(value)}
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
                (!form.isFieldsTouched(true) && personId === "") ||
                form.getFieldError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
