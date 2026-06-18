import ServiceBase from "./service-base";

export default class ProductService extends ServiceBase{
  static fetchProduct = async ()=>{
    let response = await fetch(this.API_URL);
    let product = await response.json();
    return product;
  }

  static getProductById = async (id:number)=>{
    let response = await fetch(`${this.API_URL}/${id}`);
    let product = await response.json();
    return product;
    //console.log(`${this.API_URL}${id}`)
  }

  static productCategory = ['ALL', `men's clothing`, 'Jewelery', 'Electronics', `women's clothing`];
  
}