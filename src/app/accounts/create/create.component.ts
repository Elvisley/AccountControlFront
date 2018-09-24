import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../person/person.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SuiModalService } from 'ng2-semantic-ui';
import { AccountsService } from '../accounts.service';
import { StatusService } from '../../commons/status.service';
import { Status } from '../../models/status.model';
import { PersonPhysical } from '../../models/personphysical.model';
import { PersonLegal } from '../../models/personlegal.model';
import { Accounts } from '../../models/accounts.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  segmentDimmed: Boolean;

  checkedAccountMaster: boolean;

  listStatus: Array<Status> = [];

  ListPersonPhysical: Array<PersonPhysical> = [];
  ListPersonLegal: Array<PersonLegal> = [];
  listAccounts: Array<Accounts> = [];

  constructor(private personService: PersonService,
      private accountService: AccountsService,
      private statusService: StatusService,
      private router: Router, private formBuilder: FormBuilder,
    public modalService: SuiModalService, private toastr: ToastrService ) { }

  ngOnInit() {

    this.getAllStatus();



    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [ Validators.required ]],
      money: [null],
      master: [true, [ Validators.required ]],
      person_type: [null],
      person_id: [null, [ Validators.required ]],
      status_id: [null, [ Validators.required ]],
      account_parent_id: [null]
    });
  }

  getAllAccounts() {
    this.segmentDimmed = true;
    this.accountService.getAll().subscribe(res => {
      this.listAccounts = res;
      this.segmentDimmed = false;
    });
  }

  getAllPersonLegal() {
    this.personService.getAllPersonLegal().subscribe(res => {
      this.ListPersonLegal = res;
      this.segmentDimmed = false;
    });
  }

  getAllPersonPhysical() {
    this.personService.getAllPersonPhysical().subscribe(res => {
      this.ListPersonPhysical = res;
      this.segmentDimmed = false;
    });
  }

  getAllStatus() {
    this.statusService.getAll().subscribe(res => {
      this.listStatus = res;
    });
  }

  checkedAccountMasterAction() {

    if ( this.form.value.master === false) {
      this.getAllAccounts();
    } else {
      this.form.get('account_parent_id').setValue(null);
      this.listAccounts = [];
    }
  }

  changeClient() {
    if ( this.form.value.person_type === 1) {
      this.getAllPersonPhysical();
      this.ListPersonLegal = [];
    } else {
      this.getAllPersonLegal();
      this.ListPersonPhysical = [];
    }
  }

  save() {
    this.segmentDimmed = true;
    this.accountService.postAccount(this.form.value).subscribe(res => {
      this.toastr.success('Conta cadastrada com sucesso', 'Informacao!');
      this.form.reset();
      this.segmentDimmed = false;
    }, error => {
      this.toastr.error(error.error.Message, 'Informacao!');
      this.segmentDimmed = false;
    });
  }

}


