import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native"

interface UserPresentation {
    name: string,
    email: string
}

export class UserList extends Component<{}> {
    constructor(props: {}) {
        super(props)
    }
    

  render() {
    const users: Array<UserPresentation> = [
        { name:  "Rick Sanchez",
          email: "rick@email.com" },
        { name:  "Morty Smith",
          email: "morty@email.com" },
        { name:  "Summer Smith",
          email: "summer@email.com"},
        { name:  "Beth Sanchez",
          email: "beth@email.com"}
    ]

    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <Text style={styles.greeting}>
          Lista de Usuários
        </Text>

        <View style={styles.body}>
          <FlatList
            data={users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
                <View style={styles.flatview}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
            }
            keyExtractor={item => item.email}
          />
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
  greeting: {
    color: "#999",
    fontWeight: "bold",
    fontSize: 28
  },
  body: {
    alignItems: "baseline",
    alignSelf: "stretch",
    marginTop: 30,
    padding: 20,
    minHeight: 200
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    color: "#999",
    fontSize: 20,
    fontWeight: "bold"
  },
  email: {
    color: 'red'
  }
})