import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { ICharacter } from "../reducers/charReducers";

interface IProps {
  callBackHandler: any;
  charToUpdate?: ICharacter;
}

const FormExampleForm: React.FC<IProps> = props => {
  const [form, setForm] = useState({
    name: "",
  });

  const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ name: e.target.value });
    console.log("form", form);
  };

  const nameSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.callBackHandler(props.charToUpdate ? { name: form.name, id: props.charToUpdate.id } : form.name);
    setForm({ name: "" });
  };

  return (
    <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => nameSubmitted(e)}>
      <Form.Field>
        <label>First Name</label>
        <input
          placeholder="First Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            nameChanged(e);
          }}
          value={form.name}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default FormExampleForm;
