import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/models/User';
import { UserService } from '../services/user.service';
import { Product } from '../shared/models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {
  adminform: FormGroup;
  user!: User;
  errorMessage?: '';
  successMessage?: '';
  show = true;
  isDisabled = true;
  showEdit = true;
  EditProduct?: Product;
  text = 'Edit';
  delete = false;
  loading = false;

  toogleAdd() {
    this.show = false;
    this.delete = false;
    this.showEdit = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.EditProduct = undefined;
  }
  
  toogleEdit() {
    this.showEdit = !this.showEdit;
    this.show = true;
    this.productService.getAll().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this.errorMessage = error.statusText;
      }
    );
  }

  editProduct(product: Product, type: boolean) {
    this.EditProduct = product;
    this.showEdit = true;
    this.delete = type;
    this.show = false;
    this.errorMessage = '';
    this.successMessage = '';
  }


  products: Product[] = [];
  constructor(private http: HttpClient, private productService: ProductService) {
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
    this.productService.getAll().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this.errorMessage = error.statusText;
      }
    );
  }

  get formData() {
    return this.adminform.controls;
  }

  validateForm() {
    for (let i in this.adminform.controls) this.adminform.controls[i].markAsTouched();
  }
  onSubmit(product: any): void {
    const { email, password } = product;
    this.loading = true;
    if (this.adminform.valid) {
      let ObservableUser: Observable<User>;
      const userService = new UserService(this.http);
      ObservableUser = userService.getUser(email, password);
      ObservableUser.subscribe((user) => {
        let url = 'https://open-fabric-backend.vercel.app/api/products/add';
        if (this.delete) {
          url = 'https://open-fabric-backend.vercel.app/api/products/delete';
        } else {
          url = 'https://open-fabric-backend.vercel.app/api/products/add';
        }
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('Authorization', `Bearer ${user.token}`);
        this.http
          .post(url, product, { headers: headers })
          .subscribe(
            (res: any) => {
              this.successMessage = res.message;
              this.loading = false;
            },
            err => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      },
        err => {
          this.errorMessage = err.error.message;
          this.loading = false;
        },
      )
    } else {
      this.validateForm();
      this.loading = false;
    }
  }
}
