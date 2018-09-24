import { Component, OnInit } from '@angular/core';
import { ChildrenService } from './children.service';
import { TransactionsService } from '../commons/transactions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ToastrService } from 'ngx-toastr';
import { Accounts } from '../models/accounts.model';
import { ActivatedRoute } from '@angular/router';
import { TransferenceModal } from './transference/transference.modal';
import { AccountsEditModal } from '../accounts/edit/account.edit.modal';
import { AccountsService } from '../accounts/accounts.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  listAccountsChildren: Array<Accounts> = [];
  AccounParent: Accounts = new Accounts();

  segmentDimmed: Boolean;

  constructor(private ccService: ChildrenService,
     private transactionService: TransactionsService,
     private accountsService: AccountsService,
     private formBuilder: FormBuilder,
     public modalService: SuiModalService,
     private toastr: ToastrService,
     private route: ActivatedRoute ) { }

  ngOnInit() {

    this.segmentDimmed = true;

    this.GetAccountById(this.route.snapshot.params.id);
    this.getAccountsChildren(this.route.snapshot.params.id);
  }

  getAccountsChildren(AccountParentId: any) {
    this.ccService.getAccountsChildren(AccountParentId).subscribe(res => {
       this.listAccountsChildren = res;
       this.segmentDimmed = false;
    });
  }

  GetAccountById(AccountParentId: any) {
    this.ccService.getAccountById(AccountParentId).subscribe(res => {
      this.AccounParent = res;
      this.segmentDimmed = false;
   });
  }

  toBack() {
    window.history.back();
  }

  editAccount(id: string, name: string , status_id: string) {
    this.modalService
    .open(new AccountsEditModal(name, status_id, ModalSize.Small))
    .onApprove((response: FormGroup) => {
      this.segmentDimmed = true;
      const ret = response.value;
        this.accountsService.editAccount(id, ret.name , ret.status_id).subscribe(res => {
          this.toastr.success('Conta atualizada com sucesso', 'Informacao!');
          this.getAccountsChildren(this.route.snapshot.params.id);
          this.segmentDimmed = false;
        }, error => {
          this.toastr.error(error.error.Message, 'Informacao!');
          this.segmentDimmed = false;
        });
    })
    .onDeny(() => console.log(''));
  }

  transferenceAccounts() {
    this.modalService
    .open(new TransferenceModal(ModalSize.Small))
    .onApprove((response: FormGroup) => {
      this.segmentDimmed = true;
      const ret = response.value;

      if (ret.account_destination === null ||
        ret.account_source  === null ||
         ret.money  === null) {
          this.toastr.error('Todos os campos sao obrigatorios', 'Informacao!');
          this.segmentDimmed = false;
      } else {
        this.transactionService.postTransference(ret.account_destination.id , ret.account_source.id, ret.money ).subscribe(res => {
          this.toastr.success('Transferencia realizada com sucesso', 'Informacao!');
          this.getAccountsChildren(this.route.snapshot.params.id);
          this.segmentDimmed = false;
        }, error => {
          this.toastr.error(error.error.Message, 'Informacao!');
          this.segmentDimmed = false;
        });
      }



    })
    .onDeny(() => console.log(''));
  }

  load(account_destination_id: Number) {
    const money = prompt('Insira abaixo o valor da carga', '');

    if ( money != null) {
      this.segmentDimmed = true;
      this.transactionService.postLoad(account_destination_id , money).subscribe(res => {
        this.toastr.success('Carga realizada com sucesso', 'Informacao!');
        this.getAccountsChildren(this.route.snapshot.params.id);
        this.segmentDimmed = false;
      }, error => {
        this.toastr.error(error.error.Message, 'Informacao!');
        this.segmentDimmed = false;
      });
    }
  }

}
