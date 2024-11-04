import {LignePanier} from "./LignePanier";

export class Commande{
  userId : string;
  dateCommande : Date;
  detail : LignePanier[] ;
  montant : number;


  constructor(userId: string, dateCommande: Date, detail: LignePanier[], montant: number) {
    this.userId = userId;
    this.dateCommande = dateCommande;
    this.detail = detail;
    this.montant = montant;
  }
}
