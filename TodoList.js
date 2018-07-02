import React from "react";
import { FlatList } from "react-native";
import { Todo } from "./Todo";

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
        />
    );
}
