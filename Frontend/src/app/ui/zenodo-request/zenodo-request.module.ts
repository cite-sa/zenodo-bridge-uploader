import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonUiModule } from 'src/app/common/common-ui/common-ui.module';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { FormsElementsModule } from '../forms-elements/forms-elements.module';
import { RequestFormComponent } from './request-form/request-form.component';
import { ZenodoRoutingModule } from './zenodo-request.routing';

@NgModule({
	imports: [
		FormsModule,
		CommonUiModule,
		ReactiveFormsModule,
		NgxDropzoneModule,
		NgxMatFileInputModule,
		TranslateModule,
		ZenodoRoutingModule,
		FileUploaderModule,
		FormsElementsModule
	],
	declarations: [
		RequestFormComponent
	]
})
export class ZenodoRequestModule { }
