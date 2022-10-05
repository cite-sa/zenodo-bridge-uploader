import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
	selector: 'app-dropzone',
	templateUrl: './dropzone.component.html',
	styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
	@Input() control: FormArray;

	constructor() { }

	ngOnInit(): void {
	}

	onSelect(event) {
		let value = this.control.value as File[];
		value.push(...event.addedFiles);
		this.control.setValue(value);
	}

	onRemove(fileToRemove: File) {
		let value = this.control.value as File[];
		value.splice(value.indexOf(fileToRemove), 1);
		this.control.setValue(value);
	}
}
