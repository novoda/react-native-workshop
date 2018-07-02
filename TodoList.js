import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Todo } from "./Todo";

const styles = StyleSheet.create({
    list: {
        padding: 4
    }
})

export const TodoList = ({ todos, onTodoChanged }) => {
    const extractor = todo => todo.name;
    const renderItem = ({ item, index }) => <Todo
        onTodoChanged={completed => onTodoChanged({index, completed})}
        {...item}
    />;
    return (
        <FlatList
            data={todos}
            keyExtractor={extractor}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
}
