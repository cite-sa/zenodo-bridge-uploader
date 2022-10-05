import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
  selector: 'app-upload-type',
  templateUrl: './upload-type.component.html',
  styleUrls: ['./upload-type.component.css']
})

export class UploadTypeComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() panelOpenState: boolean = true;
  @Input() editorModel: DepositRequestEditorModel = null;

  uploadTypesList: any[] = [
    { title: 'Publication', value: 'publication' },
    { title: 'Poster', value: 'poster' },
    { title: 'Presentation', value: 'presentation' },
    { title: 'Dataset', value: 'dataset' },
    { title: 'Image', value: 'image' },
    { title: 'Video/Audio', value: 'video' },
    { title: 'Software', value: 'software' },
    { title: 'Lesson', value: 'lesson' },
    { title: 'Physical Object', value: 'physicalobject' },
    { title: 'Other', value: 'other' }
  ];

  publicationTypesList: any[] = [
    { title: 'Annotation collection', value: 'annotationcollection' },
    { title: 'Book', value: 'book' },
    { title: 'Book section', value: 'section' },
    { title: 'Conference paper', value: 'conferencepaper' },
    { title: 'Data management plan', value: 'datamanagementplan' },
    { title: 'Journal article', value: 'article' },
    { title: 'Patent', value: 'patent' },
    { title: 'Preprint', value: 'preprint' },
    { title: 'Project deliverable', value: 'deliverable' },
    { title: 'Project milestone', value: 'milestone' },
    { title: 'Proposal', value: 'proposal' },
    { title: 'Report', value: 'report' },
    { title: 'Preprint', value: 'preprint' },
    { title: 'Software documentation', value: 'softwaredocumentation' },
    { title: 'Taxonomic treatment', value: 'taxonomictreatment' },
    { title: 'Technical note', value: 'technicalnote' },
    { title: 'Thesis', value: 'thesis' },
    { title: 'Working paper', value: 'workingpaper' },
    { title: 'Other', value: 'other' }
  ];

  imageTypesList: any[] = [
    { title: 'Figure', value: 'figure' },
    { title: 'Plot', value: 'plot' },
    { title: 'Drawing', value: 'drawing' },
    { title: 'Diagram', value: 'diagram' },
    { title: 'Photo', value: 'photo' },
    { title: 'Other', value: 'other' }
  ];

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
