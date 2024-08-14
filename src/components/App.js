import React, { useState, useMemo } from 'react';
import '../styles/App.css';

const generateTasks = () => {
  const tasks = [];
  for (let i = 1; i <= 50; i++) {
    tasks.push({
      id: i,
      text: `Todo ${i}`,
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

const App = () => {
  const [tasks] = useState(generateTasks());
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  // Memoize filtered tasks
  const displayedTasks = useMemo(() => {
    console.log('Filtering tasks'); // To show when useMemo is being used
    return tasks.filter(task => {
      if (filter === 'All') return true;
      return filter === 'Completed' ? task.completed : !task.completed;
    });
  }, [tasks, filter]);

  // Debug log
  console.log(displayedTasks);

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
