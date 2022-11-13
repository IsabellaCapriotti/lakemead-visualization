import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevationComponent } from './elevation/elevation.component';
import { ImpactComponent } from './impact/impact.component';

const routes: Routes = [
  { path: '', component: ElevationComponent },
  { path: 'impact', component: ImpactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
