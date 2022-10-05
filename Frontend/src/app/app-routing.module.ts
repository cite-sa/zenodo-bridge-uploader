import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Oauth2DialogComponent } from './ui/oauth2-dialog/oauth2-dialog.component';
import { UploadSuccessComponent } from './ui/upload-success/upload-success.component';


const routes: Routes = [
	{ path: 'login/external/zenodo', component: Oauth2DialogComponent },
	{ path: 'oauth2', component: Oauth2DialogComponent },
	{ path: 'upload-success', component: UploadSuccessComponent },
	{
		path: '',
		loadChildren: () => import('./ui/zenodo-request/zenodo-request.module').then(m => m.ZenodoRequestModule)
	},
	{
		path: ':id',
		loadChildren: () => import('./ui/zenodo-request/zenodo-request.module').then(m => m.ZenodoRequestModule)
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
