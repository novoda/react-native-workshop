import React, { Component } from "react";
import { View, Modal, Button, TextInput, SafeAreaView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    nameField: {
        fontSize: 42,
    },
    modal: {
        padding: 4,
        flex: 1
    }
})

class AddTodo extends Component {
    state = {
        displayModal: false
    }

    displayModal = () => {
        this.setState({
            displayModal: true,
            text: ""
        });
    }

    hideModal = () => {
        this.setState({ displayModal: false });
    }

    updateText = text => {
        this.setState({ text });
    }

    saveTodo = () => {
        if (this.state.text.length == 0) return;
        this.props.onTodoSaved(this.state.text)
        this.hideModal();
    }

    render() {
        return (
            <View>
                <Button title="Add a todo" onPress={this.displayModal} />
                <Modal
                    visible={this.state.displayModal}
                    onRequestClose={this.hideModal}
                >
                    <SafeAreaView style={styles.root}>
                        <View style={styles.modal}>
                            <TextInput placeholder="Title" style={styles.nameField} onChangeText={this.updateText} />
                            <Button title="Save" onPress={this.saveTodo} />
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        )
    }
}

export { AddTodo };
