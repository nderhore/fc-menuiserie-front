export class Image {

  private _image_id : number;

  private _image_data : string;

  constructor(data : any) {
    this._image_id = data.image_id ? data.image_id : null;
    this._image_data = data.image_data ? data.image_data : null;
  }


  get image_id(): number {
    return this._image_id;
  }

  set image_id(value: number) {
    this._image_id = value;
  }

  get image_data(): string {
    return this._image_data;
  }

  set image_data(value: string) {
    this._image_data = value;
  }

  serialize(){
    return {
      'image_id': this.image_id,
      'image_data' : this.image_data
    }
  }
}
