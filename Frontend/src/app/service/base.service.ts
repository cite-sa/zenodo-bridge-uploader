import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
	template: ''
  })
export abstract class BaseService implements OnDestroy {

	protected _destroyed: Subject<boolean> = new Subject();

	protected constructor() { }

	ngOnDestroy(): void {
		this._destroyed.next(true);
		this._destroyed.complete();
	}
}
