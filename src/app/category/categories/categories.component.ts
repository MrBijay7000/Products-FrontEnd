import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((resposne: any) => {
      console.log({ resposne });
      this.categories = resposne;
    });
  }

  onDeleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe((response) => {
      this.categoryService.getCategories().subscribe((response: any) => {
        this.categories = response;
      });
    });
  }
}
