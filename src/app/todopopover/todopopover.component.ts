import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { TodomodalComponent } from '../todomodal/todomodal.component';

@Component({
  selector: 'app-todopopover',
  templateUrl: './todopopover.component.html',
  styleUrls: ['./todopopover.component.scss'],
})
export class TodopopoverComponent implements OnInit {

  @Input() todo: any

  constructor(
    private dataService: DataService,
    private popOverController: PopoverController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {

  }

  deleteTodo() {
    this.dataService.delete({
      todo_id: this.todo.todo_id
    })
      .subscribe((res: any) => {
        if (res.data) {
          
        } else if (res.error) {
        }
      })

      this.popOverController.dismiss()
  }

  async editTodo() {
    const modal = await this.modalController.create({
      component: TodomodalComponent,
      componentProps: {
        'editTodoId': this.todo.todo_id,
        'editTodoDate': this.todo.date,
        'editTodoContent': this.todo.todo,
      }
    })

    return await modal.present()
  }

}
