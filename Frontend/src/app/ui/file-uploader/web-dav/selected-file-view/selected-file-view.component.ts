import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FileItem } from 'src/app/model/web-dav/xml/fileItem.model';

@Component({
	selector: 'app-selected-file-view',
	templateUrl: './selected-file-view.component.html',
	styleUrls: ['./selected-file-view.component.scss']
})
export class SeelctedFileViewComponent implements OnChanges {
	@Input() form: FormArray = null;
	panelOpenState = true;
	selectednames: string[];
	constructor() { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['form']) {
			this.selectednames = [];
			const selectedFiles = this.form.value as any[];
			selectedFiles.forEach(f => {
				this.selectednames.push(f.url);
			});
		}
	}

	// ngOnInit(): void {
	// 	this.fileWebDavUrlService.getWebDavFileUrlsObservable().subscribe(data => {
	// 		this.selectednames = [];
	// 		const selectedFiles = data as FileItem[];
	// 		selectedFiles.forEach(f => {
	// 			let splitHref = f.href.split('/');
	// 			let name = splitHref[splitHref.length - 1];
	// 			name = decodeURIComponent(name);
	// 			this.selectednames.push(name);
	// 		});

	// 	});
	// }

	removeFileUrl(index: number): void {
		this.form.removeAt(index);
		this.selectednames.splice(index, 1);
	}
}
