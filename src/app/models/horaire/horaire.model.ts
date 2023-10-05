import {Jour} from "../enum/jour.enum";


export class Horaire {

  private _horaire_id : number;

  private _jour : Jour;

  private _heure_matin : string;

  private _heure_apres_midi : string;


  constructor(data : any) {
    this._horaire_id = data.horaire_id ? data.horaire_id : null;
    this._heure_apres_midi = data.heure_apres_midi ? data.heure_apres_midi : null;
    this._heure_matin = data.heure_matin ? data.heure_matin : null;
    this._jour = data.jour ? JSON.parse(data.jour).jour : null; // {'jour':'LUNDI'}
  }


  get jour(): Jour {
    return this._jour;
  }

  set jour(value: Jour) {
    this._jour = value;
  }

  get horaire_id(): number {
    return this._horaire_id;
  }

  set horaire_id(value: number) {
    this._horaire_id = value;
  }

  get heure_matin(): string {
    return this._heure_matin;
  }

  set heure_matin(value: string) {
    this._heure_matin = value;
  }

  get heure_apres_midi(): string {
    return this._heure_apres_midi;
  }

  set heure_apres_midi(value: string) {
    this._heure_apres_midi = value;
  }

  serialize(){
    return {
      'horaire_id' : this.horaire_id,
      'heure_apres_midi' : this._heure_apres_midi,
      'heure_matin' : this.heure_matin,
      'jour' : this.jour

    }
  }
}

