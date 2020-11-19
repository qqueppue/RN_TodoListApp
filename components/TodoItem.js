/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TodoItem = () => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity>
                <View style={styles.circle}>
                    <Icon name="circledowno" size={30} color="blue" />
                </View>
            </TouchableOpacity>
            <Text children="더미 할 일 목록" style={styles.itemText} />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        borderBottomColor: '#9e9e9e',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        marginLeft: 20,
        marginRight: 20,
    },
    itemText: {
        fontSize: 20,
        marginVertical: 15,
        flex: 1,
    },
});

export default TodoItem;

