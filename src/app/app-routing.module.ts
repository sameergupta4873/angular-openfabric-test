import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'product-detail/:_id', component: ProductDetailComponent },
  { path: '', component: ProductsComponent },
  { path: 'admin', component: AdminComponent },
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
