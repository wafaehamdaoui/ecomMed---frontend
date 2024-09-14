import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle
} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {Category} from "../../models/Category";
import {CategoryService} from "../../services/category.service";
import {Product} from "../../models/Product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-collections',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardHeader,
        MatCardImage,
        MatCardTitle,
        NgForOf
    ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit{

  categories:Category[] = [];

  constructor(private categoryService: CategoryService,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories
    });
  }

  exploreCategoryProduct(category: Category) {
    this.router.navigate(['/collections',category.name], {
      queryParams: {
        category: JSON.stringify(category)
      }
    }).then(() => {
      console.log('Navigation successful');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch((error) => {
      console.error('Navigation error:', error);
    });
  }

}
