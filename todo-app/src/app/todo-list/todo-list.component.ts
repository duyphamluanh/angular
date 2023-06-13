import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TodoItem } from './todo-item';
import { NgForm } from '@angular/forms';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  description_input: number = 5;


  @ViewChild('todoForm') todoForm!: NgForm;
  todoList: TodoItem[] = [
    { id: 1, name: 'Sample', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', completed: true},
    { id: 2, name: 'Tomorrow 13/6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', completed: true}
  ];
  newItem: TodoItem = { id: 0, name: '', description: '', completed: false };
  
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig) {
    
  }

  ngOnInit() {
    if (this.config?.descriptionTextarea_row) {
      this.description_input = this.config.descriptionTextarea_row;
    }
    
  }

  addItem() {
    if (this.todoForm.valid) {
      this.newItem.id = this.todoList.length + 1;
      this.todoList.push(this.newItem);
      this.newItem = { id: 0, name: '', description: '', completed: false };
      this.todoForm.resetForm();
    } else {
      if(this.todoForm.controls['name'].status === 'INVALID') 
        this.todoForm.controls['name']?.markAsDirty();
      if(this.todoForm.controls['description'].status === 'INVALID')
        this.todoForm.controls['description']?.markAsDirty();
    }
  }

  markCompleted(item: TodoItem) {
    item.completed = true;
  }

  onPin(todoItem: TodoItem) {}

  onDelete(todoItem: TodoItem) {
    const indexOfObject = this.todoList.findIndex((item) => {
      return item.id === todoItem.id;
    });
    if(indexOfObject != -1) {
      this.todoList.splice(indexOfObject, 1);
    }
  }
}
