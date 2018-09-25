import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuiModalService, ModalSize, SuiModal } from 'ng2-semantic-ui';
import { ToastrService } from 'ngx-toastr';
import { Accounts } from '../models/accounts.model';
import { TransactionsService } from '../commons/transactions.service';
import { AccountsEditModal } from './edit/account.edit.modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  listAccounts: Array<Accounts> = [];

  segmentDimmed: Boolean;

  constructor(private accService: AccountsService , private transactionService: TransactionsService,
    public modalService: SuiModalService, private toastr: ToastrService ) { }

  ngOnInit() {
    this.segmentDimmed = true;
    this.getAccountsMaster();
  }

  getAccountsMaster() {
    this.accService.getAccountsMaster().subscribe(res => {
       this.listAccounts = res;
       this.segmentDimmed = false;
    });
  }

  deposit(account_destination_id: Number) {
    const VlrDeposit = prompt('Insira abaixo o valor do deposito', '');

    if ( VlrDeposit != null) {
      this.segmentDimmed = true;
      this.transactionService.postDeposit(account_destination_id , VlrDeposit).subscribe(res => {
        this.toastr.success('Deposito realizado com sucesso', 'Informacao!');
        this.getAccountsMaster();
        this.segmentDimmed = false;
      }, error => {
        this.toastr.error(error.error.Message, 'Informacao!');
        this.segmentDimmed = false;
      });
    }
  }

  editAccount(id: string, name: string , status_id: string) {
    this.modalService
    .open(new AccountsEditModal(name, status_id, ModalSize.Small))
    .onApprove((response: FormGroup) => {
      this.segmentDimmed = true;
      const ret = response.value;
        this.accService.editAccount(id, ret.name , ret.status_id).subscribe(res => {
          this.toastr.success('Conta atualizada com sucesso', 'Informacao!');
          this.getAccountsMaster();
          this.segmentDimmed = false;
        }, error => {
          this.toastr.error(error.error.Message, 'Informacao!');
          this.segmentDimmed = false;
        });
    })
    .onDeny(() => console.log(''));
  }

}
