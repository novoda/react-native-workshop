import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export const Todo = ({ name, completed, onTodoChanged }) => (
    <View style={styles.container}>
        <Text>{name}</Text>
        <Switch
            value={completed}
            onValueChange={completed => onTodoChanged(completed)}
        />
    </View>
);
