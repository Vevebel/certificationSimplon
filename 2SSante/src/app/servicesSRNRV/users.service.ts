import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from './api-url.service';
import { Users } from '../modelSRS/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // [x: string]: any;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<Users[]>(`${baseUrl}/liste-user/`);
    // return this.http.get<any[]>('baseUr/users');
  }
  // constructor() { }
}
