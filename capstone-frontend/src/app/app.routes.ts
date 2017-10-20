import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./components/user/header/header.component";
import {HomeComponent} from "./components/user/home/home.component";

const routing: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
    ]
  }
];

export const appRoutes = RouterModule.forRoot(routing);
