/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';

const TodoInsert = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder={'할일을 입력하세요!'} autoCorrect={true} />
      <View style={styles.button}>
        <Button title={'ADD'} />
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
