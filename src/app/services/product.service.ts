import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>('https://open-fabric-backend.vercel.app/api/products');
  }
  getProduct(_id: string): Observable<Product> {

    const product = this.http.get<Product>(`https://open-fabric-backend.vercel.app/api/products/${_id}`) ?? new Product();

    return product;
  }
  deleteProduct(_id: string): Observable<Product> {
    return this.http.delete<Product>(`https://open-fabric-backend.vercel.app/api/products/delete/${_id}`);
  }
}

