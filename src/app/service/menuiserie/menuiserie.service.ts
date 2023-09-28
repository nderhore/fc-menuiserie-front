import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MenuiserieService {

  constructor(private http: HttpClient) { }

  getMenuiserie(){
    return this.http.get('http://localhost:8081/api');
  }
}
