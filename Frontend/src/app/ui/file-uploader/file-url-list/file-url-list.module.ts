import { NgModule } from '@angular/core';
import { FileUrlListComponent } from './file-url-list.component';
import { CommonUiModule } from 'src/app/common/common-ui/common-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FileUrlListComponent
  ],
  imports: [
    FormsModule,
    CommonUiModule,
    ReactiveFormsModule
  ],
  exports: [FileUrlListComponent]
})
export class FileUrlListModule { }
