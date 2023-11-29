import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) {}
    getAll(): Observable<any[]>{
      return this.http.get<any[]>('https://open-fabric-backend.vercel.app/api/orders');
    }

    createOrder(order: any): Observable<any> {
      return this.http.post<any>('https://open-fabric-backend.vercel.app/api/orders', order);
    }
}
