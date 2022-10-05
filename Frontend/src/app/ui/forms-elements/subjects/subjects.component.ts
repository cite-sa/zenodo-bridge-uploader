import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DepositRequestEditorModel, SubjectEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-subjects',
	templateUrl: './subjects.component.html',
	styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	constructor() { }

	ngOnInit(): void { }

	addSubject() {
		this.form.push(new SubjectEditorModel().buildForm(false));
	}

	deleteSubject(subjectIndex: number) {
		this.form.removeAt(subjectIndex);
	}

}
