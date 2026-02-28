export type TypeTask = {
  id: string;
  title: string;
  text: string;
  createdAt: number;
  updatedAt: number;
  labels: string[];
};

export type TypeColumn = {
  id: string;
  title: string;
  tasks: TypeTask[];
};

export type BoardState = {
  columnOrder: string[];
  columns: Record<string, TypeColumn>;
};

export type BoardAction =
  | { type: 'CREATE_TASK'; payload: { columnId: string; task: TypeTask } }
  | { type: 'DELETE_TASK'; payload: { columnId: string; taskId: string } }
  | {
      type: 'EDIT_TASK';
      payload: {
        columnId: string;
        taskId: string;
        newTitle: string;
        newText: string;
      };
    }
  | {
      type: 'MOVE_TASK';
      payload: {
        oldColumnId: string;
        newColumnId: string;
        taskId: string;
        targetTaskId?: string;
      };
    };

export type BoardDispatch = React.Dispatch<BoardAction>;

export type BoardDispatchProps = {
  dispatch: BoardDispatch;
};

export type ColumnProps = TypeColumn & {
  dispatch: BoardDispatch;
};

export type TaskProps = TypeTask & {
  columnId: string;
  index: number;
  dispatch: BoardDispatch;
};
