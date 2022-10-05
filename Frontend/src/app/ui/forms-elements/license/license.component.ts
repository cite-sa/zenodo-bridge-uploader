import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SingleAutoCompleteConfiguration } from 'src/app/modules/auto-complete/single/single-auto-complete-configuration';
import { ZenodoApiLicenseResponse, ZenodoService } from 'src/app/service/Zenodo-service';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-license',
	templateUrl: './license.component.html',
	styleUrls: ['./license.component.css']
})

export class LicenseComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	accessRightSelectes: string;
	accessRightsList: string[] = [
		'open',
		'embargoed',
		'restricted',
		'closed Access'
	];

	constructor(private zenodoService: ZenodoService) { }

	ngOnInit(): void { }

	initialPublisherItems = (): Observable<ZenodoApiLicenseResponse[]> => this.zenodoService.getLicenses().pipe(
		map(response => response.hits.hits),
		map(item => {
			const result = [];
			item.forEach(x => result.push(x.id));
			return result;
		}
		));

	publisherFilterFn = (searchQuery: string): Observable<ZenodoApiLicenseResponse[]> => this.zenodoService.getLicenses(searchQuery).pipe(
		map(response => response.hits.hits),
		map(item => {
			const result = [];
			item.forEach(x => result.push(x.id));
			return result;
		}
		));

	publisherAutocompleteConfiguration: SingleAutoCompleteConfiguration = {
		initialItems: this.initialPublisherItems.bind(this),
		filterFn: this.publisherFilterFn.bind(this),
		displayFn: (item: ZenodoApiLicenseResponse) => this.getString(item),
		titleFn: (item: ZenodoApiLicenseResponse) => this.getString(item)
	};

	getString(item: ZenodoApiLicenseResponse) {
		let str = `${item}`;
		if (item.id != null) {
			str = `${item.id}`;
		}
		return str;
	}

}
