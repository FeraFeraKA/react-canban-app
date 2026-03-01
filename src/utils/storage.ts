import { initialState } from '@/data/mok';
import type { BoardState } from '@/types/boardTypes';

const KEY = 'canban-notes-app';

export const saveStorage = (state: BoardState) => {
  const stringified = JSON.stringify(state);
  localStorage.setItem(KEY, stringified);
};

export const loadStorage = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;

    const parsed = JSON.parse(raw);

    return parsed as BoardState;
  } catch {
    console.error('Failed to load localStorage. Fallback to mok.');
    return initialState;
  }
};
