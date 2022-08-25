import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/model/Category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  form!: FormGroup;
  category!: Category;
  editMode = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();

    this.route.paramMap.subscribe((paramMap: any) => {
      const id = paramMap?.params?.id;

      if (id) {
        this.editMode = true;
        this.categoryService.getCategoryById(id).subscribe((response: any) => {
          // this.category.name = response.name;

          this.form.setValue({
            name: response.name,
            id: response.id,
          });
        });
      } else {
        this.editMode = false;
      }
    });
  }

  formInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      id: new FormControl(null),
    });
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      this.categoryService
        .updateCategory(this.form.value.name, this.form.value.id)
        .subscribe((response: any) => {
          this.form.reset();
          alert(response.message);
          this.router.navigate(['/']);
        });
    } else {
      this.categoryService
        .addCategory(this.form.value.name)
        .subscribe((response: any) => {
          this.form.reset();
          alert(response.message);
          this.router.navigate(['/']);
        });
    }
  }
}
