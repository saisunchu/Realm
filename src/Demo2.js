import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    id: 'int',
    title: 'string',
    completed: 'bool',
  },
};

const Demo2 = () => {
  const [tasks, setTasks] = useState([]);
  const realm = new Realm({ schema: [TaskSchema] });

  // Function to clear all tasks in Realm
  const clearAllTasks = () => {
    realm.write(() => {
      const allTasks = realm.objects('Task');
      realm.delete(allTasks);
    });
  };

  const fetchApi1Data = async () => {
    try {
      // Clear all previously stored tasks
      clearAllTasks();

      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();

      realm.write(() => {
        data.forEach(task => {
         
            realm.create('Task', {
              id: task.id,
              title: task.title,
              completed: task.completed,
            });
          })
      });

      const realmTasks = realm.objects('Task');
      setTasks([...realmTasks]);
    } catch (error) {
      console.error('Error fetching and storing tasks from API 1:', error);
    }
  };

  const fetchApi2Data = async () => {
    try {
      // Clear all previously stored tasks
      clearAllTasks();

      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();

      realm.write(() => {
        data.forEach(task => {
          const realmTask = realm.objects('Task').filtered('id == ' + task.id)[0];
          if (!realmTask) {
            realm.create('Task', {
              id: task.id,
              title: task.title,
              completed: false,
            });
          }
        });
      });

      const realmTasks = realm.objects('Task');
      setTasks([...realmTasks]);
    } catch (error) {
      console.error('Error fetching and storing tasks from API 2:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>RealmDemo</Text>
      
      <TouchableOpacity style={styles.button} onPress={fetchApi1Data}>
        <Text style={styles.buttonText}>Fetch Data from API 1</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={fetchApi2Data}>
        <Text style={styles.buttonText}>Fetch Data from API 2</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Task List (from Realm):</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id}>
            <Text>
              ID: {item.id}, Title: {item.title}, Completed: {item.completed.toString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Demo2;

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
