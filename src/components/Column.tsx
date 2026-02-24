import type { ColumnProps } from "../types/boardTypes";
import Note from "./Note";

const Column = ({ id, title, tasks, dispatch }: ColumnProps) => {
  return (
    <>
      <div className="flex border-2 border-gray-200">
        <div className="w-10 min-h-60 flex items-center justify-center border-r-2 border-gray-200">
          <h3 className="rotate-270 font-semibold whitespace-nowrap">
            {title}
          </h3>
        </div>

        <div className="flex flex-col gap-2 m-3">
          {tasks.map((task) => (
            <Note
              key={task.id}
              id={task.id}
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
