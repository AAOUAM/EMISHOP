import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get('https://dummyjson.com/products');
  }

  getProductsByCategory(category:string){
    return this.http.get('https://dummyjson.com/products/category/'+category);
  }

  getListCategory(){
    return this.http.get('https://dummyjson.com/products/category-list');
  }

  getProductBykey(text : string){
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`)
  }

  getProductById(id : any){
    return this.http.get(`https://dummyjson.com/products/${id}`);  }
}
