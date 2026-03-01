import useNotes from '../hooks/useNotes';
import Column from '../components/Column';
import CreateNote from '../components/CreateNote';
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { isSortable } from '@dnd-kit/react/sortable';

type DragEventPayload =
  | Parameters<DragOverEvent>[0]
  | Parameters<DragEndEvent>[0];

const MainPage = () => {
  const { boardState, dispatch } = useNotes();

  const applyDragMove = (event: DragEventPayload) => {
    const taskGroups = Object.fromEntries(
      boardState.columnOrder.map((columnId) => [
        columnId,
        boardState.columns[columnId].tasks,
      ]),
    );

    const nextTaskGroups = move(taskGroups, event);

    if (nextTaskGroups === taskGroups) return;

    dispatch({
      type: 'LOAD_TASKS',
      payload: {
        newState: {
          ...boardState,
          columns: Object.fromEntries(
            boardState.columnOrder.map((columnId) => [
              columnId,
              {
                ...boardState.columns[columnId],
                tasks:
                  nextTaskGroups[columnId] ??
                  boardState.columns[columnId].tasks,
              },
            ]),
          ),
        },
      },
    });
  };

  const shouldApplyDragOver = (event: Parameters<DragOverEvent>[0]) => {
    const { source, target } = event.operation;

    if (!source || !target || !isSortable(source)) return false;

    if (isSortable(target)) {
      return source.group === target.group;
    }

    return source.group?.toString() === target.id.toString();
  };

  return (
    <>
      <CreateNote dispatch={dispatch} />
      <DragDropProvider
        onDragOver={(event) => {
          if (!shouldApplyDragOver(event)) return;

          applyDragMove(event);
        }}
        onDragEnd={(e) => {
          if (e.canceled) return;
          applyDragMove(e);
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
