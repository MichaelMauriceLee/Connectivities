import React from "react";
import { combineValidators, isRequired } from "revalidate";
import { Form as FinalForm, Field } from "react-final-form";
import { IProfile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";

const validate = combineValidators({
  displayName: isRequired("displayName")
});

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ profile, updateProfile }) => {
  return (
    <FinalForm
      validate={validate}
      initialValues={profile!}
      onSubmit={updateProfile}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            placeholder="DisplayName"
            value={profile.displayName}
            component={TextInput as any}
          />
          <Field
            name="bio"
            placeholder="bio"
            value={profile.bio}
            component={TextInput as any}
          />
          <Button
            loading={submitting}
            disabled={invalid || pristine}
            floated="right"
            positive
            content="Update Profile"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileEditForm);
