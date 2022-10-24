import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { UPDATE_PERSON } from "../../../queries";

const Update = (props) => {
  const [id] = useState(props.id);
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [personName, setPersonName] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
  });

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    const { firstName, lastName } = values;
    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, target) => {
    const { name, value } = target;
    setPersonName({ ...personName, [name]: value });
    props.updateStateVariable(variable, target);
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      onFinish={onSubmit}
      initialValues={{
        firstName: personName.firstName,
        lastName: personName.lastName,
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your First Name" }]}
      >
        <Input
          placeholder="i.e. John"
          name="firstName"
          onChange={(e) => updateStateVariable("firstName", e.target)}
        />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your Last Name" }]}
      >
        <Input
          placeholder="i.e. Smith"
          name="lastName"
          onChange={(e) => updateStateVariable("lastName", e.target)}
        />
      </Form.Item>
      
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default Update;
