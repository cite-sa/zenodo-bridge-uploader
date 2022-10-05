import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/common/common-ui/material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [],
  exports:[
    CommonModule,
    MaterialModule,
    TranslateModule
  ]
})
export class CommonUiModule { }
