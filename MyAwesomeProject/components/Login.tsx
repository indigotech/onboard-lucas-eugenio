import React from "react"
import { Component } from 'react'
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native"

interface LoginState {
  email: string
  password: string
  emailError: string
  passwordError: string
}

export class Login extends Component<{}, LoginState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    }
  }

  private handleLoginButtonTap = () => {
    if (this.state.email === '') {
      var emailErrorText = 'Por favor, insira um e-mail'
    } else if ( !/\w+@\w+\.com$/.test(this.state.email) ) {
      var emailErrorText = 'Por favor, insira um e-mail válido'
    } else {
      var emailErrorText = ''
    }

    if (this.state.password == '') {
      var passwordError = 'Por favor, insira uma senha'
    } else if (this.state.password.length < 7) {
      var passwordError = 'A senha deve ter ao menos 7 dígitos'
    } else {
      var passwordError = ''
    }

    this.setState({emailError: emailErrorText, passwordError: passwordError})
  } 

  private handleEmailChange = (text: string) => this.setState({email: text})
  private handlePasswordChange = (text: string) => this.setState({password: text})

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
              onPress={this.handleLoginButtonTap}
              accessibilityLabel="submit"
              color="white"
            />
          </View>
        </View>
      </View>
    )
  }
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
  }
})