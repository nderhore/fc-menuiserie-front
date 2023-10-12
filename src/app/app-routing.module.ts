import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AdminDashboardComponent} from "./component/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {component: AdminDashboardComponent,
    path:'admin'},
  {component: HomeComponent,
path:'**',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
