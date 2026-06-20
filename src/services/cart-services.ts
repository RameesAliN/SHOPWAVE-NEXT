import ServiceBase from "./service-base";
import ProductService from "./product-services";

export default class CartService extends ServiceBase {
  static getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
      const payload = token.split('.')[1]; // JWT format: header.payload.signature
      const decoded = JSON.parse(atob(payload));
      return decoded.sub; // Supabase JWTs use "sub" claim for the user's id
    } catch {
      return null;
    }
  }

  static fetchCart = async () => {
    const userId = this.getUserIdFromToken();
    const token = ProductService.getAccessToken();

    const response = await fetch(`${this.SUPABASE_URL}/rest/v1/cart?select=*,products(*)&user_id=eq.${userId}`, {
      headers: {
        'apikey': this.SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log(response.status)
    return response.status;
  }

   static async checkSession(): Promise<{ userId: string; token: string }> {
    const userId = this.getUserIdFromToken();
    const token = ProductService.getAccessToken();

    if (!userId || !token) {   //it check token and user id exist
      alert('Please login first');
      throw new Error('User not logged in');
    }

    const tokenStatus = await this.fetchCart();
    if (tokenStatus === 401) {       //it check token valid or not
      alert('Session expired!\nLogin again');
      throw new Error('Session expired');
    }

    return { userId, token };
  }

}
