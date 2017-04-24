import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddPage } from '../add/add';

import { TodosProvider } from '../../providers/todos/todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: any;

  constructor(
    public navCtrl: NavController,
    public todosProvider: TodosProvider
  ) {
    this.todosProvider.getTodos().then(data => this.todos = data);
  }

  openAddTodo() {
    this.navCtrl.push(AddPage);
  }

  toggleState(todo) {
    this.todosProvider.toggleState(todo).then(data => {
      todo.done = !todo.done;
    })
  }

}
