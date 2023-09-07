import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    id: 'int',
    title: 'string',
    completed: 'bool',
  },
};

const Demo1 = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('');
  const [tasks, setTasks] = useState([]);

  const realm = new Realm({ schema: [TaskSchema] });

  const addTask = () => {
    realm.write(() => {
      realm.create('Task', { id: parseInt(id), title, completed });
    });

    setId('');
    setTitle('');
    setCompleted(false);
    console.log("realm.objects('Task')",realm.objects('Task'));
    setTasks([...realm.objects('Task')]);
  };

  const updateTask = () => {
    const taskToUpdate = realm.objects('Task').filtered(`id = ${parseInt(id)}`)[0];
    console.log("taskToUpdate",taskToUpdate);

    if (taskToUpdate) {
      realm.write(() => {
        taskToUpdate.title = title;
        taskToUpdate.completed = completed;
      });

      setId('');
      setTitle('');
      setCompleted(false);
      
      setTasks([...realm.objects('Task')]);
    }
  };

 
  const deleteTask = () => {
    const taskToDelete = realm.objects('Task').filtered(`id = ${parseInt(id)}`)[0];
    if (taskToDelete) {
      realm.write(() => {
        realm.delete(taskToDelete);
      });
      
      setId('');
      setTitle('');
      setCompleted(false);
     
      setTasks([...realm.objects('Task')]);
    }
  };

  const readTasks = () => {
    setTasks([...realm.objects('Task')]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>RealmDemo</Text>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={(text) => setId(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Completed (true/false)"
        value={completed}
        onChangeText={(text) => setCompleted(text.toLowerCase() === 'true')}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={updateTask}>
        <Text>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteTask}>
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={readTasks}>
        <Text>Read</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Task List:</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>ID: {item.id}, Title: {item.title}, Completed: {item.completed.toString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Demo1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
