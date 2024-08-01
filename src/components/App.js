import React, { useState, useMemo } from 'react';

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

  // Memoize filtered tasks
  const filteredTasks = useMemo(() => {
    console.log('Filtering tasks'); // To show when useMemo is being used
    return tasks.filter(task => {
      if (filter === 'All') return true;
      return filter === 'Completed' ? task.completed : !task.completed;
    });
  }, [tasks, filter]);

  // Artificially slow down rendering
  const slowDownRendering = () => {
    const end = Date.now() + 1000; // 1 second delay
    while (Date.now() < end) {}
  };

  // Apply delay
  slowDownRendering();

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <button onClick={() => setFilter('All')}>All</button>
      <button onClick={() => setFilter('Active')}>Active</button>
      <button onClick={() => setFilter('Completed')}>Completed</button>
      <button onClick={() => setDarkMode(prev => !prev)}>Toggle Dark Mode</button>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default App;
