import * as React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View, Picker, Text } from 'react-native';
import { H1 } from '../Styles';
import { validateEmail, validatePassword, validateName, validateCpf, validateBirthDate } from '../Validations';
import { Form } from './Form';
import { Button } from './Button';

export interface RegisterUserFormProps {
  onButtonTap: (name: string, email: string, password: string, cpf: string, birthDate: string, role: string) => void;
  isLoading: boolean;
}

interface RegisterUserState {
  role: 'user' | 'admin'
}

export class RegisterUserForm extends React.Component<RegisterUserFormProps, RegisterUserState> {
  constructor(props: RegisterUserFormProps) {
    super(props)
    this.state = { role: 'user'}
  }

  private name: string = ''
  private email: string = ''
  private password: string = ''
  private cpf: string = ''
  private birthDate: string = ''

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
            disabled={this.props.isLoading}
          />
        </View>

        <View style={styles.loading}>
          {this.props.isLoading && <ActivityIndicator size="large" color="black"/>}            
        </View>
      </View>
    );
  }

  
  private handleNameChange = (text: string) => this.name = text
  private handleEmailChange = (text: string) => this.email = text
  private handlePasswordChange = (text: string) => this.password = text
  private handleCpfChange = (text: string) => this.cpf = text
  private handleBirthDateChange = (text: string) => this.birthDate = text
  private handleRoleChange = (text: 'user' | 'admin') => this.setState({role: text})
  private handleButtonTap = () => {
    if (this.name && this.email && this.password && this.cpf && this.birthDate) {
     this.props.onButtonTap(this.name, this.email, this.password, this.cpf, this.birthDate, this.state.role);
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