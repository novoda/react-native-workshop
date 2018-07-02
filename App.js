import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    const todos = todosData.map(todo => <Text key={todo.name}>{todo.name}</Text>)
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
