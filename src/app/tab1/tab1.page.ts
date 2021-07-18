import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { TodomodalComponent } from '../todomodal/todomodal.component';
import { TodopopoverComponent } from '../todopopover/todopopover.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  todoList: any;
  
  todo: string = '';
  todoDate: string = '';
  todoId: any;

  selectedTodo: any = {
    id: -1,
    date: null,
    todo: null
  }

  showTip: boolean = false
  
  constructor(
    public alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private dataService: DataService,
    private modalController: ModalController,
    private popOverController: PopoverController
  ) {}

  ionViewDidEnter() {
    this.getAll()
  }

  async loadAlert() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'camcel',
          handler: something => {
            
          }
        },
        {
          text: 'Log out',
          handler: something => {
            this.userService.setLoggedOut()
            this.userService.clearUser()
            this.router.navigate(['/'])
          }
        }
      ]
    })

    await alert.present()
  }

  async addTodo() {
    const modal = await this.modalController.create({
      component: TodomodalComponent,
    })

    modal.onDidDismiss().then(_ => {
      this.getAll()
    })
    
    return await modal.present()
  }

  async editTodo(todo: any) {
    const modal = await this.modalController.create({
      component: TodomodalComponent,
      componentProps: {
        'date': todo.date,
        'todo': todo.todo
      }
    })

    return await modal.present()
  }

  async loadPopOver(todo: any, event: any) {    
    let todoId = todo.todo_id
    let todoContent = todo.todo
    let todoDate = todo.date

    const popover = await this.popOverController.create({
      component: TodopopoverComponent,
      componentProps: {todo},
      event: event
    })
    
    popover.onDidDismiss().then(_ => {
      this.getAll()
    })

    await popover.present()
  }

  getAll() {
    this.dataService
      .getAllTodos({
        account_id: this.userService.getUser().userId,
      })
      .subscribe((res: any) => {
        if (res.data) {
          this.todoList = res.data;
          this.showTip = false
        } else if (res.error) {
          this.showTip = true
          this.todoList = null
        }
      });
  }
}
