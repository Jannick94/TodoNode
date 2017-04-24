import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TodosProvider } from '../../providers/todos/todos';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  todo: { date: Date, text: string, done: Boolean } = { date: new Date(), text: '', done: false };

  constructor(
    public navCtrl: NavController,
    public todos: TodosProvider
  ) {}

  addTodo(todo) {
    this.todos.add(todo);
    this.navCtrl.pop();
  }

}
