import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepositRequestEditorModel } from '../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-forms-elements',
	templateUrl: './forms-elements.component.html',
	styleUrls: ['./forms-elements.component.css']
})

export class FormsElementsComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	constructor() { }

	ngOnInit(): void { }

}
