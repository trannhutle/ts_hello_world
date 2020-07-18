export interface Product {
  name: string;
  unitPrice: number;
}

export class OrderDetail {
  product: Product;
  quantity: number;
  getTotal(discount: number): number {
    const priceWithoutDiscount = this.product.unitPrice * this.quantity;
    const discountAmount = priceWithoutDiscount * discount;
    return priceWithoutDiscount - discountAmount;
  }
}

let last3Scores: [string, number, number, number];
last3Scores = ["Billy", 60, 70, 75];
