import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, Button, ListRenderItemInfo, TouchableOpacity } from "react-native"
import { getUsers, UserPresenter } from '../queries/Users'
import { FetchResult } from "apollo-link"
import { goToUserDetail } from "../Screens"

interface UserListState {
  users: UserPresenter[]
  isLoading: boolean
  usersError: boolean
  offset: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export const USERS_PER_PAGE: number = 8
const errorText: string = 'Ops, Algo Deu Errado!'

export class UserList extends Component<{}, UserListState> {
  constructor(props: {}) {
      super(props)
      this.state = {
        users: [],
        isLoading: true,
        usersError: false,
        offset: 0,
        hasNextPage: false,
        hasPreviousPage: false
      }
  }

  componentDidMount() {
    this.getUsers()
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
            renderItem={this.displayItemOfList}
            keyExtractor={item => item.email}
          />
        </View>

        {this.state.usersError && <Text style={styles.error}>{errorText}</Text>}

        {this.state.isLoading && <ActivityIndicator size="large" color="black"/>}

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
      </View>
    )
  }

  private getUsers() {
    getUsers(this.state.offset, USERS_PER_PAGE)
    .then(result => this.setUsersList(result))
    .catch(() => this.setState({usersError: true}))
    .finally(() => this.setState({isLoading: false}))
  }

  private setUsersList(result: FetchResult) {
    if (!result.data) { return }
    this.setState({
      users: result.data.Users.nodes,
      hasPreviousPage: result.data.Users.pageInfo.hasPreviousPage,
      hasNextPage: result.data.Users.pageInfo.hasNextPage
    })
  }

  private displayItemOfList = ({ item: user }: ListRenderItemInfo<UserPresenter>) => {
    return (
      <View style={styles.flatview}>
        <TouchableOpacity
          onPress={this.handleTapDetailButton(user.id)}>
          <Text style={styles.name}>{user.name}</Text>
        </TouchableOpacity>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    )
  }

  private handlePreviousButtonTap = async () => { 
    await this.setState({offset: this.state.offset - USERS_PER_PAGE})
    this.getUsers()
  }
  private handleNextButtonTap = async () => { 
    await this.setState({offset: this.state.offset + USERS_PER_PAGE}) 
    this.getUsers()
  }

  private handleTapDetailButton = (id: number) => () => {
    goToUserDetail(id)
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