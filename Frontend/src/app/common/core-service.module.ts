import { HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../service/auth/auth.service";
import { Oauth2DialogService } from "../service/auth/oauth2-dialog.service";
import { ConfigurationService } from "../service/configuration/configurationService";
import { ErrorService } from "../service/errors/error.service";
import { FileService } from "../service/files/file-service";
import { FormUtilsService } from "../service/helpers/form.utils.service";
import { MessageService } from "../service/helpers/message.service";
import { UiNotificationService } from "../service/notification/ui-notification-service";
import { FileViewManagerService } from "../service/web-dav/file-view-manager.service";
import { RemoteAccessService } from "../service/web-dav/remote-access.service";
import { ZenodoService } from "../service/Zenodo-service";

export function ConfigurationFactory(appConfig: ConfigurationService) {
    return () => appConfig.loadConfiguration();
}

@NgModule({

})
export class CoreServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreServiceModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(): ModuleWithProviders<CoreServiceModule> {
        return {
            ngModule: CoreServiceModule,
            providers: [
                FormBuilder,
                HttpClientModule,
                FileService,
                ZenodoService,
                Oauth2DialogService,
                AuthService,
                UiNotificationService,
                ErrorService,
                MessageService,
                FormUtilsService,
                ConfigurationService,
                RemoteAccessService,
                FileViewManagerService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: ConfigurationFactory,
                    deps: [ConfigurationService, HttpClient],
                    multi: true
                }
            ]

        };
    }
}