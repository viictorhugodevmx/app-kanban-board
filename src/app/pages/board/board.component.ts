import { Component, inject } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ColumnId } from '../../data/tasks.data';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  private tasksService = inject(TasksService);

  columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'Todo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  getTasks(column: ColumnId) {
    return this.tasksService.getByColumn(column);
  }

  move(taskId: number, direction: 'left' | 'right', currentColumn: ColumnId) {
    const order: ColumnId[] = ['todo', 'in-progress', 'done'];
    const currentIndex = order.indexOf(currentColumn);

    if (direction === 'left' && currentIndex > 0) {
      this.tasksService.moveTask(taskId, order[currentIndex - 1]);
    }

    if (direction === 'right' && currentIndex < order.length - 1) {
      this.tasksService.moveTask(taskId, order[currentIndex + 1]);
    }
  }

  newTaskTitle = '';

  createTask() {
    if (!this.newTaskTitle.trim()) return;

    this.tasksService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }

  delete(taskId: number) {
    const ok = confirm('¿Eliminar esta tarea?');
    if (ok) {
      this.tasksService.deleteTask(taskId);
    }
  }


}
