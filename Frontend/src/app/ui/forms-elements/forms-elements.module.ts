import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from 'src/app/common/common-ui/common-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsElementsComponent } from './forms-elements.component';
import { CommunitiesComponent } from './communities/communities.component';
import { UploadTypeComponent } from './upload-type/upload-type.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { LicenseComponent } from './license/license.component';
import { FundingComponent } from './funding/funding.component';
import { IdentifiersComponent } from './identifiers/identifiers.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { ReferencesComponent } from './references/references.component';
import { JournalComponent } from './journal/journal.component';
import { ConferenceComponent } from './conference/conference.component';
import { BookReportChapterComponent } from './book-report-chapter/book-report-chapter.component';
import { ThesisComponent } from './thesis/thesis.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { CommunityComponent } from './communities/community/community.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AutoCompleteModule } from 'src/app/modules/auto-complete/auto-complete.module';
import { GrantComponent } from './funding/grant/grant.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    AutoCompleteModule
  ],
  declarations: [
    FormsElementsComponent,
    CommunitiesComponent,
    CommunityComponent,
    UploadTypeComponent,
    BasicInformationComponent,
    LicenseComponent,
    FundingComponent,
    GrantComponent,
    IdentifiersComponent,
    ContributorsComponent,
    ReferencesComponent,
    JournalComponent,
    ConferenceComponent,
    BookReportChapterComponent,
    ThesisComponent,
    SubjectsComponent
  ],
  exports: [FormsElementsComponent]

})

export class FormsElementsModule { }
