import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrossroadComponent } from './crossroad/crossroad.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from "@angular/forms";
import { VehicleOnRoadComponent } from './crossroad/vehicle-on-road/vehicle-on-road.component';

@NgModule({
  declarations: [
    AppComponent,
    CrossroadComponent,
    SettingsComponent,
    VehicleOnRoadComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
