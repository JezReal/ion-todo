import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit($event) {
    if (this.registerForm.invalid) {
      this.loadToast('Invalid', 1000)
    } else {
      this.dataService
        .register(this.registerForm.value)
        .subscribe((res: any) => {
          if (res.data) {
            this.loadToast('Registration successfull', 1000)
            this.registerForm.reset()
            this.router.navigate(['/login'])
          } else {
            this.loadToast('Registration failed', 1000)
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
