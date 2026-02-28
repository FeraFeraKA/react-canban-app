import type { BoardState } from '../types/boardTypes';

export const findColumn = (boardState: BoardState, taskId: string) => {
  const columns = boardState.columns;
  const oldColumnId = Object.keys(columns).find((columnId) =>
    columns[columnId].tasks.find((task) => task.id === taskId),
  );
  return oldColumnId;
};
