import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent as AdminDashboardComponent} from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductsComponent as AdminProductsComponent } from './admin/products/products.component';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"about", component:AboutComponent},
  {path: "contact", component:ContactComponent},
  {path:"admin/login", component:LoginComponent},
  {path:"admin/dashboard", component:AdminDashboardComponent},
  {path:"products", component:ProductsComponent},
  {path:"admin/products", component:AdminProductsComponent},
  {path:"admin/product/:id", component:ProductComponent},
  {path:"admin/order/:id", component:OrdersComponent},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }