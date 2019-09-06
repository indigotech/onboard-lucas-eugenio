import React from "react"
import { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, ActivityIndicator } from "react-native"
import { getUsersPromise } from '../queries/Users'
import { FetchResult } from "apollo-link";

interface UserPresentation {
    name: string,
    email: string
}

interface UserListState {
    users: UserPresentation[]
    loadingIcon: boolean
}

export class UserList extends Component<{}, UserListState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            users: [],
            loadingIcon: true
        }
    }

    private getUsersArray() {
        getUsersPromise()
        .then(result => this.setUsersList(result))
        .catch(error => console.warn(error))
        .finally(() => this.setState({loadingIcon: false}))
    }

    private setUsersList(result: FetchResult) {
      if (!result.data) { return }
      this.setState({users: result.data.Users.nodes, loadingIcon: false})
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
            renderItem={({item}) =>
                <View style={styles.flatview}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
            }
            keyExtractor={item => item.email}
          />
        </View>

        <View style={styles.loading}>
              <ActivityIndicator
                style={{display: this.state.loadingIcon ? "flex" : "none"}}
                size="large"
                color="black"
              />
          </View>
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
    marginTop: 40,
    alignSelf: "stretch",
    alignItems: "center"
  }
})