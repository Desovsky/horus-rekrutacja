import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'junior-frontend-developer-task';

  protected tasks = [
    { id: 1, name: 'Zrobić zakupy spożywcze', status: 'Completed', date: '2025-05-01', description: 'Muszę kupić mleko, mąkę i jajka.' },
    { id: 2, name: 'Opłacić rachunki', status: 'Pending', date: '2025-05-10', description: 'Tylko nie odkładaj tego na inny dzień!' },
    { id: 3, name: 'Urodziny mamy', status: 'Planned', date: '2025-05-15', description: 'Kupić kwiaty i tort.' }
  ];
  protected descVisible: Record<number, boolean> = {};

  toggleCompleted(task: any) {
    task.status = task.status === 'Completed' ? 'Planned' : 'Completed';
  }

  toggleDescription(taskId: number) {
    this.descVisible[taskId] = !this.descVisible[taskId];
  }
}
