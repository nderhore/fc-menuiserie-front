export class UserAuthenticate {
  username : string;
  password : string;

  constructor(data : any) {
    this.username = data.username ? data.username : null;
    this.password = data.password ? data.password : null;
  }

  public serialize() {
    return {
      username: this.username,
      password: this.password
    };
  }

}
