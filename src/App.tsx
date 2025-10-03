import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { tasksCollection } from './data'
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskStatus } from "./Task"

function App() {
  // const tasks = tasksCollection ;
  const [tasks, setTasks] = useState<Task[]>(tasksCollection);

  const addNewTask = (content: string) => {
    const newTask: Task = {
      id: uuidv4(),
      content: content,
      status: "todo",
      createAt: new Date()
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

  const statusEmoji = (status: TaskStatus): JSX.Element => {
    switch (status) {
      case "todo":
        return <span>⌛</span>;
      case "doing":
        return <span>🕰️</span>;
      case "done":
        return <span>✅</span>;
      default:
        return <span></span>;
    }
  };

  const doneTask = (id : string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id){
        return {...task, status:"done" as TaskStatus, completedAt:new Date();}
      }else{
        return task;
      }
    })
    setTasks(updatedTasks);
  }
  return (
    <>
      <h1>Todo List</h1>
      <p>Nombre de tâches : {tasks.length}</p>
      <button onClick={handleClick}>Nouvelle tâche</button>
      <ul>
        {tasks.map((task) =>( 
          <li key={task.id}>
            {statusEmoji(task.status)}{task.content}
            <span className ="date">
              Initiée le {task.createAt.toLocaleDateString("fr-FR")}
            </span>
            {task.completedAt && (
              <span className ="date">
                Terminée le {task.completedAt.toLocaleDateString("fr-FR")}
              </span>
            )}
            <p>
              {task.status !== "done" && (
                <button onClick={() => doneTask(task.id)}>Valider</button>
              )}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
