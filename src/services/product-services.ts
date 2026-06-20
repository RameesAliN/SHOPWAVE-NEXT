import ServiceBase from "./service-base";

export default class ProductService extends ServiceBase {

  static fetchProduct = async () => {
    let p = await fetch(`${this.SUPABASE_URL}/rest/v1/products?select=*`, {
      headers: {
        'apikey': 'sb_publishable_9K02P4BAIO_QMauspSuvWA_gXR5hGr-'
      }
    });
    let prod = await p.json();
    return prod;  //this prod get on payload
  }

  static getProductById = async (id: string | number) => {
    let p = await fetch(`${this.SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`, {
      headers: {
        'apikey': 'sb_publishable_9K02P4BAIO_QMauspSuvWA_gXR5hGr-'
      }
    });
    let prod = await p.json();
    return prod[0];
  }

  static productCategory = ['ALL', `men's clothing`, 'Jewelery', 'Electronics', `women's clothing`];

  static formatCurrency = (amount: number)=> {
    return (Math.floor(amount) / 100).toFixed(2);
  }

  static total = (quantity:number, price:number) => {
    let priceCent = price * 100;
    let sum = quantity * priceCent;
    return this.formatCurrency(sum);
  }

   static subTotal = (quantity:number, price:number, subTotal:number)=> {
    let priceCents = price * 100;
    let subTotalCents = subTotal * 100;
    let total = priceCents * quantity;
    subTotalCents += total;
    return this.formatCurrency(subTotalCents)
  }

  static tax= (total:number) =>{
    let totalCents = total * 100;
    let div = totalCents * 0.1;
    return this.formatCurrency(div)
  }

  static summeryTotal=(subTotal:number, tax:number)=> {
    let subTotalCents = subTotal * 100;
    let taxCents = tax * 100;
    let sum = subTotalCents + taxCents;
    return this.formatCurrency(sum)
  }

}