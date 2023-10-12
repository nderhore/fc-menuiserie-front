
export class Menuiserie {

  private _menuiserie_id : number;

  private _nom : string;

  constructor(data : any) {
    this._menuiserie_id = data.menuiserie_id ? data.menuiserie_id : null;
    this._nom = data.nom ? data.nom : null;
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


  serialize(){
    return {
      'menuiserie_id': this.menuiserie_id,
      'nom':this.nom
    }
  }
}
