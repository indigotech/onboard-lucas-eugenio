import React, { Component } from "react";
import { Alert } from "react-native";
import { goToUsers } from "../Screens";
import RegisterUserContainer, { RegisterUserContainerChildrenParams } from './RegisterUserContainer';
import { RegisterUserForm } from './RegisterUserForm';

export class RegisterUserScreen extends Component<{}> {

  render() {
    return (
      <RegisterUserContainer>
        {(params: RegisterUserContainerChildrenParams, mutationFunction: (name: string, email: string, password: string, cpf: string, birthDate: string, role: string) => void) => {

          if (params.error) {
            Alert.alert('ERRRRROU!', params.error);
          }

          if (params.success) {
            goToUsers();
            return null;
          }

          return (
            <RegisterUserForm isLoading={params.isLoading} onButtonTap={mutationFunction} />
          );
        }}
      </RegisterUserContainer>
    )
  }
}