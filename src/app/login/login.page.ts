import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private dataService: DataService,
    private userService: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ionViewDidEnter() {
    if (this.userService.isLoggedIn()) {
      this._router.navigate(['tabs'])
    }
  }

  onSubmit($event) {
    if (this.loginForm.invalid) {
      this.loadToast('Invalid', 1000)
    } else {
      this.dataService
        .login(this.loginForm.value)
        .subscribe((res: any) => {
          if (res.data) {
            this.loadToast('Logged in', 1000)
            this.userService.setUser(res.data)
            this.loginForm.reset()
            this.userService.setLoggedin()
            this._router.navigate(['/tabs'])
          } else {
            this.loadToast('Invalid credentials', 1000)
          }
        })
    }
  }

  async loadToast(message: string, length: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: length
    })

    toast.present()
  }

}
