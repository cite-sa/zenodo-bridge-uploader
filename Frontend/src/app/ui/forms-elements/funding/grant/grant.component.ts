import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SingleAutoCompleteConfiguration } from 'src/app/modules/auto-complete/single/single-auto-complete-configuration';
import { ZenodoApiGrantResponse, ZenodoService } from 'src/app/service/Zenodo-service';


@Component({
	selector: 'app-grant',
	templateUrl: './grant.component.html',
	styleUrls: ['./grant.component.css']
})

export class GrantComponent implements OnInit {

	@Input() control: FormControl;
	@Input() index: number;
	@Output() onDeleteItem: EventEmitter<number> = new EventEmitter<number>();

	initialPublisherItems = (): Observable<ZenodoApiGrantResponse[]> => this.zenodoService.getGrants().pipe(
		map(response => response.hits.hits),
		map(item => {
			const result = [];
			item.forEach(x => result.push({ id: x.id, name: x.metadata.funder.name }));
			return result;
		}
		));

	publisherFilterFn = (searchQuery: string): Observable<ZenodoApiGrantResponse[]> => this.zenodoService.getGrants(searchQuery).pipe(
		map(response => response.hits.hits),
		map(item => {
			const result = [];
			item.forEach(x => result.push({ id: x.id, name: x.metadata.funder.name }));
			return result;
		}
		));

	// tslint:disable-next-line: member-ordering

	publisherAutocompleteConfiguration: SingleAutoCompleteConfiguration = {
		initialItems: this.initialPublisherItems.bind(this),
		filterFn: this.publisherFilterFn.bind(this),
		displayFn: (item: ZenodoApiGrantResponse) => this.getString(item),
		titleFn: (item: ZenodoApiGrantResponse) => this.getString(item)
	};

	getString(item: ZenodoApiGrantResponse) {
		let str = `${item.id}`;
		if (item.name != null ) {
			str = `${str} - ${item.name}`;
		}
		return str;
	}

	constructor(private zenodoService: ZenodoService) {

	}

	ngOnInit(): void {

	}

}
