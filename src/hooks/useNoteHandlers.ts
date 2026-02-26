import { useState, useEffect } from "react";
import type { TaskProps } from "../types/boardTypes";

const useNoteHandlers = ({
  columnId,
  id,
  title,
  text,
  createdAt,
  updatedAt,
  labels,
  dispatch,
}: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [isMoving, setIsMoving] = useState(false);
  const [moveToColumnId, setColumnId] = useState("column-1");

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
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

  const handleSave = (e: React.SubmitEvent) => {
    e.preventDefault();

    dispatch({
      type: "EDIT_TASK",
      payload: {
        columnId,
        taskId: id,
        newTitle: inputTitle,
        newText: inputText,
      },
    });

    setIsEditing((prev) => !prev);
  };

  const handleMoveForm = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsMoving((prev) => !prev);
  };

  const handleMove = (e: React.SubmitEvent) => {
    e.preventDefault();

    dispatch({
      type: "MOVE_TASK",
      payload: {
        oldColumnId: columnId,
        newColumnId: moveToColumnId,
        taskId: id,
      },
    });

    setIsMoving((prev) => !prev);
  };

  return {
    handleDelete,
    isEditing,
    handleEdit,
    handleSave,
    setInputTitle,
    setInputText,
    isMoving,
    handleMoveForm,
    handleMove,
    setColumnId,
    inputTitle,
    inputText,
    moveToColumnId,
  };
};

export default useNoteHandlers;
