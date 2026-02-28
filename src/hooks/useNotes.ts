import { useReducer } from 'react';
import { initialState } from '../data/mok';
import type { BoardState, BoardAction } from '../types/boardTypes';

const useNotes = () => {
  const changeState = (state: BoardState, action: BoardAction): BoardState => {
    switch (action.type) {
      case 'CREATE_TASK': {
        const { columnId, task } = action.payload;
        const targetColumn = state.columns[columnId];

        return {
          ...state,
          columns: {
            ...state.columns,
            [columnId]: {
              ...targetColumn,
              tasks: [...targetColumn.tasks, task],
            },
          },
        };
      }

      case 'DELETE_TASK': {
        const { columnId, taskId } = action.payload;
        const targetColumn = state.columns[columnId];

        return {
          ...state,
          columns: {
            ...state.columns,
            [columnId]: {
              ...targetColumn,
              tasks: targetColumn.tasks.filter((task) => task.id !== taskId),
            },
          },
        };
      }

      case 'EDIT_TASK': {
        const { columnId, taskId, newTitle, newText } = action.payload;
        const targetColumn = state.columns[columnId];

        const updatedTasks = targetColumn.tasks.map((task) => {
          if (task.id === taskId) {
            let updatedAt = task.updatedAt;
            if (task.title !== newTitle || task.text !== newText)
              updatedAt = Date.now();

            return {
              ...task,
              title: newTitle,
              text: newText,
              updatedAt,
            };
          }
          return task;
        });

        return {
          ...state,
          columns: {
            ...state.columns,
            [columnId]: {
              ...targetColumn,
              tasks: updatedTasks,
            },
          },
        };
      }

      case 'MOVE_TASK': {
        const { oldColumnId, newColumnId, taskId, targetTaskId } =
          action.payload;
        const sourceColumn = state.columns[oldColumnId];
        const destinationColumn = state.columns[newColumnId];
        if (!sourceColumn || !destinationColumn) return state;

        const sourceIndex = sourceColumn.tasks.findIndex(
          (task) => task.id === taskId,
        );
        if (sourceIndex === -1) return state;
        const movingTask = sourceColumn.tasks[sourceIndex];

        if (oldColumnId === newColumnId) {
          const reorderedTasks = [...sourceColumn.tasks];
          reorderedTasks.splice(sourceIndex, 1);

          let insertIndex = reorderedTasks.length;
          if (targetTaskId) {
            const targetIndex = reorderedTasks.findIndex(
              (task) => task.id === targetTaskId,
            );
            if (targetIndex !== -1) insertIndex = targetIndex;
          }

          reorderedTasks.splice(insertIndex, 0, movingTask);
          const hasChanged = reorderedTasks.some(
            (task, index) => task.id !== sourceColumn.tasks[index]?.id,
          );
          if (!hasChanged) return state;

          return {
            ...state,
            columns: {
              ...state.columns,
              [oldColumnId]: {
                ...sourceColumn,
                tasks: reorderedTasks,
              },
            },
          };
        }

        const sourceTasks = sourceColumn.tasks.filter(
          (task) => task.id !== taskId,
        );
        const destinationTasks = [...destinationColumn.tasks];
        let insertIndex = destinationTasks.length;
        if (targetTaskId) {
          const targetIndex = destinationTasks.findIndex(
            (task) => task.id === targetTaskId,
          );
          if (targetIndex !== -1) insertIndex = targetIndex;
        }
        destinationTasks.splice(insertIndex, 0, movingTask);

        return {
          ...state,
          columns: {
            ...state.columns,
            [oldColumnId]: {
              ...sourceColumn,
              tasks: sourceTasks,
            },
            [newColumnId]: {
              ...destinationColumn,
              tasks: destinationTasks,
            },
          },
        };
      }

      default:
        return state;
    }
  };

  const [boardState, dispatch] = useReducer(changeState, initialState);

  return { boardState, dispatch };
};

export default useNotes;
