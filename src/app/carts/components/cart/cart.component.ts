import { CartsService } from './../../services/carts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private service:CartsService) { }
  cartProducts:any[] = [];
  total:any = 0;
  success:boolean = false
  ngOnInit(): void {
    this.getCartProducts()
      
  }

  getCartProducts() {
    if("cart" in localStorage){
      //why did we add ! it means if we dont do it its gonna be an error of string or null to get rid of null we add it 
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!) //receive data from localstorage
  }
  this.getCartTotal()
 
}
addAmount(index:number){
  //here it adds only one quantity index is the tartib of product in the cart(is it the first one is it the second one )
this.cartProducts[index].quantity++
this.getCartTotal()
localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage
}
minsAmount(index:number){
  this.cartProducts[index].quantity--
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage

}
detectChange() {
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage

}
deleteProduct(index:number){
  //to delete an item we use splice in a table
  this.cartProducts.splice(index , 1)
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage

}
clearCart() {
  //it means the products in the cart become empty 
  this.cartProducts = []
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage

}
getCartTotal() {
  this.total = 0
  for(let x in this.cartProducts){
    this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
  }

}

//how to send the data in the cart to the backend : 

addCart() {
  let products = this.cartProducts.map(item => {
  return {productId:item.item.id ,quantity: item.quantity}

  })
  let Model = {
    
    userId:5,
    date: new Date(),
    products:products

  }

  this.service.createNewCart(Model).subscribe(res => {
    this.success = true 
    
  })

  console.log(Model);

}
}
