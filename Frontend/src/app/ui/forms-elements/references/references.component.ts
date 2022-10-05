import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-references',
	templateUrl: './references.component.html',
	styleUrls: ['./references.component.css']
})

export class ReferencesComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	constructor() { }

	ngOnInit(): void {
	}

	addReference() {
		this.form.push(new FormControl(""));
	}

	deleteReference(referenceIndex: number) {
		this.form.removeAt(referenceIndex);
	}

}
