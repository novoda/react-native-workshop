import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Todo } from "./Todo";

const todosData = [
  {
    name: "Take the dog out",
  },
  {
    name: "Go to the gym",
  },
  {
    name: "Prepare dinner",
  }
];

export default class App extends React.Component {
  render() {
    const todos = todosData.map(todo => <Todo name={todo.name} key={todo.name} />);
    return (
      <View style={styles.container}>
        {todos}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 18
  },
});
