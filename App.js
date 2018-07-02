import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TodoList } from './TodoList';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [
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
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoList todos={this.state.todos} />
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
