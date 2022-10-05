# Zenodo Bridge Uploader

Zenodo Upload is tool for users to upload any kind of files and/or fill-in fields about this files.

## How to use it

First of all, users have to take the authorize by clicking in the authorize button and take the permition. After that, they can complete the files with the information of these files or  add a metadata file with the information.(metadata file must be in a json format). 

## Json format of metadata file and what this may contain

* communities : in which communities you want appear the upload and is an array of objects with attributes id
* upload_type : image, publication, poster etc
* publication_type: like book, journal
* image_type: drawing, diagram 
* doi: string and is the digital object identifier
* title: string and is the title of the record
* description: string and is the description about the record
* creators: an array of objects with attributes name, affiliation, orcid
* keywords: list of keywords
* version: string and the version
* language: string and is the main language of record
* notes: string and are the additional notes
* license: if is :access right" is open or "embargoed"
* embargo_date: if access_right is "embargoed"
* access conditions: if access_right is "restricted"
* grants: the funded researchers and it is an array of objects with attributes id
* related_identifiers: an array of objects with attributes identifiers, relation and resource_type 
* contributors: an array of objects with attributes name,type,affiliation and orcid
* references: list of refrences
* journal_title: string
* journal_volume: string
* journal_issue: string
* journal_pages : string	
* conference_title: string
* conference_acronym: string
* conference_dates: string
* conference_place: string	
* conference_url: string
* conference_session: string	
* conference_session_part: string
* imprint_publisher: string Publisher of a book/report/chapter
* imprint_isbn: string ISBN of a book/report
* imprint_place: string		Place of publication of a book/report/chapter in the format city, country.
* partof_title: string	Title of book for chapters
* partof_pages: string Pages numbers of book
* thesis_supervisors:  Supervisors of the thesis
array of objects with attributes name, affiliation and orcid
* thesis_university: string	Awarding university of thesis.
subjects
* array of objects the attributes term,identifier and scheme
* version: string	
* dates: is an array of objects	with attributes start, end and description


## metadata.json example
```Json format
{
	"upload_type": "image",
	"image_type": "diagram",
	"publication_date": "2021-08-13",
	"creators": [
		{
			"name": "Bill",
			"affiliation": "Zenodo"
		}
	],
	"keywords":[
		"Keyword 1", 
		"Keyword 2"
	],
	"related_identifiers":[
		{
			"relation": "isSupplementTo", 
			"identifier":"10.1234/foo"
		}, 
		{
			"relation": "cites", 
			"identifier": "https://doi.org/10.1234/bar", "resource_type": "image-diagram"
		}
	],
	"contributors":[
		{
			"name": "Doe, John", 
			"affiliation": "Zenodo", 
			"type": "Editor" 
		}
	],
	"access_right": "embargoed",
	"license": "zenodo-freetoread-1.0",
	"communities":[
		{
			"identifier": "ecfunded"
		}
	],
	"grants": [
		{
			"id":"283595"
		}
	],
	"subjects": [
		{
			"term": "Astronomy", 
			"identifier": "http://id.loc.gov/authorities/subjects/sh85009003", 
			"scheme": "url"
		}
	],
	"dates": [
		{
			"start": "2018-03-21", 
			"end": "2018-03-25", 
			 "description": "Specimen A5 collection period"
		}
	]			
}
```

## Choices of Upload files

The users can upload files with 3 choices: 

* choose from local files
* add some urls
* login to web dav urls

## POST Endpoint request

Endpoint is actually the /api/deposit/upload/external endpoint. The post request is actually used to add new data to the database. Data format is an object (like a metadata format). If those data enter in the database,  it returns the unique identifier of the data that we just created (redirect url with /id).

## post endpoint data format

* all these objects that metadata.json contains( title,creators etc).
* hidden_fields: list of strings and it means which fields will be available or not.
* read_only_fields: list of strings and it means which fields can be rewrite or not.

## json example
```json
{
"deposit_metadata": {
"title": "test",
"description": "testing",
"upload_type": "image",
"image_type": "diagram",
"publication_date": "2021-08-13",
"creators": [
{
"name": "Bill",
"affiliation": "Zenodo"
}
],
"keywords": [
"keyword1",
"keyword2"
],
"access_right": "embargoed",
"license": "CC-BY-1.0",
"access_conditions": "access_cond",
"embargo_date": "2022-12-02"
},
"file_urls": [],
"web_dav_urls": [
{
"url": "http",
"username": "user",
"password": "1234",
"is_optional": "true"
}
],
"read_only_fields": [
"deposit_metadata.communities",
"deposit_metadata.upload_type"
],
"hidden_fields": []
}
```

## available metadatafields
```json
"upload.metadatajson",
"upload.files.fileurls",
"upload.files.uploader",
"upload.files.webDavConnect",
"deposit_metadata.notes"
"deposit_metadata.title"
"deposit_metadata.description"
"deposit_metadata.communities",

"deposit_metadata.webdav",
"deposit_metadata.doi",

"deposit_metadata.creators",
"deposit_metadata.keywords",
"deposit_metadata.dates",
"deposit_metadata.version",
"deposit_metadata.language",

"deposit_metadata.access_right",
"deposit_metadata.license",
"deposit_metadata.embargo_date",
"deposit_metadata.access_conditions",
"deposit_metadata.grants",
"deposit_metadata.related_identifiers",
"deposit_metadata.contributors",
"deposit_metadata.references",
"deposit_metadata.image_type",
"deposit_metadata.publication_type",
"deposit_metadata.publication_date",
"deposit_metadata.journal_title",
"deposit_metadata.journal_volume",
"deposit_metadata.journal_issue",
"deposit_metadata.journal_pages",
"deposit_metadata.conference_title",
"deposit_metadata.conference_acronym",
"deposit_metadata.conference_dates",
"deposit_metadata.conference_url",
"deposit_metadata.conference_session",
"deposit_metadata.conference_session_part",
"deposit_metadata.imprint_publisher",
"deposit_metadata.imprint_place",
"deposit_metadata.imprint_isbn",
"deposit_metadata.partof_title",
"deposit_metadata.partof_pages",
"deposit_metadata.thesis_university",
"deposit_metadata.thesis_supervisors",
"deposit_metadata.subjects"
```

# License

Licensed under the EUPL-1.2-or-later
