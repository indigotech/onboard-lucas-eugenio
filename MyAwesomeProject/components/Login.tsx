import React from "react"
import { Component } from 'react'
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput, ActivityIndicator, Alert } from "react-native"
import { FetchResult } from 'apollo-boost'
import { UserLogin, LoginInput } from '../mutations/Login'
import { storeToken, localStoreToken } from '../TokenStorage'
import { validateEmail, validatePassword } from '../Validations'
import { goToUsers } from "../Screens"

interface LoginState {
  emailError: string
  passwordError: string
  isLoading: boolean
}

const loginErrorAlert: string =  "Credenciais Inválidas"

export class Login extends Component<{}, LoginState> {
  private email: string
  private password: string

  constructor(props: {}) {
    super(props)
    this.email = ''
    this.password = ''
    this.state = {
      emailError: '',
      passwordError: '',
      isLoading: false
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView />
        <Text style={styles.greeting}>
          Bem-vindo(a) à Taqtile!
        </Text>

        <View style={styles.formBody}>
          <Text style={styles.formsText}>
            E-mail
          </Text>
          <TextInput style={styles.inputBox}
            autoCapitalize = 'none'
            onChangeText={this.handleEmailChange}
          />
          <Text style={styles.errorText}>
            {this.state.emailError}
          </Text>

          <Text style={styles.formsText}>
            Senha
          </Text>
          <TextInput style={styles.inputBox}
            autoCapitalize = 'none'
            onChangeText={this.handlePasswordChange}
          />
          <Text style={styles.errorText}>
            {this.state.passwordError}
          </Text>

          <View style={styles.button}>
            <Button
              title="Entrar"
              onPress={this.handleButtonTap}
              disabled={this.state.isLoading}
              color="white"
            />
          </View>

          <View style={styles.loading}>
            {this.state.isLoading && <ActivityIndicator size="large" color="black"/>}            
          </View>
        </View>
      </View>
    )
  }

  private handleButtonTap = () => {
    const emailErrorText: string = validateEmail(this.email)
    const passwordErrorText: string = validatePassword(this.password)

    if (!passwordErrorText && !emailErrorText) {
      this.setState({isLoading: true})
      this.doLogin()
    } else {
      this.setState({emailError: emailErrorText, passwordError: passwordErrorText})
    }
  }

  private doLogin() {
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
      await storeToken(token)
    } catch (error) {
      localStoreToken(token)
    } finally {
      goToUsers()
    }
  }

  private handleEmailChange = (text: string) => this.email = text
  private handlePasswordChange = (text: string) => this.password = text
}

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "stretch"
  },
  formBody: {
    alignItems: "baseline",
    alignSelf: "stretch",
    marginTop: 30,
    padding: 20,
    minHeight: 200
  },
  inputBox: {
    marginTop: 20,
    alignSelf: "stretch",
    borderColor: "#999",
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    borderRadius: 10
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    alignSelf: "stretch",
    padding: 10,
    backgroundColor: "cadetblue",
    fontWeight: "bold"
  },
  greeting: {
    color: "#999",
    fontWeight: "bold",
    fontSize: 28
  },
  formsText: {
    marginTop: 20,
    color: "#999",
    fontWeight: "bold",
    fontSize: 20
  },
  errorText: {
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
    fontSize: 10
  },
  loading: {
    marginTop: 40,
    alignSelf: "stretch",
    alignItems: "center"
  }
})