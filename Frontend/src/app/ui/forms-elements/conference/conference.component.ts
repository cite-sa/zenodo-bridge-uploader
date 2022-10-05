import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepositRequestEditorModel } from '../../zenodo-request/request-form/request-form-editor.model';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})

export class ConferenceComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() panelOpenState: boolean = true;
  @Input() editorModel: DepositRequestEditorModel = null;

  constructor() { }

  ngOnInit(): void { }
}
