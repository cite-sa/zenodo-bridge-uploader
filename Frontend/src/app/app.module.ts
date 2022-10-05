import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonUiModule } from './common/common-ui/common-ui.module';
import { CoreServiceModule } from './common/core-service.module';
import { NavigationComponent } from './ui/misc/navigation/navigation.component';
import { NotificationModule } from './ui/notification/notification.module';
import { UploadSuccessComponent } from './ui/upload-success/upload-success.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		UploadSuccessComponent,
		NavigationComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		CommonUiModule,
		CoreServiceModule.forRoot(),
		HttpClientModule,
		NotificationModule,
		BrowserAnimationsModule,
		NotificationModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }

