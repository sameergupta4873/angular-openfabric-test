import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUser(email: string, password: string): Observable<User> {
    const tokenHeaders = new HttpHeaders();
    tokenHeaders
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const user = this.http.post<User>(`https://open-fabric-backend.vercel.app/api/user/login`, {email, password}, {headers: tokenHeaders}) ?? new User();
    return user;
  }

}
