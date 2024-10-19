export class Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  category: string;
  description: string;
  stock: number;
  rating : any ;
  tags : string[] ;
  thumbnail : String ;
  discountPercentage : any ;
  brand : string ;

  constructor(id : number ,nom: string, imageUrl: string[], prix: number,
              categorie: string, description: string, stock: number , rating : any ,
              tags : string[] , thumbnail : String , discountPercentage : any , brand : string) {
    this.id = id;
    this.title = nom;
    this.images = imageUrl;
    this.price = prix;
    this.category = categorie;
    this.description = description;
    this.stock = stock;
    this.rating = rating;
    this.tags = tags;
    this.thumbnail = thumbnail ;
    this.discountPercentage = discountPercentage;
    this.brand = brand ;
  }
}
