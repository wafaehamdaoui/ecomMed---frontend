import { Routes } from '@angular/router';
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {OrdersComponent} from "./admin/orders/orders.component";
import {ProductsComponent} from "./admin/products/products.component";
import {ClientsComponent} from "./admin/clients/clients.component";
import {UsersComponent} from "./admin/users/users.component";
import {OrderDetailsDialogComponent} from "./admin/orders/order-details-dialog/order-details-dialog.component";
import {CategoriesComponent} from "./admin/categories/categories.component";
import {HomeComponent} from "./pages/home/home.component";
import {MenubarComponent} from "./pages/menubar/menubar.component";
import {ProductComponent} from "./pages/product/product.component";
import {CollectionsComponent} from "./pages/collections/collections.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductDetailsComponent} from "./pages/product/product-details/product-details.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {AboutComponent} from "./pages/about/about.component";
import {CategoryProductsComponent} from "./pages/collections/category-products/category-products.component";
import {TermsOfUseComponent} from "./pages/terms-of-use/terms-of-use.component";
import {ReturnExchangeComponent} from "./pages/return-exchange/return-exchange.component";
import {PrivacyPolicyComponent} from "./pages/privacy-policy/privacy-policy.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./admin/login/login.component";
import {TokenGuardService} from "./services/token-gard.service";

export const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: '', component: MenubarComponent, children:[
      {path: 'home', component: HomeComponent},
      {path: 'product-list', component: ProductComponent},
      {path: 'collections', component: CollectionsComponent},
      {path: 'collections/:name', component: CategoryProductsComponent},
      {path: 'cart',component: CartComponent},
      {path: 'product-details',component: ProductDetailsComponent},
      {path: 'contact-us',component: ContactComponent},
      {path: 'about', component: AboutComponent},
      {path: 'terms-of-use', component: TermsOfUseComponent},
      {path: 'return-exchange', component: ReturnExchangeComponent},
      {path: 'privacy-policy', component: PrivacyPolicyComponent}
    ]},

  {path: 'admin', component: AdminComponent, canActivate:[TokenGuardService], children:[
      {path: 'dashboard',component: DashboardComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'orders/:id', component: OrderDetailsDialogComponent },
      {path: 'categories' , component: CategoriesComponent},
    ]},
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' }
];
