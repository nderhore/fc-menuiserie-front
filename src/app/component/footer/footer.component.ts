import {Component, OnInit} from '@angular/core';
import packageJson from '../../../../package.json'
import {Horaire} from "../../models/horaire/horaire.model";
import {HoraireService} from "../../service/horaire/horaire.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // declaration des attributs
  horaires: Array<Horaire> = [];
  public version: string = packageJson.version;

  constructor(private horaireService : HoraireService) {
  }

  ngOnInit(): void {
    this.horaireService.getAllHoraires().subscribe(response => {
      response.forEach((unHoraire : Horaire) => {
        this.horaires.push(new Horaire(unHoraire))
      })
    })
  }

  getHeureOuvertureFermeture(horaire: Horaire) {

  }

}
