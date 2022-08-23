import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private router: Router) {}

  getCategories() {
    return this.http.get('http://localhost:3000/api/category');
  }

  getCategoryById(id: string) {
    return this.http.get('http://localhost:3000/api/category/' + id);
  }

  addCategory(name: string) {
    return this.http.post('http://localhost:3000/api/category', {
      categoryName: name,
    });
  }

  deleteCategory(id: string) {
    return this.http.delete('http://localhost:3000/api/category/' + id);
  }

  updateCategory(name: string, id: string) {
    return this.http.put('http://localhost:3000/api/category/', {
      name,
      id,
    });
  }
}
