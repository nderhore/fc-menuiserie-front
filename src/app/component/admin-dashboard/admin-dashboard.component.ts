import {Component, OnInit} from '@angular/core';
import {Horaire} from "../../models/horaire/horaire.model";
import {HoraireService} from "../../service/horaire/horaire.service";
import {PopinConfirmationComponent} from "../popin/popin-confirmation/popin-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {identity} from "rxjs";
import {Jour} from "../../models/enum/jour.enum";
import {PopinHoraireComponent} from "../popin/popin-horaire/popin-horaire.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  horaires: Array<Horaire>;
  isLoading = true;
  editer: string;
  suppression: string;
  displayedColumnsHoraire: Array<string>;
  jours = Object.keys(Jour);

  constructor(public horaireService : HoraireService,
              public dialog:MatDialog) {
    this.horaires = [];
    this.editer = "modifier";
    this.suppression = "supprimer";
    this.displayedColumnsHoraire = ['jour','heure_matin','heure_apres_midi','action']
  }

  ngOnInit() {
    this.horaireService.getAllHoraires().subscribe(lesHoraires => {
      lesHoraires.forEach((unHoraire : Horaire) => {
        this.horaires.push(new Horaire(unHoraire));
      });
      this.isLoading = false;
    });
  }

  removeHoraire(element : Horaire) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event){
        this.horaireService.deleteHoraireById(element.horaire_id).subscribe(response => {
          this.horaires = this.horaires.filter(horaire => horaire.horaire_id != element.horaire_id)
        });
      }
    })
  }

  editHoraire(element : Horaire) {

  }

  createHoraire() {
    if(this.getJourAvailable().length > 0){
      const dialogRef = this.dialog.open(PopinHoraireComponent,{
        data : {
          mode: Mode.CREATE,
          jours : this.getJourAvailable()
        }
      });
      dialogRef.componentInstance.onSubmit.subscribe(event => {
        this.horaireService.createHoraire(event).subscribe(response => {
          this.horaires = [];
          this.horaireService.getAllHoraires().subscribe(reponse=> {
            reponse.forEach(unHoraire => {
              this.horaires.push(new Horaire(unHoraire));
            });
          });
        });
      });
    }
  }

  getJourAvailable() : Array<string> {
    let jours : Array<string> = [];
    this.jours.forEach(jour => {
      let isAvailable = true;
      this.horaires.forEach(horaire => {
        if(Jour[horaire.jour] == jour){
          isAvailable = false;
        }
      });
      if(isAvailable){
        jours.push(jour);
      }
    });
    return jours;
  }
}

export enum Mode{
  CREATE,
  EDIT
}
