import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DepositRequestEditorModel, ThesiSupervisorEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-thesis',
	templateUrl: './thesis.component.html',
	styleUrls: ['./thesis.component.css']
})

export class ThesisComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	constructor() { }

	ngOnInit(): void { }

	addThesisSupervisor() {
		(this.form.get('thesis_supervisors') as FormArray).push(new ThesiSupervisorEditorModel().buildForm(false));
	}

	deleteThesisSupervisor(thesis_supervisors_index: number) {
		(this.form.get('thesis_supervisors') as FormArray).removeAt(thesis_supervisors_index);
	}
}
