import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:3001/api/category/';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private router: Router) {}

  getCategories() {
    return this.http.get(BASE_URL);
  }

  getCategoryById(id: string) {
    return this.http.get(BASE_URL + id);
  }

  addCategory(name: string) {
    return this.http.post(BASE_URL, {
      categoryName: name,
    });
  }

  deleteCategory(id: string) {
    return this.http.delete(BASE_URL + id);
  }

  updateCategory(name: string, id: string) {
    return this.http.put(BASE_URL, {
      name,
      id,
    });
  }
}
