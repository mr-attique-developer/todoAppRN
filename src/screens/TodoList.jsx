import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TodoItems from './TodoItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Doctor Appointment'},
    {id: 2, text: 'Meeting at School'},
  ]);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTodosFromLocalStorage();
  }, []);

  const saveTodosInLocalStorage = async todo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todo));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  const loadTodosFromLocalStorage = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos');
      if (getTodos) {
        setTasks(JSON.parse(getTodos));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };
  const handleTask = () => {
    if (!text) {
      Alert.alert('Task is  required');
      return;
    }
    const newTodo = [...tasks, {id: tasks.length + 1, text}];
    setTasks(newTodo);
    saveTodosInLocalStorage(newTodo);
    setText('');
  };
  const handleDelete = id => {
    const deletedTask = tasks.filter(task => task.id !== id);
    setTasks(deletedTask);
    saveTodosInLocalStorage(deletedTask);

    Alert.alert('Task Deleted');
  };

  const handleEdit = id => {
    setUpdate(true);
    let task = tasks.find(task => task.id === id);
    setEditId(id);
    setText(task.text);
  };
  const updateTask = id => {
    setTasks(tasks.map(task => (task.id === id ? {id, text} : task)));
    setText('');
    setUpdate(false);
    setEditId(null);
  };

  const handleChecked = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, checked: !task.checked} : task,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Task's</Text>
      <View
        style={[
          styles.taskContainer,
          tasks.length === 0
            ? {justifyContent: 'center', alignItems: 'center', minHeight: '70%' }
            : null,
        ]}>
        {tasks.length === 0 ? (
          <Text style={{fontSize: 40, color: 'blue'}}>No Task's</Text>
        ) : (
          tasks.map(task => (
            <View key={task.id}>
              <TodoItems
                task={task}
                checked={checked}
                handleChecked={handleChecked}
                deleteItem={handleDelete}
                editItem={handleEdit}
              />
            </View>
          ))
        )}
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Add New Item..."
          placeholderTextColor={"black"}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Pressable
          style={styles.inputButton}
          onPress={update ? () => updateTask(editId) : handleTask}>
          <Text style={styles.btnText}>{update ? 'Update' : 'Add'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#dadada',
    padding: '6%',
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
  },
  taskContainer: {
    backgroundColor:"#22A7F0",
    padding: 10,
    minHeight:"70%",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },

  input: {
    position: 'absolute',
    right: 20,
    left: 20,
    bottom: 30,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    width: 80,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    flexWeight: 'bold',
    textAlign: 'center',
  },
});
