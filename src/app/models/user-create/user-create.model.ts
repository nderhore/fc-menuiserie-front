export class UserCreate {
  username : string;
  password : string;
  role: Array<string>;

  constructor(data : any){
    this.username = data.username ? data.username : null;
    this.password = data.password ? data.password : null;
    this.role = data.role ? data.role : null;
  }

  public serialize() {
    return {
      username: this.username,
      password: this.password,
      role: this.role
    };
  }
}
