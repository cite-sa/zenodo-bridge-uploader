import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonUiModule } from 'src/app/common/common-ui/common-ui.module';
import { MultipleAutoCompleteComponent } from './multiple/multiple-auto-complete.component';
import { SingleAutoCompleteComponent } from './single/single-auto-complete.component';

@NgModule({
	imports: [
		CommonUiModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		SingleAutoCompleteComponent,
		MultipleAutoCompleteComponent
	],
	exports: [
		SingleAutoCompleteComponent,
		MultipleAutoCompleteComponent
	]
})
export class AutoCompleteModule {
	constructor() { }
}
