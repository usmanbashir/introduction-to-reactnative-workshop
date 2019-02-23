import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View, 
  FlatList,
  Button, 
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo';

// Get screen width
const { width } = Dimensions.get('window');

export default class TodoList extends Component {
  state = {
    tasks: [],
    text: ""
  };

  // Update state with the value of the text box
  changeTextHandler = (text) => {
    this.setState({ text: text });
  };

  addTask = () => {
    // Determine if the text box is empty
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        (prevState) => {
          // Read the previous state
          let { tasks, text } = prevState;
          
          // Return new state by combining with new task
          return {
            tasks: tasks.concat({ key: tasks.length.toString(), text: text }),
            text: ""
          };
        }
      );
    }
  };

  deleteTask = (index) => {
    this.setState(
      (prevState) => {
        // Copy the old state into a new variable
        let tasks = prevState.tasks.slice();

        // Remove the deleted item from the tasks array
        tasks.splice(index, 1);

        // Return the updated state
        return { tasks: tasks };
      }
    );
  };


  render() {
    return (
      <LinearGradient style={styles.container} colors={['#DA4453', '#89216B']}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.appTitle}>Todo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            onChangeText={this.changeTextHandler}
            onSubmitEditing={this.addTask}
            value={this.state.text}
            placeholder="Add an item!"
          />

          <FlatList
            style={styles.list}
            data={this.state.tasks}
            renderItem={({ item, index }) =>
              <View>
                <View style={styles.listItemCont}>
                  <Text style={styles.listItem}>
                    {item.text}
                  </Text>
                  <View style={styles.listItemRemoveCont}>
                    <Button title="X" onPress={() => this.deleteTask(index)} />
                  </View>
                </View>
                <View style={styles.hr} />
              </View>}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 30,
    paddingBottom: 10
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300'
  },
  list: {
    width: "100%"
  },
  listItem: {
    padding: 12,
    fontSize: 18,
    color: '#666666',
  },
  hr: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginLeft: 12,
    marginRight: 12,
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItemRemoveCont: {
    marginRight: 12
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
  }
});