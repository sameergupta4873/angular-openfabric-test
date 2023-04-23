import { Component } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product!: Product;
  errorMessage?: null;
  constructor(activatedRoute: ActivatedRoute, private http: HttpClient) {
    const _id = activatedRoute.params.subscribe((params) => {
      let productService = new ProductService(http);
      if (params?.['_id']) {
        productService.getProduct((params?.['_id'])).
        subscribe(
          (product) => {
            this.product = product;
          },
          (error) => {
            this.errorMessage = error.statusText;
          }
        );
      }
    }
    );
  }

}
