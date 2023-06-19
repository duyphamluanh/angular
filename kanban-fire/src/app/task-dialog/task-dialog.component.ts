import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };
  // title = new FormControl('', [Validators.required]);
  // description = new FormControl('', [Validators.required]);

  todoForm: FormGroup = new FormGroup({
    title : new FormControl(this.data.task.title, [Validators.required]),
    description : new FormControl(this.data.task.description, [Validators.required]),
    date : new FormControl(this.data.task.date?.toDate())
  });

  get title(): any {
    return this.todoForm.get('title');
  }

  get description(): any {
    return this.todoForm.get('description');
  }

  get date(): any {
    return this.todoForm.get('date');
  }

  get task(): any {
    return {
      'title': this.title.value,
      'description': this.description.value,
      'date': this.date.value
    };
  }

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.date = this.backupTask.date;
    this.dialogRef.close(this.data);
  }

  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a title';
    }
    if (this.description.hasError('required')) {
      return 'You must enter a description';
    }
    return '';
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
