import { Injectable, signal, computed } from '@angular/core';
import { TASKS, Task, ColumnId } from '../data/tasks.data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>(TASKS);

  // selector principal
  tasks$ = computed(() => this.tasks());

  // selector por columna
  getByColumn(column: ColumnId) {
    return this.tasks().filter(task => task.column === column);
  }

  // mover tarea (lo usaremos después)
  moveTask(id: number, column: ColumnId) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, column }
          : task
      )
    );
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      description: '',
      column: 'todo' as const
    };

    this.tasks.update(tasks => [newTask, ...tasks]);
  }

  deleteTask(id: number) {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }


}
