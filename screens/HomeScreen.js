import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

const HomeScreen = ({ navigation }) => {
  // State variables for managing tasks
  const [tasks, setTasks] = useState([]);
  const [isTaskInputVisible, setIsTaskInputVisible] = useState(false);
  const [enteredTask, setEnteredTask] = useState('');
  const [priority, setPriority] = useState(false);
  const [reminder, setReminder] = useState('');
  const [dueDate, setDueDate] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${day}, ${date} - ${time}`;
  };

  // Function to add a new task to the task list
  const addTaskHandler = () => {
    if (!enteredTask.trim()) {
      Alert.alert('Error', 'Please enter a task before adding.');
      return;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    // Create a new task object with provided details
    const newTask = {
      id: Math.random().toString(),
      title: enteredTask,
      priority: priority,
      reminder: reminder,
      dueDate: dueDate,
      addedDate: formattedDate,
      completed: false,
    };
    setTasks((currentTasks) => [...currentTasks, newTask]); // Update the task list with the new task
    setIsTaskInputVisible(false); // Hide the task input after adding task
    setEnteredTask(''); // Clear enteredTask after adding task
  };

  // Function to toggle the completion status of a task
  const toggleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTaskHandler = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  // Function to toggle priority
  const togglePriorityHandler = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: !task.priority } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: 'white' }]}>TaskMaster</Text>
        <Text style={[styles.dateTime, { color: 'white' }]}>{getCurrentDateTime()}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isTaskInputVisible && (
          <TaskInput
            onAddTask={addTaskHandler}
            onCancel={() => setIsTaskInputVisible(false)}
            enteredTask={enteredTask}
            setEnteredTask={setEnteredTask}
            priority={priority}
            setPriority={setPriority}
            reminder={reminder}
            setReminder={setReminder}
            dueDate={dueDate}
            setDueDate={setDueDate}
          />
        )}
        <TaskList
          tasks={tasks}
          onCompleteTask={toggleCompleteTask}
          onDeleteTask={deleteTaskHandler}
          onTogglePriority={togglePriorityHandler} // Pass the togglePriorityHandler function to the TaskList component
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsTaskInputVisible((prev) => !prev)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.bottomButtons}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F6',
    paddingTop: 50,
  },
  header: {
    position: 'absolute',
    top: 5,
    left: 10,
    right: 10,
    padding: 20,
    backgroundColor: '#51829B',
    zIndex: 1,
    borderRadius: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold', // Add fontWeight for emphasis
    color: 'white', // Add color for customization
    textAlign: 'center', // Align the text to center
  },
  dateTime: {
    fontSize: 18,
    marginBottom: 10,
    color: 'gray', // Add color for customization
    textAlign: 'center', // Align the text to center
  },
  scrollContainer: {
    paddingVertical: 70,
    paddingHorizontal: 20
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FAF8F6', // Semi-transparent white
    paddingVertical: 50,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
  addButton: {
    backgroundColor: '#F6995C',
    borderRadius: 40,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // Adjusted to align with the center
    alignSelf: 'center', // Align horizontally in the center
    zIndex: 1, // Ensure the button is rendered above other elements


  },
});

export default HomeScreen;
