import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuiserieService {

  apiUrl : string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getMenuiserie(){
    return this.http.get(this.apiUrl + '/menuiserie');
  }
}
