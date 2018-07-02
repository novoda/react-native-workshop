import React from 'react';
import { StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';

export default class App extends React.Component {

  state = {
    todos: []
  }

  componentDidMount() {
    AsyncStorage.getItem('todos').then(todosJson => {
      if (todosJson) {
        this.setState({ todos: JSON.parse(todosJson) })
      }
    })
  }

  syncTodos = () => {
    AsyncStorage.setItem('todos', JSON.stringify(this.state.todos))

  }

  onTodoChanged = ({ completed, index }) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.map((todo, i) => index === i ? { ...todo, completed } : todo)
      }
    }, this.syncTodos);
  }

  onTodoSaved = (name) => {
    this.setState(({ todos }) => {
      return {
        todos: [...todos, { name, completed: false }]
      }
    }, this.syncTodos)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TodoList style={styles.todos} todos={this.state.todos} onTodoChanged={this.onTodoChanged} />
        <AddTodo onTodoSaved={this.onTodoSaved} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  todos: {
    flex: 1
  }
});
