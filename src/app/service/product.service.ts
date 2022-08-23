import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: Product[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    return this.http.get('http://localhost:3000/api/product');
  }

  addProducts(
    name: string,
    categoryId: string,
    price: number,
    quantity: string
  ) {
    const obj = {
      productName: name,
      productQuantity: quantity,
      productPrice: price,
      category: categoryId,
    };
    return this.http.post('http://localhost:3000/api/product', obj);
  }

  deleteProduct(id: string) {
    return this.http.delete('http://localhost:3000/api/product/' + id);
  }
}
