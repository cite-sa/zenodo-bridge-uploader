import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/common/base/base.component';
import { DepositRequestEditorModel } from '../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent extends BaseComponent implements OnInit {

	@Input() form: FormGroup = null;
	@Input() editorModel: DepositRequestEditorModel = null;

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

}
