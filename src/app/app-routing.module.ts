import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'home' },
  { path: '', loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
