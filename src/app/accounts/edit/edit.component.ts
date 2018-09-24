import { Component, OnInit } from '@angular/core';
import { SuiModal } from 'ng2-semantic-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../models/status.model';
import { StatusService } from '../../commons/status.service';

interface IEditModalContext {
  name: string;
  status_id: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  ListStatus: Array<Status> = [];

  form: FormGroup;

  constructor(public modal: SuiModal<IEditModalContext, void, void>,
    private formBuilder: FormBuilder, private serviceStatus: StatusService) { }

  ngOnInit() {
    this.getAllAccounts();
    this.form = this.formBuilder.group({
      name: [this.modal.context.name, [ Validators.required ]],
      status_id: [this.modal.context.status_id, [ Validators.required ]]
    });
  }

  getAllAccounts() {
    this.serviceStatus.getAll().subscribe(res => {
      this.ListStatus = res;
    });
  }

}
