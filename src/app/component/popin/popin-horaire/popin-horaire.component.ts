import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Mode} from "../../admin-dashboard/admin-dashboard.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Horaire} from "../../../models/horaire/horaire.model";
import {Jour} from "../../../models/enum/jour.enum";

@Component({
  selector: 'app-popin-horaire',
  templateUrl: './popin-horaire.component.html',
  styleUrls: ['./popin-horaire.component.css']
})
export class PopinHoraireComponent {

  mode: Mode;
  id : number = -1;
  horaireForm: FormGroup;
  noFermetureMorning : boolean;

  @Output()
  onUpdate : EventEmitter<Horaire>;

  @Output()
  onSubmit : EventEmitter<Horaire>;

  public jours: Array<Jour>;

  constructor(public dialogRef: MatDialogRef<PopinHoraireComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder){

    this.mode = data?.mode;
    this.jours = data?.jours;
    this.horaireForm = this.formBuilder.group({
        jour: ['', Validators.required],
        morningOpeningTime: ['', Validators.required],
        morningCloseTime: ['', Validators.required],
        afternoonOpenTime: ['', Validators.required],
        afternoonCloseTime: ['', Validators.required]
      },);
    this.noFermetureMorning = false;

    this.onSubmit = new EventEmitter<Horaire>();
    this.onUpdate = new EventEmitter<Horaire>();

}
  getTitle(): string {
    if(this.mode == Mode.CREATE){
      return 'Création d\'un nouvel horaire';
    }else if(this.mode == Mode.EDIT){
      return 'Modification d\'un horaire';
    }
    return '';
  }

  private timeValidator() {

  }

  submit() {

  }

  getSubmitButton() {
    if(this.mode == Mode.CREATE){
      return 'Créer';
    }else if(this.mode == Mode.EDIT){
      return 'Mise à jour';
    }
    return '';
  }

  closePopin() {
    this.dialogRef.close();
  }

  changeMorningClose(event: any) {
    const morningCloseTime = this.horaireForm.get('morningCloseTime');
    const afternoonOpenTime = this.horaireForm.get('afternoonOpenTime');

    if(event.checked){
      morningCloseTime?.clearValidators();
      afternoonOpenTime?.clearValidators();
      this.noFermetureMorning = true;
      //on rend les elements non obligatoire
    }else{
      morningCloseTime?.setValidators([Validators.required]);
      afternoonOpenTime?.setValidators([Validators.required]);
      this.noFermetureMorning = false;
    }
    morningCloseTime?.updateValueAndValidity();
    afternoonOpenTime?.updateValueAndValidity();
  }
}
