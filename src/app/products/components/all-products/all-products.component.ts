import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
  //we use interface Product here instead of any
  products:Product[] = [];
  categories:string[] = [];
  loading:boolean = false;
  cartProducts:any[] = []
  constructor(private service:ProductsService){

  }

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()

  }

  getProducts(){
    this.loading = true
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      //if its success we will hide loading
      this.loading = false
    
    } , error => {
      this.loading = false
      alert("error")
    }  )
  }
  getCategories(){
    this.loading = true;
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res
      this.loading = false
    
    } , error => {
      this.loading = false
      alert("error")
    }  )
  }
   
  filterCategory(event:any){
    let value = event.target.value;
    //if else statement
    (value == "all") ?  this.getProducts() :  this.getProductsCategory(value)
    

  }
  getProductsCategory(keyword:string){
    this.loading = true
    this.service.getProductsByCategory(keyword).subscribe((res:any) => {
          this.loading = false 
          this.products = res;
    })
  }
 addToCart(event:any){
  //here we have an error because the data that local
  //storage was gonna send does not have the same features or chakl as we want to receive 
 // this.cartProducts = localStorage.getItem("cart")

 //localStorage.setItem("cart" , event)
 //here we stored the event in localstorage but it stored it as an object object not an array of objects what's the solution?
 //how did we know that it stored it as an object object?by inspect element in opera and then application in local host when we click to add to cart we find the type
//the solution is with json.stringify it tells him send the data as ive gave you and
//json.parse it tells him when i receive the data send it as it is stored
//JSON.stringify() //send data(store it)
//JSON.parse() //receive data
/** */
if("cart" in localStorage){
  //why did we add ! it means if we dont do it its gonna be an error of string or null to get rid of null we add it 
  this.cartProducts = JSON.parse(localStorage.getItem("cart")!) //receive data from localstorage
  let exist = this.cartProducts.find(item => item.item.id == event.item.id)//if in each item their id is the same as the want we want to store (the event and its id ) then we store this item in exist
  if(exist){ //if existe true
    alert("this product aleady in your cart")
  }else{
    this.cartProducts.push(event)  //add to cart data
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage
  }
  
} else {
  //we removed parse bcs we cant get data from something non existant
  this.cartProducts.push(event)  //add to cart data
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts)) //store data updated in localstorage


}


 }

}
