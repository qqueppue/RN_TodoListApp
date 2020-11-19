import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar, View} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Text children="Todo List" style={styles.appTitle} />
          <View style={styles.card}>
            <TodoInsert />
            <TodoList />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b3b3',
  },
  appTitle: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    // marginBottom: 20,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
});

export default App;
