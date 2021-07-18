import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {}

  addTodo() {
    this.dataService
      .add({
        account_id: this.userService.getUser().userId,
        date: this.todoDate,
        todo: this.todo
      })
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res.data);
          this.dismissModal()
        } else if (res.error) {
          console.log('Wala');
        }
      });
  }

  dismissModal() {
    this.modalController.dismiss()
  }

}
