import { Component } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  product!: Product;
  errorMessage?: null;
  loading = true;
  constructor(activatedRoute: ActivatedRoute, private http: HttpClient) {
    const _id = activatedRoute.params.subscribe((params) => {
      let productService = new ProductService(http);
      if (params?.['_id']) {
        productService.getProduct((params?.['_id'])).
        subscribe(
          (product) => {
            this.product = product;
            this.loading = false;
          },
          (error) => {
            this.errorMessage = error.statusText;
            this.loading = false;
          }
        );
      }
    }
    );
  }
}
