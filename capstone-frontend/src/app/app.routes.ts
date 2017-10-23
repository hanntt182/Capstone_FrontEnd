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
import {ProductDetailComponent} from "./components/user/product-detail/product-detail.component";


const routing: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'catalog/:catalogId', component: BrandsListComponent},
      {path: 'product-detail', component: ProductDetailComponent}
    ]
  },
  {
    path: 'supplier', component: SupHeaderComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: SupMainComponent},
      {path: 'post-list', component: SupPostListComponent},
      {path: 'create-post1', component: SupPostCreate1Component},
      {path: 'create-post2', component: SupPostCreate2Component},
      {path: 'create-post3', component: SupPostCreate3Component}
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
