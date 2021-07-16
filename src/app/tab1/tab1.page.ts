import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    private userService: UserService,
    private router: Router
  ) {}

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
}
