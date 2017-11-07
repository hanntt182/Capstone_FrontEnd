import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {appRoutes} from './app.routes';
import {ToastModule} from 'ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImageZoomModule} from 'angular2-image-zoom';
import {MyDatePickerModule} from 'mydatepicker';
import {CustomFormsModule} from 'ng2-validation';
import {TextMaskModule} from 'angular2-text-mask';
import {DateTimePickerModule} from 'ngx-datetime-picker/ngx-datetimepicker/src/app/datetimepicker.module';


import {Constants} from './constants';


/*Component*/
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/user/header/header.component';
import {HomeComponent} from './components/user/home/home.component';
import {BrandsListComponent} from './components/user/brands-list/brands-list.component';
import {SupPostCreate2Component} from './components/supplier/sup-post-create-2/sup-post-create-2.component';
import {SupPostCreate1Component} from './components/supplier/sup-post-create-1/sup-post-create-1.component';
import {SupPostCreate3Component} from './components/supplier/sup-post-create-3/sup-post-create-3.component';
import {SupHeaderComponent} from './components/supplier/sup-header/sup-header.component';
import {AdMainComponent} from './components/admin/ad-main/ad-main.component';
import {SupMainComponent} from './components/supplier/sup-main/sup-main.component';
import {SupPostListComponent} from './components/supplier/sup-post-list/sup-post-list.component';
import {ProductDetailComponent} from './components/common/product-detail/product-detail.component';
import {SearchPostComponent} from './components/user/search-post/search-post.component';
import {RegisterComponent} from './components/user/register/register.component';
import {SupPostUpdateComponent} from './components/supplier/sup-post-update/sup-post-update.component';
import {StaffOrderListComponent} from './components/staff/staff-order-list/staff-order-list.component';
import {SupOrderDetailComponent} from './components/supplier/sup-order-detail/sup-order-detail.component';
import {SupOrderListComponent} from './components/supplier/sup-order-list/sup-order-list.component';
import {BuyHeaderComponent} from './components/buyer/buy-header/buy-header.component';
import {BuyMainComponent} from './components/buyer/buy-main/buy-main.component';
import {BuyOrderListComponent} from './components/buyer/buy-order-list/buy-order-list.component';
import {StaffMainComponent} from './components/staff/staff-main/staff-main.component';
import {StaffHeaderComponent} from './components/staff/staff-header/staff-header.component';
import {AdHeaderComponent} from './components/admin/ad-header/ad-header.component';
import {StaffPostListComponent} from './components/staff/staff-post-list/staff-post-list.component';
import {StaffPostDetailComponent} from './components/staff/staff-post-detail/staff-post-detail.component';
import {CreateOrderComponent} from './components/buyer/create-order/create-order.component';
import {SupNegoDetailComponent} from './components/supplier/sup-nego-detail/sup-nego-detail.component';
import {BuyNegoDetailComponent} from './components/buyer/buy-nego-detail/buy-nego-detail.component';
import {BuyOrderPaymentComponent} from './components/buyer/buy-order-payment/buy-order-payment.component';
import {BuyNegoCreateComponent} from './components/buyer/buy-nego-create/buy-nego-create.component';
import {BuyTenderCreateComponent} from './components/buyer/buy-tender-create/buy-tender-create.component';
import {BuyNegoPaymentComponent} from './components/buyer/buy-nego-payment/buy-nego-payment.component';

/*Service*/
import {LoginService} from './services/login.service';
import {CatalogService} from './services/catalog.service';
import {CommonService} from './services/common.service';
import {PostService} from './services/post.service';
import {OrderService} from './services/order.service';
import {NegoService} from './services/nego.service';
import {TenderService} from './services/tender.service';


/*Guard*/
import {AdminRoleGuard} from './guards/check-role/admin-role.guard';
import {StaffRoleGuard} from './guards/check-role/staff-role.guard';
import {SupRoleGuard} from './guards/check-role/sup-role.guard';
import {BuyRoleGuard} from './guards/check-role/buy-role.guard';
import {CreateOrderGuard} from './guards/create-order.guard';
import {CreateTenderGuard} from './guards/create-tender.guard';

import {RatingModule} from 'ng2-rating';
import {BuyProfileUpdateComponent} from './components/buyer/buy-profile-update/buy-profile-update.component';
import {TenderDetailComponent} from './components/common/tender-detail/tender-detail.component';


import {CalendarModule} from 'primeng/primeng';

import {TenderListComponent} from './components/common/tender-list/tender-list.component';


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
    ProductDetailComponent,
    SearchPostComponent,
    SupOrderListComponent,
    BuyHeaderComponent,
    BuyMainComponent,
    BuyOrderListComponent,
    StaffMainComponent,
    StaffHeaderComponent,
    AdHeaderComponent,
    StaffPostListComponent,
    StaffPostDetailComponent,
    CreateOrderComponent,
    SupNegoDetailComponent,
    BuyNegoDetailComponent,
    RegisterComponent,
    SupPostUpdateComponent,
    StaffOrderListComponent,
    SupOrderDetailComponent,
    BuyOrderPaymentComponent,
    BuyNegoCreateComponent,
    TenderListComponent,
    BuyTenderCreateComponent,
    BuyNegoPaymentComponent,
    BuyProfileUpdateComponent,
    TenderDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    appRoutes, HttpModule,
    BrowserAnimationsModule, ToastModule.forRoot(),
    ImageZoomModule, CustomFormsModule, MyDatePickerModule, TextMaskModule,
    DateTimePickerModule, RatingModule, CalendarModule
  ],
  providers: [Constants, LoginService, CatalogService, CommonService, PostService, AdminRoleGuard,
    StaffRoleGuard, SupRoleGuard, BuyRoleGuard, CreateOrderGuard, OrderService, NegoService,
    TenderService, CreateTenderGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
