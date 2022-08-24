import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/Product.model';

const BASE_URL = 'http://localhost:3001/api/product/';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product: Product[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    return this.http.get(BASE_URL);
  }

  getProductById(id: string) {
    return this.http.get(BASE_URL + id);
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
    return this.http.post(BASE_URL, obj);
  }

  deleteProduct(id: string) {
    return this.http.delete(BASE_URL + id);
  }

  updateProduct(
    id: string,
    name: string,
    price: string,
    quantity: string,
    category: string
  ) {
    return this.http.put(BASE_URL, {
      id,
      name,
      price,
      quantity,
      category,
    });
  }
}
