import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  form!: FormGroup;
  editMode = false;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formInit();
    console.log(this.form.value);

    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
    });
    this.route.paramMap.subscribe((paramMap: any) => {
      const id = paramMap.params.id;

      if (id) {
        this.editMode = true;
        this.productService.getProductById(id).subscribe((response: any) => {
          this.form.setValue({
            id: response.id,
            name: response.name,
            price: response.price,
            quantity: response.quantity,
            category: response.categoryId,
          });
        });
      } else {
        this.editMode = false;
      }
    });
  }

  formInit() {
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      quantity: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    const { name, price, category, quantity } = this.form.value;

    if (this.editMode) {
      this.productService
        .updateProduct(this.form.value.id, name, price, quantity, category)
        .subscribe((response: any) => {
          this.form.reset();
          alert(response.message);
          this.router.navigate(['/']);
        });
    } else {
      this.productService
        .addProducts(name, category, price, quantity)
        .subscribe((response: any) => {
          this.form.reset();
          alert(response.message);
          this.router.navigate(['/']);
        });
    }
  }
}
