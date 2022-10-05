import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2DialogComponent } from './oauth2-dialog.component';



@NgModule({
  declarations: [
    Oauth2DialogComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[Oauth2DialogComponent]
})
export class Oauth2DialogModule { }
