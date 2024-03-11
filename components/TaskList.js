// TaskList.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskList = ({ tasks, onCompleteTask, onDeleteTask }) => {
  // Check if tasks is empty
  if (!tasks || tasks.length === 0) {
    return (
      <View style={styles.noTasksContainer}>
        <Text style={styles.noTasksText}>No tasks to display</Text>
      </View>
    );
  }

  return (
    <View>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <TouchableOpacity onPress={() => onCompleteTask(task.id)}>
            {task.completed ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.taskDetails}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            {task.dueDate && ( // Check if dueDate exists
              <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
            )}
            <Text style={styles.addedDate}>Added: {task.addedDate}</Text>
            {task.reminder && <Text style={styles.reminder}>Reminder: {task.reminder}</Text>}
          </View>
          {task.priority && (
            <Ionicons name="star" size={24} color="orange" style={styles.priorityIcon} />
          )}
          <TouchableOpacity onPress={() => onDeleteTask(task.id)}>
            <Ionicons name="trash-bin-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 18,
  },
  addedDate: {
    fontSize: 14,
    color: 'gray',
  },
  reminder: {
    fontSize: 14,
    color: 'gray',
  },
  priorityIcon: {
    marginRight: 50,
  },
  noTasksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  noTasksText: {
    fontSize: 18,
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default TaskList;
