import * as React from 'react';
import { RegisterNewUser } from '../mutations/NewUser';

export interface RegisterUserContainerProps {
  children: (
    params: RegisterUserContainerChildrenParams,
    mutationFunction: (name: string, email: string, password: string, cpf: string, birthDate: string, role: string) => void,
  ) => React.ReactNode;
}

export type RegisterUserContainerChildrenParams = RegisterUserContainerState;

interface RegisterUserContainerState {
  isLoading: boolean;
  error: string;
  success: boolean;
}

export default class RegisterUserContainer extends React.Component<RegisterUserContainerProps, RegisterUserContainerState> {
  readonly state = { isLoading: null, success: false, error: null };
  
  render() {
    return this.props.children(this.state, this.doRegisterUser);
  }

  private doRegisterUser = async (name: string, email: string, password: string, cpf: string, birthDate: string, role: string) => {
    this.setState({ isLoading: true });
    try {
      await RegisterNewUser({ name, email, password, cpf, birthDate, role })
      this.setState({ success: true, isLoading: false, error: ''});
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError = (error: {message: string}) => {
    const message: string = error.message
    if (message.includes('weak-password')) {
      this.setState({ error: 'Password não seguro. Por favor, insira um mais seguro', isLoading: false })
    } else if (message.includes('uk_user_email')) {
      this.setState({ error: 'Email já cadastrado. Por favor, insira outro email', isLoading: false })
    } else {
      this.setState({ error: 'Ops! Tivemos um problema com o Registro', isLoading: false });
    }
  }
}
