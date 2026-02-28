import type { ColumnProps } from '../types/boardTypes';
import Note from './Note';
import { useDroppable } from '@dnd-kit/react';

const Column = ({ id, title, tasks, dispatch }: ColumnProps) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    <>
      <div
        ref={ref}
        className="flex flex-1 border-2 border-gray-200 lg:flex-col"
      >
        <div className="w-10 flex items-center justify-center border-r-2 border-gray-200 lg:w-full lg:h-10 lg:border-r-0 lg:border-b-2">
          <h3 className="rotate-270 font-semibold whitespace-nowrap lg:rotate-0">
            {title}
          </h3>
        </div>

        <div className="flex flex-col flex-1 gap-8 m-3 pb-32 min-w-0">
          {tasks.map((task, index) => (
            <Note
              key={task.id}
              columnId={id}
              id={task.id}
              index={index}
              title={task.title}
              text={task.text}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
              labels={task.labels}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Column;
