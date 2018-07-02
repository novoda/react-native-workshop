import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TodoList } from './TodoList';

const todos = [
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
