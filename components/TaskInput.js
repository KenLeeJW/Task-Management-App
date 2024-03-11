// TaskInput.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';

const TaskInput = ({
  onAddTask,
  enteredTask,
  setEnteredTask,
  priority,
  setPriority,
  reminder,
  setReminder,
  dueDate, // Include dueDate in props
  setDueDate,
}) => {
  // Function to handle task input
  const taskInputHandler = (enteredText) => {
    setEnteredTask(enteredText);
  };
// Function to handle reminder input
  const reminderInputHandler = (enteredReminder) => {
    setReminder(enteredReminder);
  };
 // Function to handle due date input
  const dueDateInputHandler = (enteredDueDate) => {
    setDueDate(enteredDueDate);
  };
// Function to add a new task
  const addTaskHandler = () => {
    const newTask = {
      id: Math.random().toString(),
      title: enteredTask,
      priority: priority,
      reminder: reminder,
      dueDate: dueDate,
      completed: false,
    };
    onAddTask(newTask);
    setEnteredTask('');
    setReminder('');
    setPriority(false);
    setDueDate('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add Task..."
        style={styles.input}
        onChangeText={taskInputHandler}
        value={enteredTask}
      />
      <TextInput
        placeholder="Reminder..."
        style={styles.input}
        onChangeText={reminderInputHandler}
        value={reminder}
      />
      <TextInput
        placeholder="Due Date"
        style={styles.input}
        onChangeText={dueDateInputHandler}
        value={dueDate} // Bind value to dueDate
      />
      <View style={styles.priorityContainer}>
        <Text style={styles.priorityText}>Priority</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={priority ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setPriority((prevState) => !prevState)}
          value={priority}
        />
      </View>
      <Button title="Add" onPress={addTaskHandler} disabled={!enteredTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priorityText: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default TaskInput;
