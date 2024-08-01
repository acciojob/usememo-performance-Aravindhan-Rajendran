import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

// Utility function to generate tasks
const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      text: `Task ${i}`,
      completed: i <= 25 // First 25 tasks are completed, others are active
    });
  }
  return tasks;
};

// Task Component
const Task = ({ task }) => {
  return (
    <li className={`task ${task.completed ? 'completed' : 'active'}`}>
      {task.text}
    </li>
  );
};

// App Component
const App = () => {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState([]);

  // Memoize filtered tasks
  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks'); // To show when useMemo is being used
    return tasks.filter(task => {
      if (filter === 'All') return true;
      return filter === 'Completed' ? task.completed : !task.completed;
    });
  }, [tasks, filter]);

  // Artificially slow down rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedTasks(filteredTasks);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [filteredTasks]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <button onClick={() => setFilter('All')}>All</button>
      <button onClick={() => setFilter('Active')}>Active</button>
      <button onClick={() => setFilter('Completed')}>Completed</button>
      <button onClick={() => setDarkMode(prev => !prev)}>Toggle Dark Mode</button>

      <ul className="task-list">
        {displayedTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default App;
