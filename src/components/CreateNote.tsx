import type { BoardDispatchProps } from '../types/boardTypes';
import { useState } from 'react';

const CreateNote = ({ dispatch }: BoardDispatchProps) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [columnId, setColumnId] = useState('column-1');
  const [errors, setErrors] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors('');

    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (trimmedTitle.length === 0 || trimmedText.length === 0) {
      setErrors('Task text cannot be empty');
      return;
    }
    dispatch({
      type: 'CREATE_TASK',
      payload: {
        columnId,
        task: {
          id: crypto.randomUUID(),
          title: trimmedTitle,
          text: trimmedText,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          labels: [],
        },
      },
    });
    setTitle('');
    setText('');
  };

  return (
    <>
      <h3 className="text-center mb-4">{errors}</h3>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 mb-3 lg:flex-row lg:justify-center lg:items-center lg:gap-8"
      >
        <input
          className="flex-1 p-2 border-2 border-cyan-200 rounded-sm"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tilte..."
        />
        <input
          className="flex-1 p-2 border-2 border-cyan-200 rounded-sm"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text..."
        />
        <select
          className="flex-1 appearance-none p-2 border-2 border-cyan-200 rounded-sm"
          value={columnId}
          onChange={(e) => setColumnId(e.target.value)}
        >
          <option value="column-1">To-do</option>
          <option value="column-2">In progress</option>
          <option value="column-3">Review</option>
          <option value="column-4">Done</option>
        </select>
        <button
          className="flex-1 p-2 border-2 border-cyan-200 rounded-sm"
          type="submit"
        >
          Добавить заметку
        </button>
      </form>
    </>
  );
};

export default CreateNote;
