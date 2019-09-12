import * as React from "react";
import { goToUsers } from "../Screens";
import { LoginForm } from './LoginForm';
import LoginContainer, { LoginContainerChildrenParams } from "./LoginContainer";
import { Alert } from "react-native";

export class LoginScreen extends React.Component<{}> {

  render() {
    return (
      <LoginContainer>
        {(params: LoginContainerChildrenParams, mutationFunction: (email: string, password: string) => void) => {

          if (params.error) {
            Alert.alert('ERRRRROU!', params.error);
          }

          if (params.success) {
            goToUsers();
            return null;
          }

          return (
            <LoginForm isLoading={params.isLoading} onButtonTap={mutationFunction} />
          );
        }}
      </LoginContainer>
    );
  }
}
