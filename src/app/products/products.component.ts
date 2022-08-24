import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  onDelete(id: string) {
    this.productsService.deleteProduct(id).subscribe((result) => {
      this.fetchProducts();
    });
  }

  fetchProducts() {
    this.productsService.getProducts().subscribe((response: any) => {
      this.products = response;
    });
  }
}
