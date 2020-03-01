import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Todo } from "src/app/models/Todo";
import { TodoService } from "../../services/todo.service";
@Component({
  selector: "app-todo-items",
  templateUrl: "./todo-items.component.html",
  styleUrls: ["./todo-items.component.css"]
})
export class TodoItemsComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {}
  setClasses() {
    let classes = {
      todo: true,
      "is-complete": this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    //ui part
    todo.completed = !todo.completed;

    //server part
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    });
  }
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
