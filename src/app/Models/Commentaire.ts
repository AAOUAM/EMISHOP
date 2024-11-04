import {User} from "./User";

export class Commentaire {
  user! : User ;
  date! : Date ;
  comment! : string ;
  rating! : number ;


  constructor(user: User, date: Date, comment: string, rating: number) {
    this.user = user;
    this.date = date;
    this.comment = comment;
    this.rating = rating;
  }



}
