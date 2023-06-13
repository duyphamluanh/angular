import { Component, EventEmitter, Input, Output} from '@angular/core';
import { TodoItem } from '../todo-list/todo-item';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent {
  @Input() item!: TodoItem;
  @Output() pinned = new EventEmitter<TodoItem>();
  @Output() deleted = new EventEmitter<TodoItem>();

  constructor(){
  }

  pin() {
    if(this.item.pinned == undefined) {
      this.item.pinned = false;
    }
    this.item.pinned = !this.item.pinned;
    this.pinned.emit(this.item);
  }

  delete() {
    this.deleted.emit(this.item);
  }
}
