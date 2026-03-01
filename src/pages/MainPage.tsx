import useNotes from '../hooks/useNotes';
import Column from '../components/Column';
import CreateNote from '../components/CreateNote';
import { DragDropProvider } from '@dnd-kit/react';
import { findColumn } from '../utils/findOldColumn';

const MainPage = () => {
  const { boardState, dispatch } = useNotes();

  const moveTaskByDragIds = (sourceId?: string, targetId?: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;

    const oldColumnId = findColumn(boardState, sourceId);

    if (!oldColumnId) return;

    const isTargetColumn = Boolean(boardState.columns[targetId]);
    const targetTaskColumnId = findColumn(boardState, targetId);
    const newColumnId = isTargetColumn ? targetId : targetTaskColumnId;

    if (!newColumnId) return;

    const targetTaskId = isTargetColumn ? undefined : targetId;

    dispatch({
      type: 'MOVE_TASK',
      payload: {
        oldColumnId,
        newColumnId,
        taskId: sourceId,
        targetTaskId,
      },
    });
  };

  return (
    <>
      <CreateNote dispatch={dispatch} />
      <DragDropProvider
        onDragEnd={(e) => {
          if (e.canceled) return;
          const sourceId = e.operation.source?.id.toString();
          const targetId = e.operation.target?.id.toString();

          moveTaskByDragIds(sourceId, targetId);
        }}
      >
        <div className="flex flex-col mb-4 gap-4 lg:flex-row lg:gap-8">
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
      </DragDropProvider>
    </>
  );
};

export default MainPage;
