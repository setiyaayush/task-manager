'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const API_URL = 'http://localhost:3001';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching tasks...');
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched tasks:', data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Sending request to add task:', newTask);
      
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(responseText || `HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log('Received response:', data);
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
      setError(error instanceof Error ? error.message : 'Failed to add task. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Toggling task ${id} to ${!completed}`);
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Deleting task ${id}`);
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a specific task by ID
  const fetchTaskById = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch task');
      }
      const task = await response.json();
      console.log('Fetched task:', task);
      return task;
    } catch (error) {
      console.error('Error fetching task:', error);
      setError('Failed to fetch task. Please try again.');
      return null;
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Task Manager</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button 
              onClick={() => fetchTasks()} 
              className="ml-4 text-blue-500 hover:text-blue-700"
            >
              Retry
            </button>
          </div>
        )}
        
        <form onSubmit={addTask} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-2 border rounded text-black placeholder-gray-500"
              disabled={loading}
            />
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>

        {loading && tasks.length === 0 ? (
          <div className="text-center text-black">Loading tasks...</div>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-2 p-4 bg-white rounded shadow"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, task.completed)}
                  className="h-5 w-5"
                  disabled={loading}
                />
                <span className={`flex-1 text-black ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-red-500 hover:bg-red-50 rounded"
                  disabled={loading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
