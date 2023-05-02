import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrls: ['./search-todo.component.css']
})
export class SearchTodoComponent {

  //sending date to parent component using output decorator
  @Output()
  eventProperty: EventEmitter<string> = new EventEmitter<string>();

  todoTitle: string = "";

  // method to search todo
  searchTodo() {
    this.eventProperty.emit(this.todoTitle);
  }

 }
