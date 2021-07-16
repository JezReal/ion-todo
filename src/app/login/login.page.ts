import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private userService: UserService
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
      alert('invalid')
    } else {
      this.dataService
        .login(this.loginForm.value)
        .subscribe((res: any) => {
          if (res.data) {
            this.userService.setUser(res.data)
            this.loginForm.reset()
            this.userService.setLoggedin()
            this._router.navigate(['/tabs'])
          } else {
            alert('invalid creds')
          }

        })
    }

  }

}
