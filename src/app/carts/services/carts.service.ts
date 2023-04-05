import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  createNewCart(model:any){
    //post is not like get here we need to add model that is in the parameter 
    return this.http.post('https://fakestoreapi.com/carts',model)
  }
}
