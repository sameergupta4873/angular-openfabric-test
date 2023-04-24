import { Component } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  errorMessage?: null;
  loading = true;
  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(
      (products) => {
        this.products = products;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error.statusText;
        this.loading = false;
      }
    );
  }
}
