import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ZenodoApiGrantResponse, ZenodoService } from 'src/app/service/Zenodo-service';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-funding',
	templateUrl: './funding.component.html',
	styleUrls: ['./funding.component.css']
})

export class FundingComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	internalControls: FormControl[] = [];

	filteredOptions: Observable<ZenodoApiGrantResponse[]>[] = [];

	constructor(private zenodoService: ZenodoService) { }

	ngOnInit(): void { }

	deleteGrant(index: number) {
		this.form.removeAt(index);
	}

	addGrant() {
		this.form.push(new FormBuilder().group({ value: [{ value: null, disabled: false }] }));
	}
}
