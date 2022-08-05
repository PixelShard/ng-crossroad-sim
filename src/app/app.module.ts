import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrossroadComponent } from './crossroad/crossroad.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CrossroadComponent,
    SettingsComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
