import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-todomodal',
  templateUrl: './todomodal.component.html',
  styleUrls: ['./todomodal.component.scss'],
})
export class TodomodalComponent implements OnInit {

  todoDate: string
  todo: string

  @Input() editTodoDate: any
  @Input() editTodoContent: any
  @Input() editTodoId: any

  isNewTodo: boolean = true

  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private userService: UserService,
    private popOverController: PopoverController
  ) { }

  ngOnInit() {
    if (this.editTodoId) {
      this.todo = this.editTodoContent
      this.todoDate = this.editTodoDate
      this.isNewTodo = false
    }
  }

  addTodo() {
    this.dataService
      .add({
        account_id: this.userService.getUser().userId,
        date: this.todoDate,
        todo: this.todo
      })
      .subscribe((res: any) => {
        if (res.data) {
          this.dismissModal()
        } else if (res.error) {
        }
      });
  }

  updateTodo() {
    this.dataService
      .update({
        'todo_id': this.editTodoId,
        'date': this.todoDate,
        'todo': this.todo
      })
      .subscribe((res: any) => {
        if (res.data) {
          this.dismissModal()
        } else if (res.error) {
        }
      });
    this.popOverController.dismiss()
  }

  dismissModal() {
    this.modalController.dismiss()
    if (this.editTodoId) {
      this.popOverController.dismiss()
    }
  }
}
