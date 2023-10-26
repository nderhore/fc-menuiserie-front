export class User {
  id: number;
  username: string;
  roles : Array<string>;
  accessToken : string;

  constructor(data : any){
    this.id = data.id ? data.id : null;
    this.username = data.username ? data.username : null;
    this.roles = data.roles ? data.roles : null;
    this.accessToken = data.accessToken ? data.accessToken : null;
  }

  public serialize() {
    return {
      id: this.id,
      username: this.username,
      roles: this.roles,
      accessToken: this.accessToken
    };
  }
}
