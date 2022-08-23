import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category.model';
import { Product } from 'src/app/model/Product.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
    });
  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { name, price, category, quantity } = form.value;
    this.productService
      .addProducts(name, category, price, quantity)
      .subscribe((response: any) => {
        form.resetForm();
        alert(response.message);
        this.router.navigate(['/']);
      });
  }
}
