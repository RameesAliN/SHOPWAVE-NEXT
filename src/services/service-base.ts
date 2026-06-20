export default abstract class ServiceBase {
  // static API_URL='https://fakestoreapi.com/products';
  static SUPABASE_URL = 'https://qzfsrcxoyeogldolkclk.supabase.co';
  static SUPABASE_KEY = 'sb_publishable_9K02P4BAIO_QMauspSuvWA_gXR5hGr-';


  static getAccessToken(): string | null {
    const ACCESS_TOKEN = localStorage.getItem('access_token');
    if (!ACCESS_TOKEN) {
      return null
    }
    return ACCESS_TOKEN
  }
}