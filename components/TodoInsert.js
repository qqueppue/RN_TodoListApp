/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

const TodoInsert = ({onAddTodo}) => {
  const [newTodoItem, setNewTodoItem] = useState('');

  const handleTodoInput = (newTodo) => {
    setNewTodoItem(newTodo);
  };

  const handleAddTodo = () => {
    if (newTodoItem === '') {
      return;
    } else {
      console.log(`newTodoItem => ${newTodoItem}`);
      //alert('newTodoItem = '+ newTodoItem);
      onAddTodo(newTodoItem);
      setNewTodoItem(''); // 사용한 함수는 다시 빈값으로 처리
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={'할일을 입력하세요!'}
        autoCorrect={true}
        value={newTodoItem}
        onChangeText={handleTodoInput}
      />
      <View style={styles.button}>
        <Button
          title={'ADD'}
          color="#00b3b3"
          onPress={handleAddTodo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    padding: 15,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    fontSize: 24,
    margin: 15,
    width: '75%',
  },
  button: {
    marginRight: 10,
  },
});

export default TodoInsert;
