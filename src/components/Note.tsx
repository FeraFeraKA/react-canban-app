import type { TaskProps } from '../types/boardTypes';
import { formatDate } from '../utils/formatDate';
import useNoteHandlers from '../hooks/useNoteHandlers';
import { useSortable } from '@dnd-kit/react/sortable';

import { useCopy } from '@/hooks/useCopy';
import Editing from './Editing';
import Buttons from './Buttons';

const Note = ({
  columnId,
  id,
  index,
  title,
  text,
  createdAt,
  updatedAt,
  dispatch,
}: TaskProps) => {
  const {
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
  } = useNoteHandlers({
    columnId,
    id,
    title,
    text,
    dispatch,
  });

  const { copy, isCopied } = useCopy();

  const { ref } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: columnId,
    plugins: [],
  });

  return (
    <div
      ref={ref}
      className="touch-none group relative flex flex-col items-center gap-1 p-2 border-2 border-gray-200 transition-all duration-200 lg:items-baseline"
    >
      <Editing
        isEditing={isEditing}
        title={title}
        text={text}
        handleSave={handleSave}
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
        refTextArea={refTextArea}
        inputText={inputText}
        setInputText={setInputText}
        errors={errors}
      />
      <p className="pb-12 lg:pb-0">
        {createdAt === updatedAt
          ? `Создано: ${formatDate(createdAt)}`
          : `Обновлено: ${formatDate(updatedAt)}`}
      </p>
      <Buttons
        handleEdit={handleEdit}
        copy={copy}
        title={title}
        text={text}
        isCopied={isCopied}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Note;
