import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { SingleAutoCompleteConfiguration } from 'src/app/modules/auto-complete/single/single-auto-complete-configuration';
import { ZenodoApiCommunityResponse, ZenodoService } from 'src/app/service/Zenodo-service';


@Component({
	selector: 'app-community',
	templateUrl: './community.component.html',
	styleUrls: ['./community.component.css']
})

export class CommunityComponent implements OnInit {

	@Input() control: FormControl;
	@Input() index: number;
	@Input() disabled: boolean;
	@Output() onDeleteItem: EventEmitter<number> = new EventEmitter<number>();

	initialPublisherItems = (): Observable<ZenodoApiCommunityResponse[]> => this.zenodoService.getCommunities().pipe(
		map(response => response.hits.hits),
		map(item => {
			const result = [];
			item.forEach(x => result.push({ id: x.id, description: x.description, title: x.title }));
			return result;
		}
		));

	publisherFilterFn = (searchQuery: string): Observable<ZenodoApiCommunityResponse[]> => this.zenodoService.getCommunities(searchQuery).pipe(
		map(response => response.hits.hits),
		map(item => {
			const result = [];
			item.forEach(x => result.push({ id: x.id, description: x.description, title: x.title }));
			return result;
		}
		));

	// tslint:disable-next-line: member-ordering

	publisherAutocompleteConfiguration: SingleAutoCompleteConfiguration = {
		initialItems: this.initialPublisherItems.bind(this),
		filterFn: this.publisherFilterFn.bind(this),
		displayFn: (item: ZenodoApiCommunityResponse) => this.getString(item),
		titleFn: (item: ZenodoApiCommunityResponse) => this.getString(item)
	};

	getString(item: ZenodoApiCommunityResponse) {
		let str = `${item.id}`;
		if (item.title != null && item.title !== '') {
			str = `${str} - ${item.title}`;
		}
		return str;
	}
	constructor(private zenodoService: ZenodoService) {

	}

	ngOnInit(): void {
		if (this.control?.value?.id) {
			this.publisherFilterFn(this.control?.value?.id).subscribe(data => {
				if (data?.length) {
					const d = data.filter(x => x.id === this.control.value.id);
					if (d?.length) {
						this.control.setValue(d[0]);
					}
				}
			})
		}
	}

}
