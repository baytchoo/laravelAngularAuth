import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReqServiceService {

	private baseUrl = 'http://127.0.0.1:8000/api/';
  constructor(private http:HttpClient) { }

  signup(data) {
  	return this.http.post(`${this.baseUrl}signup`, data);
  }


  login(data) {
  	return this.http.post(`${this.baseUrl}login`, data);
  }

  sendPasswordResetLink(data) {
  	return this.http.post(`${this.baseUrl}sendpasswordresetlink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseUrl}resetpassword`, data);
  }
}
