// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'Incomplete',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('AxiosError:', error);
    }
  };

  const createTask = async () => {
    console.log('Creating Task:', newTask); // Log the task data
    try {
      await axios.post('http://localhost:3001/api/tasks', newTask);
      fetchTasks();
      setNewTask({
        title: '',
        description: '',
        status: 'Incomplete',
      });
      console.log('Task created successfully');
    } catch (error) {
      console.error('AxiosError:', error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      await axios.put(`http://localhost:3001/api/tasks/${taskId}`, updatedData);
      fetchTasks();
    } catch (error) {
      console.error('AxiosError:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('AxiosError:', error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Create button at the top right */}
      <button className="create-button" onClick={createTask}>
        Create Task
      </button>

      {/* Buttons for viewing and deleting tasks */}
      <div className="button-container">
        <button onClick={fetchTasks}>View Tasks</button>
        <button onClick={() => deleteTask(tasks[0]?._id)}>Delete First Task</button>
      </div>

      {/* Form to create a new task */}
      <form>
        <label>Title:</label>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <label>Description:</label>
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />

        <button type="button" onClick={createTask}>
          Create Task
        </button>
      </form>

      {/* Table of existing tasks */}
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task._id}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => updateTask(task._id, { status: 'Completed' })}>Mark as Completed</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <div className="menu-icon">
                  <i className="fas fa-ellipsis-v"></i>
                  {/* Add your menu items here */}
                  <div className="menu-items">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
