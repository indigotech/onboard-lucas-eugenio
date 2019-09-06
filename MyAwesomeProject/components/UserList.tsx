import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, ActivityIndicator, Button } from "react-native"
import { getUsersPromise } from '../queries/Users'
import { FetchResult } from "apollo-link"

interface UserPresentation {
  id: number
  name: string
  email: string
}

interface UserListState {
  users: UserPresentation[]
  loadingIcon: boolean
  usersError: boolean
  offset: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export const usersPerPage: number = 8
const errorText: string = 'Ops, Algo Deu Errado!'

export class UserList extends Component<{}, UserListState> {
  constructor(props: {}) {
      super(props)
      this.state = {
        users: [],
        loadingIcon: true,
        usersError: false,
        offset: 0,
        hasNextPage: false,
        hasPreviousPage: false
      }
  }

  private getUsersArray() {
    getUsersPromise(this.state.offset)
    .then(result => this.setUsersList(result))
    .catch(error => this.setState({usersError: true}))
    .finally(() => this.setState({loadingIcon: false}))
  }

  private setUsersList(result: FetchResult) {
    if (!result.data) { return }
    this.setState({
      users: result.data.Users.nodes, 
      loadingIcon: false,
      hasPreviousPage: result.data.Users.pageInfo.hasPreviousPage,
      hasNextPage: result.data.Users.pageInfo.hasNextPage
    })
  }

  private displayLoadingIcon() {
    if (this.state.loadingIcon) { 
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black"/>
        </View> 
      )
    }
  }

  private displayItemOfList(item: UserPresentation) {
    return (
      <View style={styles.flatview}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    )
  }

  private displayUsersError() {
    if (this.state.usersError) {
      return (
        <View style={styles.flatview}>
          <Text style={styles.error}>{errorText}</Text>
        </View>
      )
    }
  }

  private displayButtonsContainer() {
    return (
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            title="<<"
            onPress={this.handlePreviousButtonTap}
            disabled={!this.state.hasPreviousPage}
            color="white"
          />
        </View>
  
        <View style={styles.button}>
          <Button
            title=">>"
            onPress={this.handleNextButtonTap}
            disabled={!this.state.hasNextPage}
            color="white"
          />
        </View>
      </View>
    )
  }

  private handlePreviousButtonTap = async () => { 
    await this.setState({offset: this.state.offset - usersPerPage})
    this.getUsersArray()
  }
  private handleNextButtonTap = async () => { 
    await this.setState({offset: this.state.offset + usersPerPage}) 
    this.getUsersArray()
  }

  render() {
    return (
      <View style={styles.root}>
        <SafeAreaView/>
        <Text style={styles.greeting}>
          Lista de Usuários
        </Text>

        <View style={styles.body}>
          <FlatList
            data={this.state.users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => this.displayItemOfList(item)}
            keyExtractor={item => item.email}
          />
        </View>

        {this.displayUsersError()}

        {this.displayLoadingIcon()}

        {this.displayButtonsContainer()}
      </View>
    )
  }

  componentDidMount() {
    this.getUsersArray()
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
    marginTop: 10,
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
  },
  loading: {
    marginTop: 20,
    alignSelf: "stretch",
    alignItems: "center"
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "cadetblue",
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  error: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold"
  }
})