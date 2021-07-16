import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean = false
  userId: string
  userEmail: string

  userObj = {
    userId:'',
    userEmail: '',
  }

  constructor() { }

  setUser(userObj: any) {
    this.userId = userObj.userId
    this.userEmail = userObj.userEmail
  }

  getUser() {
    return this.userObj
  }

  clearUser() {
    this.userObj = {  userId:'', userEmail: '' };
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn
  }

  setLoggedin() {
    this.isUserLoggedIn = true
  }

  setLoggedOut() {
    this.isUserLoggedIn = false
  }
}
