import { Component } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-cheekout',
  templateUrl: './cheekout.component.html',
  styleUrls: ['./cheekout.component.scss']
})
export class CheekoutComponent {
  adminform: FormGroup;
  product!: Product;
  errorMessage?: null;
  loading = true;

  orders: any[] = [];
  constructor(activatedRoute: ActivatedRoute, private http: HttpClient, ) {
    const _id = activatedRoute.params.subscribe((params) => {
      let productService = new ProductService(http);
      if (params?.['_id']) {
        productService.getProduct((params?.['_id'])).
        subscribe(
          (product) => {
            this.product = product;
            console.log(this.product);
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
    this.adminform = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rating: new FormControl(0, [Validators.required]),
      numReviews: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      countInStock: new FormControl(0, [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    

    let order = {
      orderItems: [
        {
          name: "iPhone 11 Pro 256GB Memory",
          qty: 1,
          image: "https://www.addmecart.com/wp-content/uploads/2022/11/Apple-iPhone-11-Pro-Max-256-GB-Black.jpg",
          price:599.99,
          product: '6444e4e4e5c0f0c46541d5c2',
        },
      ],
      shippingAddress: {
        address: "test",
        city: "test",
        postalcode: "test",
        country: "test",
      },
      paymentResult: {
        id: "test",
        status: "test",
        upload_status: "test",
        email_address: "test",
      },
      itemsPrice: 599.99,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: 599.99,
      isPaid: false,
      paidAt: new Date(),
      isDeliverd: false,
      deliverAt: new Date(),
    }

    let orderService = new OrderService(http);
    orderService.createOrder(order).subscribe(
      (order) => {
        this.orders.push(order);
      },
      (error) => {
        this.errorMessage = error.statusText;
      }
    );

  }

  onSubmit(): void {
    alert('Order Placed Successfully');
  }
}
