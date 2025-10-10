import { useState, type JSX } from "react";

type TaskFormProps = {
  onadd: (content: string) => void;
};

export default function TaskForm({ onadd }: TaskFormProps): JSX.Element {
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!content || content.trim() === "") {
      alert("Veuillez saisir un contenu");
      return;
    }

    onadd(content);
    setContent(""); // réinitialise le champ
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
