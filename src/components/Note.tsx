import type { TaskProps } from "../types/boardTypes";
import { formatDate } from "../utils/formatDate";
import useNoteHandlers from "../hooks/useNoteHandlers";
import { useDraggable } from "@dnd-kit/react";

const Note = ({
  columnId,
  id,
  title,
  text,
  createdAt,
  updatedAt,
  labels,
  dispatch,
}: TaskProps) => {
  const {
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
  } = useNoteHandlers({
    columnId,
    id,
    title,
    text,
    createdAt,
    updatedAt,
    labels,
    dispatch,
  });

  const { ref } = useDraggable({
    id: "draggable",
  });

  return (
    <div className="flex flex-col p-1 border-2 border-gray-200">
      <h1 className="font-bold">{title}</h1>
      <p>{text}</p>
      <p>
        {createdAt === updatedAt
          ? `Создано: ${formatDate(createdAt)}`
          : `Обновлено: ${formatDate(updatedAt)}`}
      </p>
      <button ref={ref} onClick={handleDelete}>
        Удалить запись
      </button>
      {!isEditing ? (
        <button onClick={(e) => handleEdit(e)}>Редактировать запись</button>
      ) : (
        <form onSubmit={(e) => handleSave(e)} className="flex flex-col">
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Title..."
          />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Text..."
          />
          <button type="submit">Сохранить</button>
          <button onClick={(e) => handleEdit(e)}>Отменить</button>
        </form>
      )}
      {!isMoving ? (
        <button onClick={(e) => handleMoveForm(e)}>Переместить запись</button>
      ) : (
        <form onSubmit={(e) => handleMove(e)} className="flex flex-col">
          <span className="ml-2">Куда</span>
          <select
            value={moveToColumnId}
            onChange={(e) => setColumnId(e.target.value)}
          >
            <option value="column-1">To-do</option>
            <option value="column-2">In Progress</option>
            <option value="column-3">Review</option>
            <option value="column-4">Done</option>
          </select>
          <button type="submit">Переместить</button>
        </form>
      )}
    </div>
  );
};

export default Note;
