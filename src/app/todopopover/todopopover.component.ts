import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-todopopover',
  templateUrl: './todopopover.component.html',
  styleUrls: ['./todopopover.component.scss'],
})
export class TodopopoverComponent implements OnInit {

  @Input() todo: any

  constructor(
    private dataService: DataService,
    private popOverController: PopoverController
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

  editTodo() {

  }

}
