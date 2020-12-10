import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar, View} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

var db = openDatabase({name: 'TodoItems.db'});

// 수정 할 것 : toggle on/off

const App = () => {
  const [toggleItem, setToggleItem] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        `SELECT name
         FROM sqlite_master
         WHERE type='table' AND name='table_todos'`,
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_todos', []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS table_todos (
                id	INTEGER PRIMARY KEY AUTOINCREMENT,
                content	TEXT NOT NULL,
                toggle	TEXT NOT NULL
              )`,
              [],
            );
            console.log('table regen!');
          }
        },
      );
      // txn.executeSql('SELECT * FROM table_todos', [], (tx, res) => {
      //   console.log('record number : ', res.rows.length);
      //   var temp = [];
      //   for (var i = 0; i < res.rows.length; ++i) {
      //     temp.push(res.rows.item(i));
      //   }
      //   setTodos(temp);
      // });
      listView();
    });
  }, []);

  function listView() {
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM table_todos', [], (tx, res) => {
        console.log('record number : ', res.rows.length);
        var temp = [];
        for (var i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        setTodos(temp);
      });
    });
  }

  // 할일 목록 추가
  const addTodo = (text) => {
    db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO table_todos
                (content, toggle)
         VALUES (?,'false')`,
        [text],
        function (tx, res) {
          console.log('res', res.rowsAffected);
          if (res.rowsAffected > 0) {
            console.log('성공');
          } else {
            console.log('실패');
          }
        },
      );
    }, []);
  };

  function onRemove(id) {
    console.log(`delete id => ${id}`);

    // DB 처리 (delete)
    db.transaction(function (txn) {
      txn.executeSql(
        'DELETE FROM table_todos WHERE id = ?',
        [id],
        (tx, res) => {
          console.log('res : ', res.rowsAffected);
          if (res.rowsAffected > 0) {
            console.log('삭제 성공');
          } else {
            console.log('삭제 실패');
          }
        },
      );
    });
  }

  const onToggle = (id) => {
    // DB 처리 (update)
    console.log(`toggle처리 할 id : ${id}`);
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT toggle FROM table_todos WHERE id = ?',
        [id],
        function (tx, res) {
          console.log('toggle : ', res.rows.item(0));
          if (res.rows.item(0) === 'false') {
            setToggleItem('true');
            console.log('toggle true');
            console.log(toggleItem);
          } else {
            setToggleItem('false');
            console.log('toggle false');
          }
        },
      );
      txn.executeSql(
        'UPDATE table_todos SET toggle = ? WHERE id = ?',
        [toggleItem, id],
        function (tx, res) {
          console.log('res : ', res.rowsAffected);
          if (res.rowsAffected > 0) {
            console.log('toggle update 성공');
          } else {
            console.log('toggle update 실패');
          }
        },
      );
    });
    listView();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text children="Todo List" style={styles.appTitle} />
        <View style={styles.card}>
          <TodoInsert onAddTodo={addTodo} />
          <TodoList onRemove={onRemove} onToggle={onToggle} />
        </View>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
});

export default App;
