import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {appRoutes} from './app.routes';
import {ToastModule} from 'ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImageZoomModule } from 'angular2-image-zoom';

import {Constants} from './constants';


/*Component*/
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/user/header/header.component';
import {HomeComponent} from './components/user/home/home.component';
import {BrandsListComponent} from './components/user/brands-list/brands-list.component';
import {SupPostCreate2Component} from './components/supplier/sup-post-create-2/sup-post-create-2.component';
import {SupPostCreate1Component} from './components/supplier/sup-post-create-1/sup-post-create-1.component';
import {SupPostCreate3Component} from './components/supplier/sup-post-create-3/sup-post-create-3.component';
import { SupHeaderComponent } from './components/supplier/sup-header/sup-header.component';

/*Service*/
import {LoginService} from './services/login.service';
import {CatalogService} from './services/catalog.service';
import {CommonService} from './services/common.service';
import {PostService} from './services/post.service';
import { AdMainComponent } from './components/admin/ad-main/ad-main.component';
import { SupMainComponent } from './components/supplier/sup-main/sup-main.component';
import { SupPostListComponent } from './components/supplier/sup-post-list/sup-post-list.component';
import { ProductDetailComponent } from './components/user/product-detail/product-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BrandsListComponent,
    SupPostCreate2Component,
    SupPostCreate1Component,
    SupPostCreate3Component,
    SupHeaderComponent,
    AdMainComponent,
    SupMainComponent,
    SupPostListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    appRoutes, HttpModule,
    BrowserAnimationsModule, ToastModule.forRoot(),
    ImageZoomModule
  ],
  providers: [Constants, LoginService, CatalogService, CommonService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
