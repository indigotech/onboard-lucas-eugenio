import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, ActivityIndicator, TextInput, Picker } from "react-native"
import { RegisterNewUser, UserInput } from '../mutations/NewUser'
import { validateName, validateEmail, validatePassword, validateCpf, validateBirthDate } from '../Validations'
import { goToUsers } from "../Screens"
import { Button } from './Button'
import { Form } from './Form'
import { H1 } from '../Styles'

interface RegisterUserState {
  role: string
  isLoading: boolean
  specialPasswordError?: string
  specialEmailError?: string
}

const GenericErrorMessage: string = 'Ops, Algo Deu Errado'

export class RegisterUser extends Component<{}, RegisterUserState> {
  private name: string = ''
  private email: string = ''
  private password: string = ''
  private cpf: string = ''
  private birthDate: string = ''

  constructor(props: {}) {
    super(props)
    this.state = {
      role: 'user',
      isLoading: false
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <H1>Registrar Usuário</H1>

        <Form
          textTop='Nome'
          onEndEditing={this.handleNameChange}
          validationFunction={validateName}
        />

        <Form
          textTop='Email'
          onEndEditing={this.handleEmailChange}
          validationFunction={validateEmail}
          textBottom={this.state.specialEmailError}
        />

        <Form
          textTop='CPF'
          onEndEditing={this.handleCpfChange}
          validationFunction={validateCpf}
        />

        <Form
          textTop='Data de Nascimento'
          onEndEditing={this.handleBirthDateChange}
          validationFunction={validateBirthDate}
        />

        <Form
          textTop='Senha'
          onEndEditing={this.handlePasswordChange}
          validationFunction={validatePassword}
          textBottom={this.state.specialPasswordError}
        />
        
        <Text style={styles.formsText}>Função</Text>
        <Picker
          selectedValue={this.state.role}
          style={styles.picker}
          itemStyle={styles.itemStyle}
          onValueChange={this.handleRoleChange}>
          <Picker.Item label="Usuário" value="user"/>
          <Picker.Item label="Administrador" value="admin"/>
        </Picker>

        <View style={styles.button}>
          <Button
            title="Cadastrar"
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

  private handleNameChange = (text: string) => this.name = text
  private handleEmailChange = (text: string) => this.email = text
  private handlePasswordChange = (text: string) => this.password = text
  private handleCpfChange = (text: string) => this.cpf = text
  private handleBirthDateChange = (text: string) => this.birthDate = text
  private handleRoleChange = (text: string) => this.setState({role: text})

  private handleButtonTap = () => {
    const hasError: boolean = !this.name || !this.email || !this.password || !this.cpf || !this.birthDate
    if (!hasError) { this.doRegisterUser() }
  }

  private doRegisterUser() {
    this.setState({ isLoading: true })
    const UserInput: UserInput = {
      name: this.name,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      birthDate: this.birthDate,
      role: this.state.role
    }
    RegisterNewUser(UserInput)
    .then(() => goToUsers())
    .catch(error => this.handleError(error))
    .finally(() => this.setState({isLoading: false}))
  }

  private handleError = (error: {message: string}) => {
    const message: string = error.message
    if (message.includes('weak-password')) {
      this.setState({specialPasswordError: 'Password não seguro. Por favor, insira um mais seguro'})
    } else if (message.includes('uk_user_email')) {
      this.setState({specialEmailError: 'Email já cadastrado. Por favor, insira outro email'})
    } else {
      Alert.alert(GenericErrorMessage)
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
  },
  itemStyle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    height: 100
  },
  picker: {
    alignSelf: 'stretch'
  },
  formsText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "baseline"
  }
})