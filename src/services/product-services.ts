import ServiceBase from "./service-base";

export default class ProductService extends ServiceBase{
  
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
  
}