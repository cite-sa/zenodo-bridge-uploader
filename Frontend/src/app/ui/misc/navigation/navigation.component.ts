import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/common/base/base.component';
import { ConfigurationService } from 'src/app/service/configuration/configurationService';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NavigationComponent extends BaseComponent implements OnInit {
	progressIndication = false;

	constructor(
		public router: Router,
		public installationConfigurationService: ConfigurationService,
		// private progressIndicationService: ProgressIndicationService,
	) {
		super();
	}

	ngOnInit() {
		// this.progressIndicationService.getProgressIndicationObservable().pipe(takeUntil(this._destroyed)).subscribe(x => {
		// 	setTimeout(() => { this.progressIndication = x; });
		// });
	}

	goToExternalLink(url): void {
		window.open(url, '_blank');
	}
}
