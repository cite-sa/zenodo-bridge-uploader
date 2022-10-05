import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
  selector: 'app-book-report-chapter',
  templateUrl: './book-report-chapter.component.html',
  styleUrls: ['./book-report-chapter.component.css']
})

export class BookReportChapterComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() panelOpenState: boolean = true;
  @Input() editorModel: DepositRequestEditorModel = null;

  constructor() { }

  ngOnInit(): void { }

}
