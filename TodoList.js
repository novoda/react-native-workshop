import React from "react";
import { FlatList } from "react-native";
import { Todo } from "./Todo";

export const TodoList = ({ todos }) => {
    const extractor = todo => todo.name;
    const renderItem = ({ item }) => <Todo name={item.name} />;
    return (
        <FlatList
            data={todos}
            keyExtractor={extractor}
            renderItem={renderItem}
        />
    );
}
