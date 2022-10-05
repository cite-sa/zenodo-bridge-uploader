import { FocusMonitor } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, DoCheck, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/common/base/base.component';
import { AutoCompleteGroup } from '../auto-complete-group';
import { SingleAutoCompleteConfiguration } from './single-auto-complete-configuration';

export class CustomComponentBase extends BaseComponent {
	constructor(
		public _defaultErrorStateMatcher: ErrorStateMatcher,
		public _parentForm: NgForm,
		public _parentFormGroup: FormGroupDirective,
		public ngControl: NgControl
	) { super(); }
}
export const _CustomComponentMixinBase = mixinErrorState(CustomComponentBase);

@Component({
	selector: 'app-single-auto-complete',
	templateUrl: './single-auto-complete.component.html',
	styleUrls: ['./single-auto-complete.component.scss'],
	providers: [{ provide: MatFormFieldControl, useExisting: SingleAutoCompleteComponent }],
})
export class SingleAutoCompleteComponent extends _CustomComponentMixinBase implements OnInit, MatFormFieldControl<string>, ControlValueAccessor, OnDestroy, DoCheck {

	static nextId = 0;
	errorState: boolean;
	errorStateMatcher: ErrorStateMatcher;
	@ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;

	@Input() configuration: SingleAutoCompleteConfiguration;
	// Selected Option Event
	@Output() optionSelected: EventEmitter<any> = new EventEmitter();

	id = `single-autocomplete-${SingleAutoCompleteComponent.nextId++}`;
	stateChanges = new Subject<void>();
	focused = false;
	controlType = 'single-autocomplete';
	describedBy = '';
	_inputValue: string;
	_inputSubject = new Subject<string>();
	loading = false;
	_items: Observable<any[]>;
	_items1: any[];
	_arrow_items: Observable<any[]>;
	_groupedItems: Observable<AutoCompleteGroup[]>;
	private requestDelay = 200; //ms
	private minFilteringChars = 0;
	private loadDataOnStart = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];

	get empty() {
		return !this._inputValue || this._inputValue.length === 0;
	}

	get shouldLabelFloat() { return this.focused || !this.empty; }

	@Input()
	get placeholder() { return this._placeholder; }
	set placeholder(placeholder) {
		this._placeholder = placeholder;
		this.stateChanges.next();
	}
	private _placeholder: string;

	@Input()
	get required() { return this._required; }
	set required(req) {
		this._required = !!(req);
		this.stateChanges.next();
	}
	private _required = false;

	@Input()
	get disabled() { return this._disabled; }
	set disabled(dis) {
		this._disabled = !!(dis);
		this.stateChanges.next();
	}
	private _disabled = false;

	@Input()
	get value(): any | null {
		return this._selectedValue;
	}
	set value(value: any | null) {
		this._selectedValue = value;
		this._inputValue = (value && value !== '') ? ' ' : '';
		this.stateChanges.next();
	}
	private _selectedValue;

	constructor(
		private fm: FocusMonitor,
		private elRef: ElementRef,
		@Optional() @Self() public ngControl: NgControl,
		@Optional() _parentForm: NgForm,
		@Optional() _parentFormGroup: FormGroupDirective,
		_defaultErrorStateMatcher: ErrorStateMatcher
	) {
		super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

		fm.monitor(elRef.nativeElement, true).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
			//this.focused = !!origin;
			this.stateChanges.next();
		});

		if (this.ngControl != null) {
			// Setting the value accessor directly (instead of using
			// the providers) to avoid running into a circular import.
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnInit() { }

	ngDoCheck(): void {
		if (this.ngControl) {
			this.updateErrorState();
		}
	}

	filter(query: string): Observable<any[]> {
		// If loadDataOnStart is enabled and query is empty we return the initial items.
		if (this.isNullOrEmpty(query) && this.loadDataOnStart) {
			return this.configuration.initialItems(this.configuration.extraData) || observableOf([]);
		} else if (query && query.length >= this.minFilteringChars) {
			if (this.configuration.filterFn) {
				return this.configuration.filterFn(query, this.configuration.extraData);
			} else {
				return this.configuration.initialItems(this.configuration.extraData) || observableOf([]);
			}
		} else {
			return observableOf([]);
		}
	}

	isNullOrEmpty = (query: string): boolean => typeof query !== 'string' || query === null || query.length === 0;
	_displayFn = (item: any): string => this.configuration.displayFn && item ? this.configuration.displayFn(item) : item;
	_titleFn = (item: any): string => this.configuration.titleFn && item ? this.configuration.titleFn(item) : item;
	_optionTemplate = (item: any): TemplateRef<any> => this.configuration.optionTemplate && item ? this.configuration.optionTemplate : null;
	_selectedValueTemplate = (item: any): TemplateRef<any> => this.configuration.selectedValueTemplate && item ? this.configuration.selectedValueTemplate : null;
	_subtitleFn = (item: any): string => this.configuration.subtitleFn && item ? this.configuration.subtitleFn(item) : null;
	_requestDelay = (): number => this.configuration.requestDelay || this.requestDelay;
	_minFilteringChars = (): number => this.configuration.minFilteringChars || this.minFilteringChars;
	_loadDataOnStart = (): boolean => this.configuration.loadDataOnStart || this.loadDataOnStart;

	_optionSelected(event: MatAutocompleteSelectedEvent) {
		this._setValue(this.configuration.valueAssign ? this.configuration.valueAssign(event.option.value) : event.option.value);
		//this._inputValue = " ";
		this.stateChanges.next();
		this.optionSelected.emit(event.option.value);
	}

	private _setValue(value: any) {
		this.value = value;
		this.pushChanges(this.value);
	}

	_onInputFocus() {
		// We set the items observable on focus to avoid the request being executed on component load.
		if (!this._items) {
			this._items = this._inputSubject.pipe(
				tap(() => this.loading = true),
				startWith(null),
				debounceTime(this.requestDelay),
				distinctUntilChanged(),
				mergeMap(query => this.filter(query)),
				tap(() => this.loading = false));

			if (this.configuration.groupingFn) { this._groupedItems = this._items.pipe(map(items => this.configuration.groupingFn(items))); }
		}
	}

	_onArrowClickedFocus() {
		if (this.disabled) { return; }
		this.chipRemove();
		this._onInputFocus();
		setTimeout(() => {
			if (!this.autocomplete.panelOpen) {
				this.autocomplete.openPanel();
				this._inputValueChange(null);
			}
		}, 0);
	}

	_inputValueChange(value: string) {
		this._inputValue = value;
		this._inputSubject.next(value);
		this.stateChanges.next();
	}

	onChange = (_: any) => { };
	private _onTouched = () => { };
	writeValue(value: any): void { this.value = value || ''; }
	pushChanges(value: any) { this.onChange(value); }
	registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
	registerOnTouched(fn: () => {}): void { this._onTouched = fn; }
	setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
	autoCompleteDisplayFn = () => (val) => '';

	setDescribedByIds(ids: string[]) {
		this.describedBy = ids.join(' ');
	}

	onContainerClick(event: MouseEvent) {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			this.elRef.nativeElement.querySelector('input').focus();
		}
	}

	chipRemove(): void {
		this._setValue(null);
		this._inputValueChange(null);
	}

	ngOnDestroy() {
		this.stateChanges.complete();
		this.fm.stopMonitoring(this.elRef.nativeElement);
	}
}
