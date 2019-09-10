import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert, ActivityIndicator, Button, TextInput, Picker } from "react-native"
import { RegisterNewUser, UserInput } from '../mutations/NewUser'
import { validateName, validateEmail, validatePassword, validateCpf, validateBirthDate } from '../Validations'

interface RegisterUserState {
  role: string
  nameError: string
  emailError: string
  passwordError: string
  cpfError: string
  birthDateError: string
  isLoading: boolean
}

const SuccessMessage: string = 'Novo Usuário Cadastrado'
const ErrorMessage: string = 'Ops, Algo Deu Errado'

export class RegisterUser extends Component<{}, RegisterUserState> {
  private name: string
  private email: string
  private password: string
  private cpf: string
  private birthDate: string

  constructor(props: {}) {
    super(props)
    this.name = ''
    this.email = ''
    this.password = ''
    this.cpf = ''
    this.birthDate = ''
    this.state = {
      role: 'user',
      nameError: '',
      emailError: '',
      passwordError: '',
      cpfError: '',
      birthDateError: '',
      isLoading: false,
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <Text style={styles.greeting}>Registrar Usuário</Text>

        <View style={styles.formBody}>
            <Text style={styles.formsText}>Nome</Text>
            <TextInput style={styles.inputBox} 
              autoCapitalize='none'
              onChangeText={this.handleNameChange}/>
            <Text style={styles.errorText}>{this.state.nameError}</Text>

            <Text style={styles.formsText}>E-mail</Text>
            <TextInput style={styles.inputBox} 
              autoCapitalize = 'none'
              onChangeText={this.handleEmailChange}/>
            <Text style={styles.errorText}>{this.state.emailError}</Text>
 
            <Text style={styles.formsText}>CPF</Text>
            <TextInput style={styles.inputBox} 
              autoCapitalize = 'none'
              onChangeText={this.handleCpfChange}
              placeholder='Somente Números'/>
            <Text style={styles.errorText}>{this.state.cpfError}</Text>

            <Text style={styles.formsText}>Data de Nascimento</Text>
            <TextInput style={styles.inputBox}
              autoCapitalize = 'none'
              onChangeText={this.handleBirthDateChange}
              placeholder='Formato YYYY-MM-DD'/>
            <Text style={styles.errorText}>{this.state.birthDateError}</Text>

            <Text style={styles.formsText}>Senha</Text>
            <TextInput style={styles.inputBox}
              autoCapitalize = 'none'
              onChangeText={this.handlePasswordChange}/>
            <Text style={styles.errorText}>{this.state.passwordError}</Text>
            
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

  private handleNameChange = (text: string) => this.name = text
  private handleEmailChange = (text: string) => this.email = text
  private handlePasswordChange = (text: string) => this.password = text
  private handleCpfChange = (text: string) => this.cpf = text
  private handleBirthDateChange = (text: string) => this.birthDate = text
  private handleRoleChange = (text: string) => this.setState({role: text})

  private handleButtonTap = () => {
    const nameErrorText: string = validateName(this.name)
    const emailErrorText: string = validateEmail(this.email)
    const passwordErrorText: string = validatePassword(this.password)
    const cpfErrorText: string = validateCpf(this.cpf)
    const birthDateErrorText: string = validateBirthDate(this.birthDate)

    if (!nameErrorText && !emailErrorText && !passwordErrorText && !cpfErrorText && !birthDateErrorText) {
      this.setState({isLoading: true})
      this.doRegisterUser()
    } else {
      this.setState({ nameError: nameErrorText, emailError: emailErrorText, passwordError: passwordErrorText,
        cpfError: cpfErrorText, birthDateError: birthDateErrorText })
    }
  }

  private doRegisterUser() {
    const UserInput: UserInput = {
      name: this.name,
      email: this.email,
      password: this.password,
      cpf: this.cpf,
      birthDate: this.birthDate,
      role: this.state.role
    }
    RegisterNewUser(UserInput)
    .then(() => Alert.alert(SuccessMessage))
    .catch(error => this.handleError(error))
    .finally(() => this.setState({isLoading: false}))
  }

  private handleError = (error: { message: string; }) => {
    const message: string = error.message
    if (message.includes('weak-password')) {
      this.setState({passwordError: 'Password não seguro. Por favor, insira um mais seguro'})
    } else if (message.includes('uk_user_email')) {
      this.setState({emailError: 'Email já cadastrado. Por favor, insira outro email'})
    } else {
      Alert.alert(ErrorMessage)
    }
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
      marginTop: 10,
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
      marginTop: 15,
      color: "#999",
      fontWeight: "bold",
      fontSize: 20
    },
    errorText: {
      marginTop: 5,
      color: "red",
      fontWeight: "bold",
      fontSize: 10
    },
    loading: {
      marginTop: 40,
      alignSelf: "stretch",
      alignItems: "center"
    },
    itemStyle: {
      fontSize: 20,
      height: 75,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    picker: {
      alignSelf: 'stretch'
    },
})