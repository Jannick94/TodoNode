import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosProvider {

  todos: Array<{ id: Number, date: string, text: string, done: any }> = [];

  constructor(
    public http: Http
  ) {}

  getTodos() {
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/')
        .map(res => res.json())
        .subscribe(data => {
          this.todos = data;

          resolve(this.todos);
        });
    });
  }

  add(todo) {
    this.http.post('http://localhost:3000/create-todo', { todo })
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
    this.todos.push(todo);
  }

  toggleState(todo) {
    return new Promise(resolve => {
      this.http.post('http://localhost:3000/toggle-state', { id: todo.id, state: !todo.done })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
