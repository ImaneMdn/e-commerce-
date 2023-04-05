import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  id:any
  data:any = {}
  loading:boolean = false
  //to read data from url to get to know which id we are in we use activate 
  constructor(private route:ActivatedRoute , private service:ProductsService){
   this.id = this.route.snapshot.paramMap.get("id")
   console.log(this.id);
  }

  ngOnInit(): void {
    //if we dont do this the details of the products won't show up,the data bindiing in html won't know where is the data 
      this.getProduct()
  }


   getProduct() {
    this.loading = true
    this.service.getProductById(this.id).subscribe(res => {
      this.loading = false
      this.data = res


    }, error => {
      this.loading = false
      alert(error)

    })
   }
}
