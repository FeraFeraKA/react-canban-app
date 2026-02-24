import type { TypeTask } from '../types/boardTypes';
import { formatDate } from '../utils/formatDate';

const Note = ({ id, title, text, createdAt, updatedAt, labels }: TypeTask) => {
  return (
    <div className="flex flex-col p-1 border-2 border-gray-200 w-">
      <h1 className="font-bold">{title}</h1>
      <p>{text}</p>
      <p>
        {createdAt === updatedAt
          ? `Создано: ${formatDate(createdAt)}`
          : `Обновлено: ${formatDate(updatedAt)}`}
      </p>
    </div>
  );
};

export default Note;
