import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost/todo/'

  constructor(private httpClient: HttpClient) { }

  login(data: any) {
    return this.httpClient.post(this.baseUrl + "login", JSON.stringify(data));
  }

  register(data: any) {
    return this.httpClient.post(this.baseUrl + "register", JSON.stringify(data));
  }

  getAllTodos(data: any) {
    return this.httpClient.post(this.baseUrl + "todos", JSON.stringify(data));
  }

  delete(data: any) {
    return this.httpClient.post(this.baseUrl + "deletetodo", JSON.stringify(data));
  }

  update(data: any) {
    return this.httpClient.post(this.baseUrl + "updatetodo", JSON.stringify(data));
  }

  add(data: any) {
    return this.httpClient.post(this.baseUrl + "inserttodo", JSON.stringify(data));

  }
}
