import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [DatePipe]
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();

  constructor(public datepipe: DatePipe) {
  }

  get taskdate(){
    return this.datepipe.transform(this.task?.date?.toDate()?.toLocaleDateString(), 'yyyy-MM-dd');
  }
}
