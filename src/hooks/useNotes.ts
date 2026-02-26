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
          if (task.id === taskId)
            return { ...task, title: newTitle, text: newText, updatedAt: Date.now() };
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
        const { oldColumnId, newColumnId, taskId } = action.payload;
        const removeColumn = state.columns[oldColumnId];
        const addColumn = state.columns[newColumnId];

        if (removeColumn === addColumn) return state;

        const targetTask = removeColumn.tasks.find(
          (task) => task.id === taskId,
        );

        if (!targetTask) return state;

        return {
          ...state,
          columns: {
            ...state.columns,
            [oldColumnId]: {
              ...removeColumn,
              tasks: removeColumn.tasks.filter((task) => task.id !== taskId),
            },
            [newColumnId]: {
              ...addColumn,
              tasks: [...addColumn.tasks, targetTask],
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
