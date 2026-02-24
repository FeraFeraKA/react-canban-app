import type { BoardDispatchProps } from "../types/boardTypes";
import { useState } from "react";

const CreateNote = ({ dispatch }: BoardDispatchProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [columnId, setColumnId] = useState("column-1");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    dispatch({
      type: "CREATE_TASK",
      payload: {
        columnId,
        task: {
          id: crypto.randomUUID(),
          title,
          text,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          labels: [],
        },
      },
    });
    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 mb-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tilte..."
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text..."
      />
      <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
        <option value="column-1">To-do</option>
        <option value="column-2">In progress</option>
        <option value="column-3">Review</option>
        <option value="column-4">Done</option>
      </select>
      <button type="submit">Добавить заметку</button>
    </form>
  );
};

export default CreateNote;
