import { FetchResult } from 'apollo-boost';
import * as React from 'react';
import { UserLogin } from '../mutations/Login';
import { storeTokenLocal, storeTokenOnMemory } from '../TokenStorage';

export interface LoginContainerProps {
  children: (
    params: LoginContainerChildrenParams,
    mutationFunction: (email: string, password: string) => void,
  ) => React.ReactNode;
}

export type LoginContainerChildrenParams = LoginContainerState;

interface LoginContainerState {
  isLoading: boolean;
  error: string;
  success: boolean;
}

export default class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {
  readonly state = { isLoading: null, success: false, error: null };
  
  render() {
    return this.props.children(this.state, this.doLogin);
  }

  private doLogin = async (email: string, password: string) => {
    this.setState({ isLoading: true });
    try {
      const token = await UserLogin({ email, password, rememberMe: true });
      await this.storeToken(token);
      this.setState({ success: true, isLoading: false });
    } catch (error) {
      this.setState({ error: 'Ops! Tivemos um problema com o Login', isLoading: false });
    }
  }

  private async storeToken(result: FetchResult) {
    if (!result.data) {
      return;
    }

    const token: string = result.data.Login.token

    try {
      await storeTokenOnMemory(token)
    } catch (error) {
      storeTokenLocal(token)
    }
  }
}
