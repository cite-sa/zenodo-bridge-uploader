import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { RelatedIdentifier } from 'src/app/model/zenodo/deposit.request.model';
import { DepositRequestEditorModel, RelatedIdentifierEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
	selector: 'app-identifiers',
	templateUrl: './identifiers.component.html',
	styleUrls: ['./identifiers.component.css']
})

export class IdentifiersComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	selectedValues: string[];

	relationList: any[] = [
		{ title: 'cities this upload', value: 'cites' },
		{ title: 'is cited by this upload', value: 'isCitedBy' },
		{ title: 'is a supplement to this upload', value: 'isSupplementTo' },
		{ title: 'is supplemented by this upload', value: 'isSupplementedBy' },
		{ title: 'is a continued by this upload', value: 'isContinuedBy' },
		{ title: 'continues this upload', value: 'continues' },
		{ title: 'describes this upload', value: 'describes' },
		{ title: 'is described by this upload', value: 'isDescribedBy' },
		{ title: 'is Metadata for this upload', value: 'isMetadataFor' },
		{ title: 'is a new version of this upload', value: 'isNewVersionOf' },
		{ title: 'is a previous version of this upload', value: 'isPreviousVersionOf' },
		{ title: 'is a part of this upload', value: 'isPartOf' },
		{ title: 'has a part to this upload', value: 'hasPart' },
		{ title: 'is referenced by this upload', value: 'isReferencedBy' },
		{ title: 'references to this upload', value: 'references' },
		{ title: 'is documented by this upload', value: 'isDocumentedBy' },
		{ title: 'documents to this upload', value: 'documents' },
		{ title: 'is compiled by this upload', value: 'isCompiledBy' },
		{ title: 'compiles to this upload', value: 'compiles' },
		{ title: 'is a variant form of this upload', value: 'isVariantFormOf' },
		{ title: 'is a original form of this upload', value: 'isOriginalFormof' },
		{ title: 'is an identical to this upload', value: 'isIdenticalTo' },
		{ title: 'is an alternate identifier to this upload', value: 'isAlternateIdentifier' },
		{ title: 'is reviewed by this upload', value: 'isReviewedBy' },
		{ title: 'reviews to this upload', value: 'reviews' },
		{ title: 'is derived from this upload', value: 'isDerivedFrom' },
		{ title: 'is a source of this upload', value: 'isSourceOf' },
		{ title: 'requires to this upload', value: 'requires' },
		{ title: 'is required by this upload', value: 'isRequiredBy' },
		{ title: 'obsoletes to this upload', value: 'obsoletes' },
		{ title: 'is obsoleted by this upload', value: 'isObsoletedBy' }
	];

	resourceTypeList: any[] = [
		{ title: 'Publication', value: 'publication' },
		{ title: 'Poster', value: 'poster' },
		{ title: 'Presentation', value: 'presentation' },
		{ title: 'Dataset', value: 'dataset' },
		{ title: 'Image', value: 'image' },
		{ title: 'Video/Audio', value: 'video' },
		{ title: 'Software', value: 'software' },
		{ title: 'Lesson', value: 'lesson' },
		{ title: 'Physical Object', value: 'physicalobject' },
		{ title: 'Other', value: 'other' },
		{ title: 'Annotation collection', value: 'annotationcollection' },
		{ title: 'Book', value: 'book' },
		{ title: 'Book section', value: 'section' },
		{ title: 'Conference paper', value: 'conferencepaper' },
		{ title: 'Data management plan', value: 'datamanagementplan' },
		{ title: 'Journal article', value: 'article' },
		{ title: 'Patent', value: 'patent' },
		{ title: 'Preprint', value: 'preprint' },
		{ title: 'Project deliverable', value: 'deliverable' },
		{ title: 'Project milestone', value: 'milestone' },
		{ title: 'Proposal', value: 'proposal' },
		{ title: 'Report', value: 'report' },
		{ title: 'Preprint', value: 'preprint' },
		{ title: 'Software documentation', value: 'softwaredocumentation' },
		{ title: 'Taxonomic treatment', value: 'taxonomictreatment' },
		{ title: 'Technical note', value: 'technicalnote' },
		{ title: 'Thesis', value: 'thesis' },
		{ title: 'Working paper', value: 'workingpaper' },
		{ title: 'Other', value: 'other' },
		{ title: 'Figure', value: 'figure' },
		{ title: 'Plot', value: 'plot' },
		{ title: 'Drawing', value: 'drawing' },
		{ title: 'Diagram', value: 'diagram' },
		{ title: 'Photo', value: 'photo' },
		{ title: 'Other', value: 'other' }
	];

	constructor() { }

	ngOnInit(): void { }

	addIdentifier() {
		this.form.push(new RelatedIdentifierEditorModel().buildForm(false));
	}

	deleteIdentifier(identifierIndex: number) {
		this.form.removeAt(identifierIndex);
	}

}
