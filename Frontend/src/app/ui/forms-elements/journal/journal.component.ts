import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})

export class JournalComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() panelOpenState: boolean = true;
  @Input() editorModel: DepositRequestEditorModel = null;

  constructor() { }

  ngOnInit(): void { }

}
