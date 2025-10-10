import { useState, type JSX } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { tasksCollection } from './data'
import type { Task, TaskStatus } from './Task'
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './composants/TaskForm';
import TasksMaster from './composants/TasksMaster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDetails from './composants/TaskDetails.tsx';

function App() {
  //const tasks = tasksCollection;
  const [tasks, setTasks] = useState<Task[]>(tasksCollection);

  const addNewTask = (content: string) => {
    const newTask: Task = {
      id: uuidv4(),
      content: content,
      status: 'todo',
      createdAt: new Date()
    };
    setTasks([newTask, ...tasks]);
  }

  const handleClick = () => {
    const content = prompt("Veuillez saisir le contenu...");

    if (!content || content.trim() === "") {
      alert("Veuillez saisir un contenu");
      return;
    }
    addNewTask(content!);
  }

  const getStatusEmoji = (status: TaskStatus): JSX.Element => {
    switch (status) {
      case "todo":
        return <span>â³</span>;
      case "doing":
        return <span>âŒšï¸</span>;
      case "done":
        return <span>âœ…</span>;
      default:
        return <span></span>;
    }
  };

  const doneTask = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: 'done' as TaskStatus, completedAt: new Date() };
      } else {
        return task;
      }
    })
    setTasks(updatedTasks);
  };
  const deleteTask = (id: string) => {
  // On filtre toutes les tÃ¢ches sauf celle avec l'id correspondant
  const updatedTasks = tasks.filter(task => task.id !== id);
  setTasks(updatedTasks);
};
  return (
    <Router>

    
   <Routes>
      {/* Route principale : liste de toutes les tÃ¢ches */}
      <Route 
        path="/" 
        element={
          <>
            <h1>Todo List</h1>
            <p>Nombre de taches : {tasks.length}</p>
            <TaskForm onadd={addNewTask} />
            <TasksMaster tasks={tasks} onDone={doneTask} onDelete={deleteTask} />
          </>
        }
      />

      {/* Route détails d'une tÃ¢che */}
      <Route path="/tasks/:taskId" element={<TaskDetails tasks={tasks} />} />
    </Routes>
    </Router>
  );
}
export default App
