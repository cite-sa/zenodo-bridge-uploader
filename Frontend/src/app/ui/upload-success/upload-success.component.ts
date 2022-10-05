import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/common/base/base.component';


@Component({
	selector: 'app-upload-success',
	templateUrl: './upload-success.component.html',
	styleUrls: ['./upload-success.component.scss']
})
export class UploadSuccessComponent extends BaseComponent {

	constructor() {
		super();
	}

}
