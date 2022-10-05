import { NgModule } from '@angular/core';
import { CommonUiModule } from 'src/app/common/common-ui/common-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploaderComponent } from './file-uploader.component';
import { DropzoneComponent } from './dropzone/dropzone.component';

import { FileUrlListModule } from './file-url-list/file-url-list.module';
import { WebDavComponent } from './web-dav/web-dav.component';
import { SeelctedFileViewComponent } from './web-dav/selected-file-view/selected-file-view.component';
import { WebDavLoginDialogComponent } from './web-dav/web-dav-login-dialog/web-dav-login-dialog.component';



@NgModule({
  declarations: [
    FileUploaderComponent, 
    DropzoneComponent, 
    WebDavComponent, 
    SeelctedFileViewComponent, 
    WebDavLoginDialogComponent
  ],
  imports: [
    CommonUiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    FileUrlListModule
  ],
  exports: [FileUploaderComponent]
})
export class FileUploaderModule { }
