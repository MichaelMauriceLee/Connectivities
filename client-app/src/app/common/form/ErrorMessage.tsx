import React from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";

type IProps = {
  error: AxiosResponse;
  text?: string;
};

//I CANT DECLARE THIS AS React.FC<IProps> FOR SOME REASON
const ErrorMessage: any = ({ error, text }: IProps) => {
  return (
    <Message error>
      <Message.Header>{error.statusText}</Message.Header>
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <Message.List>
          {Object.values(error.data.errors)
            .flat()
            .map((err, i) => (
              <Message.Item key={i}>{err}</Message.Item>
            ))}
        </Message.List>
      )}
      {text && <Message.Content content={text} />}
    </Message>
  );
};

export default ErrorMessage;
