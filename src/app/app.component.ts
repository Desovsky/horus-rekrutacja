import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'junior-frontend-developer-task';

  protected tasks = [
    { id: 0, name: 'Zrobić zakupy spożywcze', status: 'Completed', date: '2025-05-01', description: 'Muszę kupić mleko, mąkę i jajka.' },
    { id: 1, name: 'Opłacić rachunki', status: 'Pending', date: '2025-05-10', description: 'Tylko nie odkładaj tego na inny dzień!' },
    { id: 2, name: 'Urodziny mamy', status: 'Planned', date: '2025-05-15', description: 'Kupić kwiaty i tort.' },
    { id: 3, name: 'Przyjąć kandydata', status: 'Pending', date: '2025-05-25', description: 'Może nie jest idealnie, ale widać, że się starał. ;)' },
  ];
  protected descVisible: Record<number, boolean> = {};

  toggleCompleted(task: any) {
    task.status = task.status === 'Completed' ? 'Planned' : 'Completed';
  }

  toggleDescription(taskId: number) {
    this.descVisible[taskId] = !this.descVisible[taskId];
  }

  toggleTaskStatus(task: any) {
    switch (task.status) {
      case ('Planned'): {
        task.status = 'Pending';
        break;
      }
      case ('Pending'): {
        task.status = 'Completed';
        break;
      }
      case ('Completed'): {
        task.status = 'Planned';
        break;
      }
      default: {
        task.status = 'Planned';
        break;
      }
    }
  }

  getDeadlineDaysLeft(dateString: string): number {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const deadline = new Date(dateString);
    const deadlineMidnight = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
    const milisecondsInDay = 1000*60*60*24;

    const diffInMs = deadlineMidnight.getTime() - todayMidnight.getTime();
    return Math.floor(diffInMs / milisecondsInDay);
  }

  getDeadlineLabel(dateString: string): string {
    const diffDays = this.getDeadlineDaysLeft(dateString);

    if (diffDays < 0) {
      return 'Termin minął';
    } else if (diffDays === 0) {
      return 'Termin dzisiaj';
    } else if (diffDays === 1) {
      return diffDays + ' dzień';
    } else if (diffDays <= 30) {
      return diffDays + ' dni';
    } else {
      const months = Math.floor(diffDays / 30)
      return months + ' mies.';
    }
  }

  getDeadlineClass(dateString: string): string {
    const diffDays = this.getDeadlineDaysLeft(dateString);
    if (diffDays < 0) {
      return 'text-danger';
    } else if (diffDays <= 3) {
      return 'text-warning';
    } else {
      return 'text-muted';
    }
  }

  protected filters = { 
    name: '', 
    date: null, 
    status: '' 
  }

  get filteredTasks() {
    return this.tasks.filter(task => 
    (!this.filters.name || task.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
    (!this.filters.date || new Date(task.date).toDateString() === new Date(this.filters.date).toDateString()) &&
    (!this.filters.status || task.status === this.filters.status)
    );
  }

  showModal = false;
  today = new Date().toISOString().split("T")[0];
  protected newTask = {
    name: '',
    date: this.today,
    description: ''
  }
  addNewTask() {
    if (this.newTask.name.trim() !== '' && this.newTask.date > this.today) {
      this.tasks.push(
        {id: this.tasks.length + 1, name: this.newTask.name.trim(), status: 'Planned', date: this.newTask.date, description: this.newTask.description.trim()}
      )
      this.showModal = false;
      this.newTask = {
        name: '',
        date: this.today,
        description: ''
      }
    }
    else {
      alert('Podano błędne dane. Sprawdź ich poprawność i spróbuj ponownie.');
    }
  }
  get canSubmitTask(): boolean {
    return this.newTask.name.trim() !== '' && this.newTask?.date > this.today;
  }
}
