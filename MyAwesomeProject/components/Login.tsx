// components/Hello.tsx
import React from "react"
import { Component } from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native"

interface State {
  enthusiasmLevel: number
}

export class Login extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      enthusiasmLevel: 1
    }
  }

  onIncrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel + 1 });
  onDecrement = () => this.setState({ enthusiasmLevel: Math.max(0, this.state.enthusiasmLevel - 1) });
  getExclamationMarks = (numChars: number) => Array(numChars + 1).join("!")

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
          <TextInput style={styles.inputBox}></TextInput>

          <Text style={styles.formsText}>
            Senha
          </Text>
          <TextInput style={styles.inputBox}></TextInput>

          <View style={styles.button}>
            <Button
              title="Entrar"
              onPress={this.onIncrement}
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
  }
})