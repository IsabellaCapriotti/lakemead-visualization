import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material imports */ 
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';

/* Internal components */
import { ElevationComponent } from './elevation/elevation.component';
import { ImpactComponent } from './impact/impact.component';

@NgModule({
  declarations: [
    AppComponent,
    ElevationComponent,
    ImpactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatSidenavModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
