import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionsService } from '../commons/transactions.service';
import { FormBuilder } from '@angular/forms';
import { SuiModalService } from 'ng2-semantic-ui';
import { ToastrService } from 'ngx-toastr';
import { Transactions } from '../models/transactions.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  listTransactions: Array<Transactions> = [];

  segmentDimmed: Boolean;

  constructor(private accService: AccountsService , private transactionService: TransactionsService , private formBuilder: FormBuilder,
    public modalService: SuiModalService, private toastr: ToastrService ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.segmentDimmed = true;
    this.transactionService.getAll().subscribe(res => {
      this.listTransactions = res;
      this.segmentDimmed = false;
    });
  }

   reversal(transactions: Transactions) {

      if ( transactions.transaction_type.id === 1) {
        const code = prompt('Digite o código para realizar o estorno', '');

        if ( code === null) {
          this.toastr.error('O codigo da transacao é obrigatorio para realizar o estorno de aportes', 'Ops!');
        } else {
          this.reversalExec(transactions.id, code);
        }
      } else {
        this.reversalExec(transactions.id , null);
      }
   }

   reversalExec(transactionId: Number , code: string) {
    this.segmentDimmed = true;
    this.transactionService.postReversal(transactionId, code).subscribe(res => {
      this.getAll();
      this.toastr.success('Salvo realizado com sucesso', 'Informacao!');
      this.segmentDimmed = false;
    }, error => {
      this.segmentDimmed = false;
      this.toastr.error(error.error.Message, 'Ops!');
    });
   }

}
