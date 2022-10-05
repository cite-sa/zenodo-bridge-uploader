import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ContributorEditorModel, DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';
import { Contributor } from 'src/app/model/zenodo/deposit.request.model';

@Component({
	selector: 'app-contributors',
	templateUrl: './contributors.component.html',
	styleUrls: ['./contributors.component.css']
})

export class ContributorsComponent implements OnInit {

	@Input() form: FormArray;
	@Input() panelOpenState: boolean = true;
	@Input() editorModel: DepositRequestEditorModel = null;

	selectedValues: string[]
	typeList: any[] = [
		{ title: 'Contact Person', value: 'ContactPerson' },
		{ title: 'Data Collector', value: 'DataCollector' },
		{ title: 'Data Curator', value: 'DataCurator' },
		{ title: 'Data Manager', value: 'DataManager' },
		{ title: 'Distributor', value: 'Distributor' },
		{ title: 'Editor', value: 'Editor' },
		{ title: 'Funder', value: 'Funder' },
		{ title: 'Hosting Institution', value: 'HostingInstitution' },
		{ title: 'Producer', value: 'Producer' },
		{ title: 'Project Leader', value: 'ProjectLeader' },
		{ title: 'Project Manager', value: 'ProjectManager' },
		{ title: 'Project Member', value: 'ProjectMember' },
		{ title: 'Registration Agency', value: 'RegistrationAgency' },
		{ title: 'Registration Authority', value: 'RegistrationAuthority' },
		{ title: 'Related Person', value: 'RelatedPerson' },
		{ title: 'Researcher', value: 'Researcher' },
		{ title: 'Research Group', value: 'ResearchGroup' },
		{ title: 'Rights Holder', value: 'RightsHolder' },
		{ title: 'Supervisor', value: 'Supervisor' },
		{ title: 'Sponsor', value: 'Sponsor' },
		{ title: 'Work Package Leader', value: 'WorkPackageLeader' },
		{ title: 'Other', value: 'Other' }
	];

	constructor() { }

	ngOnInit(): void { }

	addContributor() {
		this.form.push(new ContributorEditorModel().buildForm(false));
	}

	deleteContibutor(contributorIndex: number) {
		this.form.removeAt(contributorIndex);
	}

}
