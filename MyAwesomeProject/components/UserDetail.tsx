import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Button } from "react-native"
import { FetchResult } from "apollo-link"
import { goToUsers } from "../Screens"
import { getUser } from '../queries/User'

interface UserDetailState {
  isLoading: boolean,
  userError: boolean
}

interface UserDetailProps {
  userId: number
}

const errorText: string = 'Ops, Algo Deu Errado!'

export class UserDetail extends Component<UserDetailProps, UserDetailState> {
  private id: number = this.props.userId
  private name: string = ''
  private email: string = ''
  private cpf: string = ''
  private birthDate: string = ''
  private role: 'user' | 'admin'  = 'user'

  constructor(props: {userId: number}) {
    super(props)
    this.state = {
      isLoading: true,
      userError: false
    }
  }

  componentDidMount() {
    this.getUser()
  }

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <Text style={styles.greeting}>Registrar Usuário</Text>

        <View style={styles.loading}>
          {this.state.isLoading && <ActivityIndicator size="large" color="black"/>}            
        </View>

        <View style={styles.formBody}>
          <Text style={styles.formsText}>Nome</Text>
          <Text style={styles.formsTextRed}>{this.name}</Text>

          <Text style={styles.formsText}>E-mail</Text>
          <Text style={styles.formsTextRed}>{this.email}</Text>

          <Text style={styles.formsText}>CPF</Text>
          <Text style={styles.formsTextRed}>{this.cpf}</Text>

          <Text style={styles.formsText}>Data de Nascimento</Text>
          <Text style={styles.formsTextRed}>{this.birthDate}</Text>
          
          <Text style={styles.formsText}>Função</Text>
          <Text style={styles.formsTextRed}>{this.role==='user' ? 'Usuário' : 'Administrador'}</Text>          

          <View style={styles.button}>
            <Button
              title="Voltar"
              onPress={this.handleButtonTap}
              disabled={this.state.isLoading}
              color="white"
            />
          </View>
        </View>
      </View>
    )
  }

  private handleButtonTap = () => {
    goToUsers()
  }

  private getUser() {
    getUser(this.props.userId)
    .then(result => this.setUserDetails(result))
    .catch(() => this.setState({userError: true}))
    .finally(() => this.setState({isLoading: false}))
  }

  private setUserDetails(result: FetchResult) {
    if (!result.data) { return }
    this.name = result.data.User.name
    this.email = result.data.User.email
    this.cpf = result.data.User.cpf
    this.birthDate = result.data.User.birthDate
    this.role = result.data.User.role
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "stretch"
  },
  greeting: {
    color: "#999",
    fontWeight: "bold",
    fontSize: 28
  },
  formBody: {
    alignItems: "baseline",
    alignSelf: "stretch",
    marginTop: 30,
    padding: 20,
    minHeight: 200
  },
  loading: {
    margin: 20,
    alignSelf: "stretch",
    alignItems: "center"
  },
  button: {
    marginTop: 40,
    borderRadius: 10,
    alignSelf: "stretch",
    padding: 10,
    backgroundColor: "cadetblue"
  },
  formsText: {
    marginTop: 15,
    color: "#999",
    fontWeight: "bold",
    fontSize: 20
  },
  formsTextRed: {
    marginTop: 5,
    color: "red",
    fontSize: 20
  },
  error: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold"
  }
})