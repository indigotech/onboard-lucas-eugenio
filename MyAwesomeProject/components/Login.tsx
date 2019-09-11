import React from "react"
import { Component } from 'react'
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Alert } from "react-native"
import { FetchResult } from 'apollo-boost'
import { UserLogin, LoginInput } from '../mutations/Login'
import { storeTokenOnMemory, storeTokenLocal } from '../TokenStorage'
import { validateEmail, validatePassword } from '../Validations'
import { goToUsers } from "../Screens"
import { Button } from './Button'
import { Form } from './Form'
import { H1 } from '../Styles'

interface LoginState { isLoading: boolean }

const loginErrorAlert: string =  "Credenciais Inválidas"

export class Login extends Component<{}, LoginState> {
  private email: string = ''
  private password: string = ''

  constructor(props: {}) {
    super(props)
    this.state = { isLoading: false }
  }

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
            disabled={this.state.isLoading}
          />
        </View>

        <View style={styles.loading}>
          {this.state.isLoading && <ActivityIndicator size="large" color="black"/>}            
        </View>
      </View>
    )
  }

  private doLogin() {
    this.setState({isLoading: true})
    const LoginInput: LoginInput = {
      email: this.email,
      password: this.password,
      rememberMe: true
    }
    UserLogin(LoginInput)
    .then(result => this.storeToken(result))
    .catch(() => Alert.alert(loginErrorAlert))
    .finally(() => this.setState({isLoading: false}))
  }

  private async storeToken(result: FetchResult) {
    if (!result.data) { return }
    const token: string = result.data.Login.token
    try {
      await storeTokenOnMemory(token)
    } catch (error) {
      storeTokenLocal(token)
    } finally {
      goToUsers()
    }
  }

  private handleEmailChange = (text: string) => this.email = text
  private handlePasswordChange = (text: string) => this.password = text
  private handleButtonTap = () => { if (this.email && this.password) { this.doLogin() } }
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