export class User {

  email: string;
  username : string;
  password: string;

  sexe : string ;
  tel : string ;
  datenaissance : Date ;


  constructor(email: string, username: string, password: string, Sexe: string, tel: string, datenaissance: Date) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.sexe = Sexe;
    this.tel = tel;
    this.datenaissance = datenaissance;
  }
}
