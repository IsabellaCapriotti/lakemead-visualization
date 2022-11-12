import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevationComponent } from './elevation/elevation.component';

const routes: Routes = [
  { path: '', component: ElevationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
