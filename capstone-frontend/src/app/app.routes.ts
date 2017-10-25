import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/user/header/header.component';
import {HomeComponent} from './components/user/home/home.component';
import {BrandsListComponent} from './components/user/brands-list/brands-list.component';
import {SupPostCreate1Component} from './components/supplier/sup-post-create-1/sup-post-create-1.component';
import {SupPostCreate2Component} from './components/supplier/sup-post-create-2/sup-post-create-2.component';
import {SupPostCreate3Component} from './components/supplier/sup-post-create-3/sup-post-create-3.component';
import {SupHeaderComponent} from './components/supplier/sup-header/sup-header.component';
import {AdMainComponent} from './components/admin/ad-main/ad-main.component';
import {SupMainComponent} from './components/supplier/sup-main/sup-main.component';
import {SupPostListComponent} from "./components/supplier/sup-post-list/sup-post-list.component";
import {ProductDetailComponent} from "./components/common/product-detail/product-detail.component";
import {SearchPostComponent} from "./components/user/search-post/search-post.component";
import {BuyHeaderComponent} from "./components/buyer/buy-header/buy-header.component";
import {BuyMainComponent} from "./components/buyer/buy-main/buy-main.component";
import {BuyOrderListComponent} from "./components/buyer/buy-order-list/buy-order-list.component";
import {StaffHeaderComponent} from "./components/staff/staff-header/staff-header.component";
import {StaffMainComponent} from "./components/staff/staff-main/staff-main.component";
import {StaffPostListComponent} from "./components/staff/staff-post-list/staff-post-list.component";
import {StaffPostDetailComponent} from "./components/staff/staff-post-detail/staff-post-detail.component";


const routing: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'catalog/:catalogId', component: BrandsListComponent},
      {path: 'product-detail', component: ProductDetailComponent},
      {path: 'search/:searchValue', component: SearchPostComponent}
    ]
  },
  {
    path: 'supplier', component: SupHeaderComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: SupMainComponent},
      {path: 'post-list', component: SupPostListComponent},
      {path: 'post-detail/:postId', component: ProductDetailComponent},
      {path: 'create-post1', component: SupPostCreate1Component},
      {path: 'create-post2', component: SupPostCreate2Component},
      {path: 'create-post3', component: SupPostCreate3Component}
    ]
  },
  {
    path: 'buyer', component: BuyHeaderComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: BuyMainComponent},
      {path: 'order-list', component: BuyOrderListComponent}
    ]
  },
  {
    path: 'staff', component: StaffHeaderComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: StaffMainComponent},
      {path: 'post-list', component: StaffPostListComponent},
      {path: 'post-detail/:postId', component: StaffPostDetailComponent}
    ]
  },
  {
    path: 'admin', component: SupHeaderComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: AdMainComponent}
    ]
  }
];

export const appRoutes = RouterModule.forRoot(routing);
