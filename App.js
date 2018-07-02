import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TodoList } from './TodoList';

const todos = [
  {
    name: "Take the dog out",
    completed: false,
  },
  {
    name: "Go to the gym",
    completed: true,
  },
  {
    name: "Prepare dinner",
    completed: false
  }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TodoList todos={todos} />
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
