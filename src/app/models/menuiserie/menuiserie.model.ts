import {Horaire} from "../horaire/horaire.model";
import {Avis} from "../avis/avis.model";


export class Menuiserie {

  private _menuiserie_id : number;

  private _nom : string;

  private _horaires : Array<Horaire> = [];

  private _avis : Array<Avis> = [];

  constructor(data : any) {
    this._menuiserie_id = data.menuiserie_id ? data.menuiserie_id : null;
    this._nom = data.nom ? data.nom : null;
    if(data.horaires){
        data.horaires.forEach((horaire : Horaire) => {
        this._horaires.push(new Horaire(horaire))
      })
    }
    if(data.avis){
      data.avis.forEach((unAvis : Avis) => {
        this._avis.push(new Avis(unAvis));
      })
    }
  }


  get menuiserie_id(): number {
    return this._menuiserie_id;
  }

  set menuiserie_id(value: number) {
    this._menuiserie_id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get horaires(): Array<Horaire> {
    return this._horaires;
  }

  set horaires(value: Array<Horaire>) {
    this._horaires = value;
  }

  get avis(): Array<Avis> {
    return this._avis;
  }

  set avis(value: Array<Avis>) {
    this._avis = value;
  }
}
