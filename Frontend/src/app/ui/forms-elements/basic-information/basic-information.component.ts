import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CreatorEditorModel, DepositRequestEditorModel, ZenodoDateEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-basic-information',
	templateUrl: './basic-information.component.html',
	styleUrls: ['./basic-information.component.css']
})

export class BasicInformationComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;
	maxDate: Date;
	startDate: Date;

	constructor() { }

	ngOnInit(): void {
		this.maxDate = new Date();
	}

	addCreator() {
		(this.form.get('creators') as FormArray).push(new CreatorEditorModel().buildForm(false));
	}

	deleteCreator(index: number) {
		(this.form.get('creators') as FormArray).removeAt(index);
	}

	addDate() {
		(this.form.get('dates') as FormArray).push(new ZenodoDateEditorModel().buildForm(false));
	}

	deleteDate(index: number) {
		(this.form.get('dates') as FormArray).removeAt(index);
	}

	addKeyword() {
		(this.form.get('keywords') as FormArray).push(new FormControl(""));
	}

	deleteKeyword(index: number) {
		(this.form.get('keywords') as FormArray).removeAt(index);
	}
}
