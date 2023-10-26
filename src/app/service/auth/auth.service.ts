import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserAuthenticate} from "../../models/user-authenticate/user-authenticate.model";
import {UserCreate} from "../../models/user-create/user-create.model";
import {User} from "../../models/user/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string;

  constructor(private httpClient : HttpClient) {
    this.url = environment.apiUrl + "/auth";
  }

  public authenticate(user : UserAuthenticate){
    return this.httpClient.post(this.url + '/signin', user.serialize());
  }

  public register(user : UserCreate){
    return this.httpClient.post(this.url + '/signup', user.serialize())
  }

  isAuthenticated() {
    const user = this.getUserData();
    return user != null && user.accessToken != null;
  }

  public getUserData(): User {
    const userData = localStorage.getItem('user'); //stockage uniquement de string
    const parsedData = userData ? JSON.parse(userData) : Object.create(null);
    return new User(parsedData);
  }

  isAdmin() {
    return this.getUserData().roles.includes('ADMIN');
  }
}
