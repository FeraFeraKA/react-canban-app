import type { BoardState } from '../types/boardTypes';

const now = Date.now();

export const initialState: BoardState = {
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To-do',
      tasks: [
        {
          id: 'task-1',
          title: 'Buy AirPods Pro 3',
          text: 'Go to the Apple Store and buy headphones',
          createdAt: now - 100000,
          updatedAt: now - 90000,
          labels: ['purchases'],
        },
        {
          id: 'task-2',
          title: 'Start Kanban Lite',
          text: 'Create base project with React + TS + Tailwind',
          createdAt: now - 80000,
          updatedAt: now - 70000,
          labels: ['project', 'frontend'],
        },
        {
          id: 'task-3',
          title: 'Workout session',
          text: 'Leg day. Focus on squats and Romanian deadlifts.',
          createdAt: now - 60000,
          updatedAt: now - 55000,
          labels: ['fitness'],
        },
      ],
    },

    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-4',
          title: 'Build Column component',
          text: 'Split board into reusable Column component',
          createdAt: now - 50000,
          updatedAt: now - 45000,
          labels: ['react', 'architecture'],
        },
        {
          id: 'task-5',
          title: 'Implement drag & drop',
          text: 'Integrate dnd-kit and test reordering inside one column',
          createdAt: now - 40000,
          updatedAt: now - 35000,
          labels: ['dnd', 'core'],
        },
      ],
    },

    'column-3': {
      id: 'column-3',
      title: 'Review',
      tasks: [
        {
          id: 'task-6',
          title: 'UI polishing',
          text: 'Fix spacing, font hierarchy and visual rhythm',
          createdAt: now - 30000,
          updatedAt: now - 25000,
          labels: ['design'],
        },
      ],
    },

    'column-4': {
      id: 'column-4',
      title: 'Done',
      tasks: [
        {
          id: 'task-7',
          title: 'Setup project',
          text: 'Vite + React + TypeScript + Tailwind configured',
          createdAt: now - 200000,
          updatedAt: now - 180000,
          labels: ['setup'],
        },
      ],
    },
  },
};
