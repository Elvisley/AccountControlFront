import { Component, OnInit } from '@angular/core';
import {SuiModal, ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';

import { AccountsService } from '../../accounts/accounts.service';
import { Accounts } from '../../models/accounts.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from '../children.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-transference',
  templateUrl: './transference.component.html',
  styleUrls: ['./transference.component.css']
})

export class TransferenceComponent implements OnInit {

  ListAccounts: Array<Accounts> = [];

  segmentDimmed: Boolean;

  form: FormGroup;

  constructor(public modal: SuiModal<void, void, void>
    , private service: AccountsService, private route: ActivatedRoute,
    private ccservice: ChildrenService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      account_source: [null, [ Validators.required ]],
      account_destination: [null, [ Validators.required ]],
      money: [null, [ Validators.required ]]
    });

    this.segmentDimmed = true;
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.service.getAll().subscribe(res => {
      this.ListAccounts = res;
      this.segmentDimmed = false;
    });
  }

}
