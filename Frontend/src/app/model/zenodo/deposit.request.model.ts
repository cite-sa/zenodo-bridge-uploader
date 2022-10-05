import { ZenodoApiCommunityResponse } from "src/app/service/Zenodo-service";
import { ZenodoApiGrantResponse } from "src/app/service/Zenodo-service";

export interface DepositRequestModel {
	deposit_metadata: Metadata;
	files: StorageFile[];
	file_urls: string[];
	web_dav_urls: WebDavUrl[];
	readOnlyFields?: string[];
	hiddenFields?: string[];
}

export interface Metadata {
	upload_type: string;
	publication_type: string;
	image_type: string;
	publication_date: string;
	title: string;
	creators: Creator[];
	description: string;
	access_right: string;
	license: string;
	access_conditions: string;
	embargo_date: string;
	doi: string;
	prereserve_doi: string;
	keywords: string[];
	notes: string;
	related_identifiers: RelatedIdentifier[];
	contributors: Contributor[];
	references: string[];
	communities: Community[];
	communitiesHelper: ZenodoApiCommunityResponse[];
	grants: Grant[];
	grantsHelper: ZenodoApiGrantResponse[];
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
	thesis_supervisors: ThesiSupervisor[];
	thesis_university: string;
	subjects: Subject[];
	version: string;
	language: string;
	locations: Location[];
	dates: ZenodoDate[];
	method: string;
	readOnlyFields?: string[];
	hiddenFields?: string[];
}

export interface StorageFile {
	fileRef: string;
	name: string;
	mimeType: string;
	data: any;
}

export interface WebDavUrl {
	url: string;
	username: string;
	password: string;
}

export interface Creator {
	name: string;
	affiliation: string;
	orcid: string;
}

export interface RelatedIdentifier {
	identifier: string;
	relation: string;
	resource_type: string;
}

export interface Contributor {
	name: string;
	type: string;
	affiliation: string;
	orcid: string;
	gnd: string;
}

export interface ThesiSupervisor {
	name: string;
	affiliation: string;
	orcid: string;
	gnd: string;
}

export interface Subject {
	term: string;
	identifier: string;
	scheme: string;
}

export interface ZenodoDate {
	start: Date;
	end: Date;
	description: string;
}

export interface Community {
	identifier: string;
}

export interface Grant {
	id: string;
}

export interface Location {
	lat: number;
	lon: number;
	place: string;
	description: string;
}