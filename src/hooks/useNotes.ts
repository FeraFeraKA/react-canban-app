import { useEffect, useReducer } from 'react';
import { loadStorage, saveStorage } from '@/utils/storage';
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

      case 'LOAD_TASKS':
        return action.payload.newState;

      default:
        return state;
    }
  };

  const [boardState, dispatch] = useReducer(changeState, null, loadStorage);

  useEffect(() => {
    saveStorage(boardState);
  }, [boardState]);

  return { boardState, dispatch };
};

export default useNotes;
