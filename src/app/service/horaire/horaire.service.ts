import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Horaire} from "../../models/horaire/horaire.model";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  apiUrl : string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/horaire';
  }

  getAllHoraires() {
    return this.http.get<Array<Horaire>>(this.apiUrl);
  }

  createHoraire(horaire : Horaire){
    return this.http.post(this.apiUrl,horaire.serialize())
  }

  deleteHoraireById(id : number){
    return this.http.delete(this.apiUrl + '/' + id)
  }

  updateHoraire(id : number, horaire : Horaire){
    return this.http.put(this.apiUrl + '/' + id,horaire.serialize())
  }
}
