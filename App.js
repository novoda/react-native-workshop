import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
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

  onTodoChanged = ({ completed, index }) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.map((todo, i) => index === i ? { ...todo, completed } : todo)
      }
    }, () => {
      AsyncStorage.setItem('todos', JSON.stringify(this.state.todos))
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TodoList todos={this.state.todos} onTodoChanged={this.onTodoChanged} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
