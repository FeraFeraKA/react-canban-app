import type { TaskProps } from "../types/boardTypes";
import { formatDate } from "../utils/formatDate";

const Note = ({
  id,
  title,
  text,
  createdAt,
  updatedAt,
  labels,
  dispatch,
}: TaskProps) => {
  return (
    <div className="flex flex-col p-1 border-2 border-gray-200 w-">
      <h1 className="font-bold">{title}</h1>
      <p>{text}</p>
      <p>
        {createdAt === updatedAt
          ? `Создано: ${formatDate(createdAt)}`
          : `Обновлено: ${formatDate(updatedAt)}`}
      </p>
      <button>Удалить запись</button>
      <button>Редактировать запись</button>
    </div>
  );
};

export default Note;
