import * as React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { H1 } from '../Styles';
import { validateEmail, validatePassword } from '../Validations';
import { Form } from './Form';
import { Button } from './Button';

export interface LoginFormProps {
  onButtonTap: (email: string, password: string) => void;
  isLoading: boolean;
}

export class LoginForm extends React.Component<LoginFormProps> {
  private email: string = ''
  private password: string = ''

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <H1>Bem-vindo(a) à Taqtile!</H1>

        <Form
          textTop='Email'
          onEndEditing={this.handleEmailChange}
          validationFunction={validateEmail}
        />

        <Form
          textTop='Senha'
          onEndEditing={this.handlePasswordChange}
          validationFunction={validatePassword}
        />

        <View style={styles.button}>
          <Button
            title="Entrar"
            onPress={this.handleButtonTap}
            disabled={this.props.isLoading}
          />
        </View>

        {this.props.isLoading &&
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black"/>      
          </View>
        }
      </View>
    );
  }

  private handleEmailChange = (text: string) => this.email = text
  private handlePasswordChange = (text: string) => this.password = text
  private handleButtonTap = () => {
    if (this.email && this.password) {
     this.props.onButtonTap(this.email, this.password);
    }
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "stretch",
    padding: 16
  },
  button: {
    marginTop: 8,
    alignSelf: "stretch"
  },
  loading: {
    marginTop: 24,
    alignSelf: "stretch",
    alignItems: "center"
  }
})