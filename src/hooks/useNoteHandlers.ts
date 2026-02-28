import { useState, useLayoutEffect, useRef } from 'react';
import type { BoardDispatch } from '../types/boardTypes';

type UseNoteHandlersParams = {
  columnId: string;
  id: string;
  title: string;
  text: string;
  dispatch: BoardDispatch;
};

const useNoteHandlers = ({
  columnId,
  id,
  title,
  text,
  dispatch,
}: UseNoteHandlersParams) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [errors, setErrors] = useState('');

  const refTextArea = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (!isEditing) return;
    const el = refTextArea.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    });
  }, [isEditing, inputText]);

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        columnId,
        taskId: id,
      },
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();

    setInputTitle(title);
    setInputText(text);
    setIsEditing((prev) => !prev);
  };

  const handleSave = (e: React.SubmitEvent | React.FocusEvent) => {
    e.preventDefault();
    setErrors('');

    const trimmedTitle = inputTitle.trim();
    const trimmedText = inputText.trim();

    if (trimmedTitle.length === 0 || trimmedText.length === 0) {
      setErrors('Task text cannot be empty. Please enter task text to save.');
      return;
    }

    dispatch({
      type: 'EDIT_TASK',
      payload: {
        columnId,
        taskId: id,
        newTitle: inputTitle,
        newText: inputText,
      },
    });

    setIsEditing((prev) => !prev);
  };

  return {
    handleDelete,
    isEditing,
    handleEdit,
    handleSave,
    setInputTitle,
    setInputText,
    inputTitle,
    inputText,
    refTextArea,
    errors,
  };
};

export default useNoteHandlers;
