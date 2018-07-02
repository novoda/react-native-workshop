import React from 'react';
import { StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { TodoList } from './TodoList';

const defaultTodos = [
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

  constructor(props) {
    super(props);
    this.state = { todos: defaultTodos };
  }

  componentDidMount() {
    AsyncStorage.getItem('todos').then(todosJson => {
      if (todosJson) {
        this.setState({ todos: JSON.parse(todosJson) })
      }
    })
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
