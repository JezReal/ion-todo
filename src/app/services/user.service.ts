import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean = true

  userObj = {
    userId: -1,
    userEmail: '',
  }

  constructor() { }

  setUser(userObj: any) {
    this.userObj.userId = userObj.userId
    this.userObj.userEmail = userObj.userEmail
  }

  getUser() {
    return this.userObj
  }

  clearUser() {
    this.userObj = {  userId: -1, userEmail: '' };
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
