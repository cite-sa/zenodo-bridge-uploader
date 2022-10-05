import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { dateValidator, endDateValidator } from "src/app/common/custom-validator";
import { Community, Contributor, Creator, DepositRequestModel, Grant, Location, Metadata, RelatedIdentifier, StorageFile, Subject, ThesiSupervisor, WebDavUrl, ZenodoDate } from "src/app/model/zenodo/deposit.request.model";
import { ZenodoApiCommunityResponse, ZenodoApiGrantResponse, ZenodoApiLicenseResponse } from "src/app/service/Zenodo-service";

export function buildStringControl(value: string, disabled: boolean = false, validatorFns: ValidatorFn[] = []): FormControl { return new FormBuilder().control({ value: value, disabled: disabled }, validatorFns); }

export class DepositValidationContext {
	readOnlyFields: string[] = [];
	hiddenFields: string[] = [];

	public shouldDisplay = (key: string): boolean => !this.hiddenFields.includes(key);
	public isDisabled = (key: string): boolean => key == null || !key.length ? false : this.readOnlyFields.includes(key);
}

export class DepositRequestEditorModel implements DepositRequestModel {

	deposit_metadata: MetadataEditorModel = new MetadataEditorModel();
	files: StorageFileEditorModel[];
	file_urls: string[];
	web_dav_urls: WebDavUrlEditorModel[];
	filesToUpload: File[];
	validationContext: DepositValidationContext = new DepositValidationContext();

	private formBuilder: FormBuilder = new FormBuilder();

	public fromModel(item: DepositRequestModel): DepositRequestEditorModel {
		this.validationContext.readOnlyFields = item?.readOnlyFields?.length ? item.readOnlyFields : [];
		this.validationContext.hiddenFields = item?.hiddenFields?.length ? item.hiddenFields : [];
		if (item) {
			this.deposit_metadata = new MetadataEditorModel().fromModel(item.deposit_metadata);
			this.file_urls = item.file_urls;
			//if (item.files) { this.files = item.files.map(x => new StorageFileEditorModel().fromModel(x)); }
			if (item.web_dav_urls) { this.web_dav_urls = item.web_dav_urls.map(x => new WebDavUrlEditorModel().fromModel(x)); }
		}
		return this;
	}

	buildForm(disabled: boolean = false): FormGroup {

		const fileUrlFormArray = new Array<FormControl>();
		if (this.file_urls) { this.file_urls.forEach((element) => fileUrlFormArray.push(buildStringControl(element, disabled, [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]))); }

		const fileFormArray = new Array<FormGroup>();
		if (this.files) { this.files.forEach((element) => fileFormArray.push(element.buildForm(disabled))); }

		const webDavUrlFormArray = new Array<FormGroup>();
		if (this.web_dav_urls) { this.web_dav_urls.forEach((element) => webDavUrlFormArray.push(element.buildForm(disabled))); }

		return new FormBuilder().group({
			deposit_metadata: this.deposit_metadata.buildForm(this.validationContext),
			file_urls: this.formBuilder.array(fileUrlFormArray),
			files: this.formBuilder.array(fileFormArray),
			web_dav_urls: this.formBuilder.array(webDavUrlFormArray),
			filesToUpload: [{ value: [], disabled: disabled }]
		});
	}
}

export class MetadataEditorModel implements Metadata {
	upload_type: string;
	publication_type: string;
	image_type: string;
	publication_date: string;
	title: string;
	creators: CreatorEditorModel[];
	description: string;
	access_right: string;
	license: string;
	access_conditions: string;
	embargo_date: string;
	doi: string;
	prereserve_doi: string;
	keywords: string[];
	notes: string;
	related_identifiers: RelatedIdentifierEditorModel[];
	contributors: ContributorEditorModel[];
	references: string[];
	communitiesHelper: ZenodoApiCommunityResponse[];
	communities: CommunityEditorModel[];
	grants: GrantEditorModel[];
	grantsHelper: ZenodoApiGrantResponse[];
	licenseHelper: ZenodoApiLicenseResponse;
	journal_title: string;
	journal_volume: string;
	journal_issue: string;
	journal_pages: string;
	conference_title: string;
	conference_acronym: string;
	conference_dates: string;
	conference_place: string;
	conference_url: string;
	conference_session: string;
	conference_session_part: string;
	imprint_publisher: string;
	imprint_isbn: string;
	imprint_place: string;
	partof_title: string;
	partof_pages: string;
	thesis_supervisors: ThesiSupervisorEditorModel[];
	thesis_university: string;
	subjects: SubjectEditorModel[];
	version: string;
	language: string;
	locations: LocationEditorModel[];
	dates: ZenodoDateEditorModel[];
	method: string;

	private formBuilder: FormBuilder = new FormBuilder();

	public fromModel(item: Metadata): MetadataEditorModel {
		if (item) {
			this.upload_type = item.upload_type;
			this.publication_type = item.publication_type;
			this.image_type = item.image_type;
			this.publication_date = item.publication_date;
			this.title = item.title;
			this.notes = item.notes;
			this.description = item.description;
			this.access_right = item.access_right;
			this.license = item.license;
			this.access_conditions = item.access_conditions;
			this.embargo_date = item.embargo_date;
			this.doi = item.doi;
			this.prereserve_doi = item.prereserve_doi;
			this.keywords = item.keywords;
			this.references = item.references;
			this.journal_title = item.journal_title;
			this.journal_volume = item.journal_volume;
			this.journal_issue = item.journal_issue;
			this.journal_pages = item.journal_pages;
			this.conference_title = item.conference_title;
			this.conference_acronym = item.conference_acronym;
			this.conference_dates = item.conference_dates;
			this.conference_url = item.conference_url;
			this.conference_place = item.conference_place;
			this.conference_session = item.conference_session;
			this.conference_session_part = item.conference_session_part;
			this.imprint_publisher = item.imprint_publisher;
			this.imprint_isbn = item.imprint_isbn;
			this.imprint_place = item.imprint_place;
			this.partof_title = item.partof_title;
			this.partof_pages = item.partof_pages;
			this.thesis_university = item.thesis_university;
			this.version = item.version;
			this.language = item.language;
			this.method = item.method;
			if (item.creators) { this.creators = item.creators.map(x => new CreatorEditorModel().fromModel(x)) };
			if (item.thesis_supervisors) { this.thesis_supervisors = item.thesis_supervisors.map(x => new ThesiSupervisorEditorModel().fromModel(x)) };
			if (item.subjects) { this.subjects = item.subjects.map(x => new SubjectEditorModel().fromModel(x)) };
			if (item.locations) { this.locations = item.locations.map(x => new LocationEditorModel().fromModel(x)) };
			if (item.dates) { this.dates = item.dates.map(x => new ZenodoDateEditorModel().fromModel(x)) };
			if (item.related_identifiers) { this.related_identifiers = item.related_identifiers.map(x => new RelatedIdentifierEditorModel().fromModel(x)) };
			if (item.contributors) { this.contributors = item.contributors.map(x => new ContributorEditorModel().fromModel(x)) };
			if (item.communities) { this.communitiesHelper = item.communities.map(x => ({ id: x.identifier } as ZenodoApiCommunityResponse)) };
			if (item.grants) { this.grantsHelper = item.grants.map(x => ({ id: x.id } as ZenodoApiGrantResponse)) };
		}
		return this;
	}

	buildForm(validationContext: DepositValidationContext): FormGroup {

		const keywordFormArray = new Array<FormControl>();
		if (this.keywords) { this.keywords.forEach((element) => keywordFormArray.push(buildStringControl(element, validationContext.isDisabled('deposit_metadata.keywords')))); }

		const referenceFormArray = new Array<FormControl>();
		if (this.references) { this.references.forEach((element) => referenceFormArray.push(buildStringControl(element, validationContext.isDisabled('deposit_metadata.references')))); }

		const communitiesFormArray: FormGroup[] = [];
		if (this.communitiesHelper) {
			this.communitiesHelper.forEach((element, index) => {
				communitiesFormArray.push(this.formBuilder.group({
					value: { id: element.id, description: element?.description, title: element?.title }, disabled: validationContext.isDisabled('deposit_metadata.communities')
					//value: [{ value: element, disabled: validationContext.isDisabled( 'deposit_metadata.communities') }]
				}));
			});
		}
		const grantsFormArray: FormGroup[] = [];
		if (this.grantsHelper) {
			this.grantsHelper.forEach((element, index) => {
				grantsFormArray.push(this.formBuilder.group({
					value: { id: element.id, name: element?.metadata?.funder?.name, disabled: validationContext.isDisabled('deposit_metadata.grants') }
				}));
			});
		}

		const relatedIdentifierFormArray = new Array<FormGroup>();
		if (this.related_identifiers) { this.related_identifiers.forEach((element) => relatedIdentifierFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.related_identifiers')))); }

		const creatorFormArray = new Array<FormGroup>();
		if (this.creators) { this.creators.forEach((element) => creatorFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.creators')))); }

		const contributorFormArray = new Array<FormGroup>();
		if (this.contributors) { this.contributors.forEach((element) => contributorFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.contributors')))); }

		const thesisSupervisorFormArray = new Array<FormGroup>();
		if (this.thesis_supervisors) { this.thesis_supervisors.forEach((element) => thesisSupervisorFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.thesis_supervisors')))); }

		const subjectFormArray = new Array<FormGroup>();
		if (this.subjects) { this.subjects.forEach((element) => subjectFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.subjects')))); }

		const locationFormArray = new Array<FormGroup>();
		if (this.locations) { this.locations.forEach((element) => locationFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.locations')))); }

		const dateFormArray = new Array<FormGroup>();
		if (this.dates) { this.dates.forEach((element) => dateFormArray.push(element.buildForm(validationContext.isDisabled('deposit_metadata.dates')))); }

		return this.formBuilder.group({
			upload_type: [{ value: this.upload_type, disabled: validationContext.isDisabled('deposit_metadata.upload_type') }],
			publication_type: [{ value: this.publication_type, disabled: validationContext.isDisabled('deposit_metadata.publication_type') }],
			image_type: [{ value: this.image_type, disabled: validationContext.isDisabled('deposit_metadata.image_type') }],
			publication_date: [{ value: this.publication_date, disabled: validationContext.isDisabled('deposit_metadata.publication_date') }, dateValidator()],
			title: [{ value: this.title, disabled: validationContext.isDisabled('deposit_metadata.title') }, [Validators.minLength(3), Validators.required]],
			description: [{ value: this.description, disabled: validationContext.isDisabled('deposit_metadata.description') }, [Validators.minLength(3), Validators.required]],
			access_right: [{ value: this.access_right, disabled: validationContext.isDisabled('deposit_metadata.access_right') }, Validators.required],
			license: [{ value: this.license, disabled: validationContext.isDisabled('deposit_metadata.license') }, Validators.required],
			access_conditions: [{ value: this.access_conditions, disabled: validationContext.isDisabled('deposit_metadata.access_conditions') }],
			embargo_date: [{ value: this.embargo_date, disabled: validationContext.isDisabled('deposit_metadata.embargo_date') }, dateValidator()],
			doi: [{ value: this.doi, disabled: validationContext.isDisabled('deposit_metadata.doi') }],
			prereserve_doi: [{ value: this.prereserve_doi, disabled: validationContext.isDisabled('deposit_metadata.prereserve_doi') }],
			notes: [{ value: this.notes, disabled: validationContext.isDisabled('deposit_metadata.notes') }],
			journal_title: [{ value: this.journal_title, disabled: validationContext.isDisabled('deposit_metadata.journal_title') }],
			journal_volume: [{ value: this.journal_volume, disabled: validationContext.isDisabled('deposit_metadata.journal_volume') }],
			journal_issue: [{ value: this.journal_issue, disabled: validationContext.isDisabled('deposit_metadata.journal_pages') }],
			journal_pages: [{ value: this.journal_pages, disabled: validationContext.isDisabled('deposit_metadata.doi') }],
			conference_title: [{ value: this.conference_title, disabled: validationContext.isDisabled('deposit_metadata.conference_title') }],
			conference_acronym: [{ value: this.conference_acronym, disabled: validationContext.isDisabled('deposit_metadata.conference_acronym') }],
			conference_dates: [{ value: this.conference_dates, disabled: validationContext.isDisabled('deposit_metadata.conference_dates') }, dateValidator()],
			conference_url: [{ value: this.conference_url, disabled: validationContext.isDisabled('deposit_metadata.conference_url') }],
			conference_place: [{ value: this.conference_place, disabled: validationContext.isDisabled('deposit_metadata.conference_place') }],
			conference_session: [{ value: this.conference_session, disabled: validationContext.isDisabled('deposit_metadata.conference_session') }],
			conference_session_part: [{ value: this.conference_session_part, disabled: validationContext.isDisabled('deposit_metadata.conference_session_part') }],
			imprint_publisher: [{ value: this.imprint_publisher, disabled: validationContext.isDisabled('deposit_metadata.imprint_publisher') }],
			imprint_isbn: [{ value: this.imprint_isbn, disabled: validationContext.isDisabled('deposit_metadata.imprint_isbn') }],
			imprint_place: [{ value: this.imprint_place, disabled: validationContext.isDisabled('deposit_metadata.imprint_place') }],
			partof_title: [{ value: this.partof_title, disabled: validationContext.isDisabled('deposit_metadata.partof_title') }],
			partof_pages: [{ value: this.partof_pages, disabled: validationContext.isDisabled('deposit_metadata.partof_pages') }],
			keywords: this.formBuilder.array(keywordFormArray),
			references: this.formBuilder.array(referenceFormArray),
			communities: this.formBuilder.array(communitiesFormArray),
			grants: this.formBuilder.array(grantsFormArray),
			related_identifiers: this.formBuilder.array(relatedIdentifierFormArray),
			creators: this.formBuilder.array(creatorFormArray),
			contributors: this.formBuilder.array(contributorFormArray),
			thesis_supervisors: this.formBuilder.array(thesisSupervisorFormArray),
			subjects: this.formBuilder.array(subjectFormArray),
			locations: this.formBuilder.array(locationFormArray),
			dates: this.formBuilder.array(dateFormArray),
			thesis_university: [{ value: this.thesis_university, disabled: validationContext.isDisabled('deposit_metadata.thesis_university') }],
			version: [{ value: this.version, disabled: validationContext.isDisabled('deposit_metadata.version') }],
			language: [{ value: this.language, disabled: validationContext.isDisabled('deposit_metadata.language') }],
			method: [{ value: this.method, disabled: validationContext.isDisabled('deposit_metadata.method') }]
		});
	}
}

export class StorageFileEditorModel implements StorageFile {

	fileRef: string;
	name: string;
	mimeType: string;
	data: any;

	public fromModel(item: StorageFile): StorageFileEditorModel {
		if (item) {
			this.fileRef = item.fileRef;
			this.name = item.name;
			this.mimeType = item.mimeType;
			this.data = item.data;
		}
		return this;
	}

	buildForm(disabled: boolean = false): FormGroup {
		return new FormBuilder().group({
			fileRef: [{ value: this.fileRef, disabled: disabled }],
			name: [{ value: this.name, disabled: disabled }],
			mimeType: [{ value: this.mimeType, disabled: disabled }],
			data: [{ value: this.data, disabled: disabled }]
		});
	}

}

export class WebDavUrlEditorModel implements WebDavUrl {
	url: string;
	username: string;
	password: string;

	public fromModel(item: WebDavUrl): WebDavUrlEditorModel {
		this.url = item.url;
		this.username = item.username;
		this.password = item.password;
		return this;
	}

	public buildForm(disabled: boolean = false): FormGroup {
		return new FormBuilder().group({
			url: [{ value: this.url, disabled: disabled }],
			username: [{ value: this.username, disabled: disabled }],
			password: [{ value: this.password, disabled: disabled }]
		});
	}
}

export class CreatorEditorModel implements Creator {
	name: string;
	affiliation: string;
	orcid: string;

	public fromModel(item: Creator): CreatorEditorModel {
		if (item) {
			this.name = item.name;
			this.affiliation = item.affiliation;
			this.orcid = item.orcid;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			name: new FormControl({ value: this.name, disabled: disabled }, [Validators.required]),
			affiliation: new FormControl({ value: this.affiliation, disabled: disabled }, [Validators.required]),
			orcid: new FormControl({ value: this.orcid, disabled: disabled })
		});
	}
}

export class RelatedIdentifierEditorModel implements RelatedIdentifier {
	identifier: string;
	relation: string;
	resource_type: string;

	public fromModel(item: RelatedIdentifier): RelatedIdentifierEditorModel {
		if (item) {
			this.identifier = item.identifier;
			this.relation = item.relation;
			this.resource_type = item.resource_type;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			identifier: new FormControl({ value: this.identifier, disabled: disabled }),
			relation: new FormControl({ value: this.relation, disabled: disabled }),
			resource_type: new FormControl({ value: this.resource_type, disabled: disabled })
		});
	}
}

export class ContributorEditorModel implements Contributor {
	name: string;
	type: string;
	affiliation: string;
	orcid: string;
	gnd: string;

	public fromModel(item: Contributor): ContributorEditorModel {
		if (item) {
			this.name = item.name;
			this.type = item.type;
			this.affiliation = item.affiliation;
			this.orcid = item.orcid;
			this.gnd = item.gnd;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			name: new FormControl({ value: this.name, disabled: disabled }),
			type: new FormControl({ value: this.type, disabled: disabled }),
			affiliation: new FormControl({ value: this.affiliation, disabled: disabled }),
			orcid: new FormControl({ value: this.orcid, disabled: disabled }),
			gnd: new FormControl({ value: this.gnd, disabled: disabled })
		});
	}
}

export class ThesiSupervisorEditorModel implements ThesiSupervisor {
	name: string;
	affiliation: string;
	orcid: string;
	gnd: string;

	public fromModel(item: ThesiSupervisor): ThesiSupervisorEditorModel {
		if (item) {
			this.name = item.name;
			this.affiliation = item.affiliation;
			this.orcid = item.orcid;
			this.gnd = item.gnd;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			name: new FormControl({ value: this.name, disabled: disabled }),
			affiliation: new FormControl({ value: this.affiliation, disabled: disabled }),
			orcid: new FormControl({ value: this.orcid, disabled: disabled }),
			gnd: new FormControl({ value: this.gnd, disabled: disabled })
		});
	}
}

export class SubjectEditorModel implements Subject {
	term: string;
	identifier: string;
	scheme: string;

	public fromModel(item: Subject): SubjectEditorModel {
		if (item) {
			this.term = item.term;
			this.identifier = item.identifier;
			this.scheme = item.scheme;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			term: new FormControl({ value: this.term, disabled: disabled }),
			identifier: new FormControl({ value: this.identifier, disabled: disabled }),
			scheme: new FormControl({ value: this.scheme, disabled: disabled })
		});
	}
}

export class ZenodoDateEditorModel implements ZenodoDate {
	start: Date;
	end: Date;
	description: string;
	maxDate: Date;

	public fromModel(item: ZenodoDate): ZenodoDateEditorModel {
		if (item) {
			this.start = item.start;
			this.end = item.end;
			this.description = item.description;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			start: new FormControl({ value: this.start, disabled: disabled }, dateValidator()),
			end: new FormControl({ value: this.end, disabled: disabled }, dateValidator()),
			description: new FormControl({ value: this.description, disabled: disabled })
		}
			//, { validator: endDateValidator('start', 'end') }
		);
	}

}

export class CommunityEditorModel implements Community {
	identifier: string;

	private formBuilder: FormBuilder = new FormBuilder();

	public fromModel(item: Community): CommunityEditorModel {
		if (item) {
			this.identifier = item.identifier;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return this.formBuilder.group({
			identifier: new FormControl({ value: this.identifier, disabled: disabled })
		})
	}
}

export class GrantEditorModel implements Grant {
	id: string;

	private formBuilder: FormBuilder = new FormBuilder();

	public fromModel(item: Grant): GrantEditorModel {
		if (item) {
			this.id = item.id;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return this.formBuilder.group({
			id: new FormControl({ value: this.id, disabled: disabled })
		})
	}
}

export class LocationEditorModel implements Location {
	lat: number;
	lon: number;
	place: string;
	description: string;

	public fromModel(item: Location): LocationEditorModel {
		if (item) {
			this.lat = item.lat;
			this.lon = item.lon;
			this.place = item.place;
			this.description = item.description;
		}
		return this;
	}

	buildForm(disabled: boolean): FormGroup {
		return new FormBuilder().group({
			lat: new FormControl({ value: this.lat, disabled: disabled }),
			lon: new FormControl({ value: this.lon, disabled: disabled }),
			place: new FormControl({ value: this.place, disabled: disabled }),
			description: new FormControl({ value: this.description, disabled: disabled })
		});
	}
}