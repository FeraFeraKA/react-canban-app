import useNotes from "../hooks/useNotes";
import Column from "../components/Column";
import CreateNote from "../components/CreateNote";

const MainPage = () => {
  const { boardState, dispatch } = useNotes();

  return (
    <>
      <CreateNote dispatch={dispatch} />
      <div className="flex flex-col gap-2 lg:flex-row">
        {boardState.columnOrder.map((columnId) => {
          const column = boardState.columns[columnId];

          return (
            <Column
              key={columnId}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              dispatch={dispatch}
            />
          );
        })}
      </div>
    </>
  );
};

export default MainPage;
