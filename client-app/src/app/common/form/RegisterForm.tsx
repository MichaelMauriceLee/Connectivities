import { combineValidators, isRequired } from "revalidate";
import { useContext } from "react";
import { RootStoreContext } from "../../stores/rootStore";
import React from "react";
import { IUserFormValues } from "../../models/user";
import { Form as FinalForm, Field } from "react-final-form";
import { Header, Form, Button } from "semantic-ui-react";
import TextInput from "./TextInput";
import ErrorMessage from "./ErrorMessage";
import { FORM_ERROR } from "final-form";

const validate = combineValidators({
  email: isRequired("email"),
  username: isRequired("username"),
  displayName: isRequired("display name"),
  password: isRequired("password")
});

//FOR SOME REASON, FIELD DOESN'T TAKE React.FC<IProps>
export const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field
            name="email"
            component={TextInput as any}
            placeholder="Email"
          />
          <Field
            name="username"
            component={TextInput as any}
            placeholder="Username"
          />
          <Field
            name="displayName"
            component={TextInput as any}
            placeholder="Display Name"
          />
          <Field
            name="password"
            component={TextInput as any}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};
