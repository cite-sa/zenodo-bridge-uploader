import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ZenodoApiCommunityResponse, ZenodoService } from 'src/app/service/Zenodo-service';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-communities',
	templateUrl: './communities.component.html',
	styleUrls: ['./communities.component.css']
})

export class CommunitiesComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	internalControls: FormControl[] = [];

	filteredOptions: Observable<ZenodoApiCommunityResponse[]>[] = [];

	constructor(private zenodoService: ZenodoService) { }

	ngOnInit(): void { }

	deleteCommunity(index: number) {
		this.form.removeAt(index);
	}

	addItem() {
		this.form.push(new FormBuilder().group({ value: [{ value: null, disabled: false }] }));
	}

}
