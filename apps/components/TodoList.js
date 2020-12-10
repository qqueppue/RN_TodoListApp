/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';

import TodoItem from './TodoItem';

var db = openDatabase({name: 'TodoItems.db'});

const TodoList = ({onRemove, onToggle}) => {
    let [todoItems, setTodoItems] = useState([]);

    useEffect(() => {
        db.transaction((txn) => {
            txn.executeSql(
                'SELECT * FROM table_todos',
                [],
                (tx,res) => {
                    console.log('record number : ', res.rows.length);
                    var temp = [];
                    for (var i = 0; i < res.rows.length; ++i) {
                        temp.push(res.rows.item(i));
                    }
                    setTodoItems(temp);
                }
            );
        });
    }, []);

    const TodoListItem = todoItems.map((item, index) =>
        <TodoItem key={index} id={item.id} onRemove={onRemove} onToggle={onToggle} checked={item.toggle} textValue={item.content} />
    );

    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {TodoListItem}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },
});

export default TodoList;
