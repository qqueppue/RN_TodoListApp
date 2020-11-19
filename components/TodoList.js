/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

import TodoItem from './TodoItem';

const TodoList = () => {
    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            <TodoItem />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },
});

export default TodoList;

