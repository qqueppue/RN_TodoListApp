import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar, View} from 'react-native';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  // todos: {id: 1, textValue: 'todoitem', checked: true/false }
  const [todos, setTodos] = useState([]);

  // 할일 목록 추가
  const addTodo = (text) => {
    setTodos([
      ...todos,
      {id: todos.length + 1, textValue: text, checked: false},
    ]);
    // Axios DB 처리 (insert)
  };

  function onRemove(id) {
    // alert('delete : '+ id);
    console.log(`delete id => ${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
    // Axios DB 처리 (delete)
  }

  const onToggle = (id) => {
    console.log(`App / toggle id => ${id}`);
    console.log('App onToggle before => ', todos);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo,
      ),
      // Axios DB 처리 (update)
    );
    console.log('onToggle todos ', todos);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text children="Todo List" style={styles.appTitle} />
        <View style={styles.card}>
          <TodoInsert onAddTodo={addTodo} />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </View>
        {/* <View style={styles.cardEnd} /> */}
      </SafeAreaView>
    </>
  );
};

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
    // marginBottom: 10,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  cardEnd: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },
});

export default App;
