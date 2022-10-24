import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../../queries";

export default function Add() {
  const [form] = Form.useForm();
  const [id, setId] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);

  const onSubmit = (values) => {
    const { firstName, lastName } = values;
    //  Setting the unique Id for the newly added person
    setId(uuidv4());
    // Calling AddPerson Mutation to add the person to db.
    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (proxy, { data: { addPerson } }) => {
        const data = proxy.readQuery({ query: GET_PEOPLE });
        proxy.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <>
      <div
        style={{
          border: "1px solid lightgrey",
          width: "max-content",
          borderRadius: "10px",
          margin: "1rem",
        }}
      >
        <h2 style={{ margin: "1rem" }}>Add a Person</h2>
        <Form
          form={form}
          name="add-person-form"
          size="large"
          style={{ margin: "1rem" }}
          onFinish={onSubmit}
        >
          {/* First Name Section */}
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your First Name",
              },
            ]}
          >
            <Input placeholder="i.e. John" style={{ width: "400px" }}></Input>
          </Form.Item>
          {/* Last Name Section */}
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name",
              },
            ]}
          >
            <Input placeholder="i.e. Smith" style={{ width: "400px" }}></Input>
          </Form.Item>
          {/* Add Button with validations */}
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Person
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
