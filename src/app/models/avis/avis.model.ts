export class Avis {

  private _avis_id : number;

  private _pseudo : string;

  private _is_approved : boolean;

  private _is_archived : boolean;

  private _description : string;

  private _note : string;


  constructor(data : any) {
    this._avis_id = data.avis_id ? data.avis_id : null;
    this._pseudo = data.pseudo ? data.pseudo : null;
    this._is_approved = data.is_approved ? data.is_approved : null;
    this._is_archived = data.is_archived ? data.is_archived : null;
    this._description = data.description ? data.description : null;
    this._note = data.note ? data.note : null;
  }


  get avis_id(): number {
    return this._avis_id;
  }

  set avis_id(value: number) {
    this._avis_id = value;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  get is_approved(): boolean {
    return this._is_approved;
  }

  set is_approved(value: boolean) {
    this._is_approved = value;
  }

  get is_archived(): boolean {
    return this._is_archived;
  }

  set is_archived(value: boolean) {
    this._is_archived = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }

  serialize(){
    return {
      'avis_id' : this.avis_id,
      'pseudo' : this.pseudo,
      'is_approved' : this.is_approved,
      'is_archived' : this.is_archived,
      'description' : this.description,
      'note' : this.note
    }
  }
}
