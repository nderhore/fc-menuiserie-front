import {Image} from "../image/image.model";


export class Service {

  private _service_id : number;

  private _nom : string;

  private _description : string;

  private _images : Array<Image> = [];

  constructor(data : any) {
    this._service_id = data.service_id ? data.service_id : null;
    this._nom = data.nom ? data.nom : null;
    this._description = data.description ? data.description : null;
    if(data.images){
      data.images.forEach((image : Image) => {
        this._images.push(new Image(image));
      });
    }
  }


  get service_id(): number {
    return this._service_id;
  }

  set service_id(value: number) {
    this._service_id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get images(): Array<Image> {
    return this._images;
  }

  set images(value: Array<Image>) {
    this._images = value;
  }
}
