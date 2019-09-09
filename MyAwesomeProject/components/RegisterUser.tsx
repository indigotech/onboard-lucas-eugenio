import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, ActivityIndicator, Button, TextInput, Picker } from "react-native"
import { getUsersPromise } from '../queries/Users'
import { FetchResult } from "apollo-link"

export const usersPerPage: number = 8
const errorText: string = 'Ops, Algo Deu Errado!'

export class RegisterUser extends Component<{}> {
  constructor(props: {}) {
      super(props)
  }

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <Text style={styles.greeting}>
            Registrar Usuário
        </Text>

        <View style={styles.formBody}>
            <Text style={styles.formsText}>
                Nome
            </Text>
            <TextInput style={styles.inputBox}
                autoCapitalize = 'none'
            />
            <Text style={styles.errorText}>
            </Text>

            <Text style={styles.formsText}>
                E-mail
            </Text>
            <TextInput style={styles.inputBox}
                autoCapitalize = 'none'
            />
            <Text style={styles.errorText}>
            </Text>
{/* 
            <Text style={styles.formsText}>
                CPF
            </Text>
            <TextInput style={styles.inputBox}
                autoCapitalize = 'none'
            />
            <Text style={styles.errorText}>
            </Text>

            <Text style={styles.formsText}>
                Data de Nascimento
            </Text>
            <TextInput style={styles.inputBox}
                autoCapitalize = 'none'
            />
            <Text style={styles.errorText}>
            </Text> */}

            <Text style={styles.formsText}>
                Senha
            </Text>
            <TextInput style={styles.inputBox}
                autoCapitalize = 'none'
            />
            <Text style={styles.errorText}>
            </Text>
            
            <Text style={styles.formsText}>
                Cargo
            </Text>
            <Picker
                style={{height: 50, width: 100}}
                onValueChange={ (itemValue, itemIndex) => this.setState({language: itemValue}) }
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" /> 
            </Picker>
            <Text style={styles.errorText}>
            </Text>
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
    },
    loading: {
      marginTop: 40,
      alignSelf: "stretch",
      alignItems: "center"
    }
})