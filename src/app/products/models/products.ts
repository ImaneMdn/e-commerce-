export interface Product {
    //we did export so we can see it outside when we need it 
    //why do we need to do interface?
    //in products we excpect to receive this data
    //but in products we used to affect each variable to any which is not wrong but not practical
     
    id:number,
    title:string,
    price:string,
    category:string,
    description:string,
    image:string,
    amount?:number //its optional 

}