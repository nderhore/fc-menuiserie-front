import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Mode} from "../../admin-dashboard/admin-dashboard.component";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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
    if(this.mode == Mode.CREATE) {
      this.jours = data?.jours;
    } else {
      this.jours = [data?.horaire?.jour]
    }
    if(this.mode == Mode.CREATE) {
      this.horaireForm = this.formBuilder.group({
        jour: ['', Validators.required],
        morningOpeningTime: ['', Validators.required],
        morningCloseTime: ['', Validators.required],
        afternoonOpenTime: ['', Validators.required],
        afternoonCloseTime: ['', Validators.required]
      }, {validator: this.timeValidator()});
      this.noFermetureMorning = false;
    } else {
      this.id = data?.horaire?.horaire_id;
      this.horaireForm = this.formBuilder.group({
        jour: [data?.horaire?.jour, Validators.required],
        morningOpeningTime: [data?.horaire?.heure_matin.split('-')[0] == undefined ?
          data?.horaire?.heure_matin : data?.horaire?.heure_matin.split('-')[0], Validators.required],
        morningCloseTime: [data?.horaire?.heure_matin.split('-')[1] == undefined ?
          '' : data?.horaire?.heure_matin.split('-')[1], Validators.required],

        afternoonOpenTime: [data?.horaire?.heure_apres_midi.split('-')[1] == undefined ?
          '' : data?.horaire?.heure_apres_midi.split('-')[0], Validators.required],
        afternoonCloseTime: [data?.horaire?.heure_apres_midi.split('-')[1] == undefined ?
          data?.horaire?.heure_apres_midi : data?.horaire?.heure_apres_midi.split('-')[1], Validators.required]

      }, {validator: this.timeValidator()});
      if (data?.horaire?.heure_matin.split('-')[1] == undefined){
        this.noFermetureMorning = true;
        this.changeMorningClose(this.noFermetureMorning);
        this.horaireForm.markAsTouched();
      } else {
        this.noFermetureMorning = false;
      }
    }

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

  private timeValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      //recuperation de la valeur des champs
      const group = control as FormGroup;
      const morningOpeningTime = group.get('morningOpeningTime')?.value;
      const morningCloseTime = group.get('morningCloseTime')?.value;
      const afternoonOpenTime = group.get('afternoonOpenTime')?.value;
      const afternoonCloseTime = group.get('afternoonCloseTime')?.value;

      //premiere verification, si le bouton n'a pas été coché
      if(!this.noFermetureMorning){
        if(morningOpeningTime && morningCloseTime && afternoonOpenTime && afternoonCloseTime){
          if(morningOpeningTime >= morningCloseTime){
            return {invalidMorningTime: true};
          }
          if(afternoonOpenTime <= morningCloseTime || afternoonOpenTime >= afternoonCloseTime){
            return {invalidAfternoonTime: true};
          }
        }
      }else {
        if(morningOpeningTime && afternoonCloseTime){
          if(morningOpeningTime > afternoonCloseTime){
            return {invalidAfternoonTime: true};
          }
        }
      }
      return null;
    };
  }

  submit() {
      //verification des champs
    if(this.horaireForm.valid){
      //si il n'y a pas de fermeture le matin on met les valeurs a null
      if(this.noFermetureMorning) {
        this.horaireForm.get('morningCloseTime')?.setValue(null);
        this.horaireForm.get('afternoonOpenTime')?.setValue(null);
        this.horaireForm.updateValueAndValidity();
      }
        const formData = this.horaireForm.value;
        const horaire = {
          horaire_id : this.id == -1 ? null : this.id,
          jour : formData.jour,
          heure_matin : formData.morningCloseTime != undefined ? formData.morningOpeningTime + '-' + formData.morningCloseTime : formData.morningOpeningTime,
          heure_apres_midi : formData.afternoonOpenTime != undefined ? formData.afternoonOpenTime + '-' + formData.afternoonCloseTime : formData.afternoonCloseTime
        };
        if(this.mode == Mode.CREATE){
          this.onSubmit.emit(new Horaire(horaire));
        } else {
          this.onUpdate.emit(new Horaire(horaire));
        }

        this.dialogRef.close();
      }
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

  changeMorningClose(event: boolean) {
    const morningCloseTime = this.horaireForm.get('morningCloseTime');
    const afternoonOpenTime = this.horaireForm.get('afternoonOpenTime');

    if(event){
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
