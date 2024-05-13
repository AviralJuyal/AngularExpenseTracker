import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ResponseModel } from '../models/stations';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiEndpoint!: string;

  constructor(private http: HttpClient) {
    // this.apiEndpoint = environment.;
  }

  registerUser(data: User) {
    return this.http.post<ResponseModel>(
      this.apiEndpoint + '/AddUpdatePassengers',
      JSON.stringify(data)
    );
  }

  loginUser(data: User) {
    return this.http.post<ResponseModel>(
      this.apiEndpoint + '/Login',
      JSON.stringify(data)
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('userData');
  }
}
