export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string;
  column: ColumnId;
}

export const TASKS: Task[] = [
  {
    id: 1,
    title: 'Configurar proyecto',
    description: 'Crear estructura base del Kanban',
    column: 'todo'
  },
  {
    id: 2,
    title: 'Diseñar columnas',
    description: 'Renderizar layout base',
    column: 'in-progress'
  },
  {
    id: 3,
    title: 'Deploy inicial',
    description: 'Subir versión inicial',
    column: 'done'
  }
];
