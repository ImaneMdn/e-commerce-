import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  //in product.html we dont have the data so we receive data by input 
  @Input() data!:Product
  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0;

   constructor(){ }
   
  ngOnInit(): void {
  

  }

add(){
  this.item.emit({item:this.data,quantity:this.amount})

}
}
