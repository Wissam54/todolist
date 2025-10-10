import { useParams, Link } from "react-router-dom";
import type { Task } from "../Task";

interface TaskDetailsProps {
  tasks: Task[];
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ tasks }) => {
  // ✅ useParams ne prend plus de type générique direct en React Router v6+
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div>
        <p>Tâche introuvable ❌</p>
        <Link to="/">⬅️ Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Détails de la tâche</h2>
      <p>
        <strong>Contenu :</strong> {task.content}
      </p>
      <p>
        <strong>Statut :</strong> {task.status}
      </p>
      <p>
        <strong>Initiée le :</strong>{" "}
        {task.createdAt.toLocaleDateString("fr-FR")}
      </p>
      {task.completedAt && (
        <p>
          <strong>Terminée le :</strong>{" "}
          {task.completedAt.toLocaleDateString("fr-FR")}
        </p>
      )}
      <Link to="/">⬅️ Retour à la liste</Link>
    </div>
  );
};

export default TaskDetails;
