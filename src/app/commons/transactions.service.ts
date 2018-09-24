import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transactions } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  ENDPOINT_TRANSACTIONS_ROOT = '1.0/transactions';

  constructor(private http: HttpClient) { }

  getAll() {
    const URL = `${environment.api}${this.ENDPOINT_TRANSACTIONS_ROOT}`;
    return this.http.get<Array<Transactions>>(URL);
  }

  postDeposit(account_destination_id: Number, money: string) {
    const URL = `${environment.api}${this.ENDPOINT_TRANSACTIONS_ROOT}/deposit`;
    return this.http.post<Transactions>(URL ,  {
      'money': money,
      'account_destination_id': account_destination_id
    });
  }

  postLoad(account_destination_id: Number, money: string) {
    const URL = `${environment.api}${this.ENDPOINT_TRANSACTIONS_ROOT}/load`;
    return this.http.post<Transactions>(URL ,  {
      'money': money,
      'account_destination_id': account_destination_id
    });
  }

  postTransference(account_destination_id: Number, account_source_id: Number, money: string) {
    const URL = `${environment.api}${this.ENDPOINT_TRANSACTIONS_ROOT}/transference`;
    return this.http.post<Transactions>(URL ,  {
      'money': money,
      'account_destination_id': account_destination_id,
      'account_source_id': account_source_id
    });
  }

  postReversal(transaction_id: Number, transaction_code: string) {
    const URL = `${environment.api}${this.ENDPOINT_TRANSACTIONS_ROOT}/reversal`;
    return this.http.post<Transactions>(URL ,  {
      'transaction_id': transaction_id,
      'transaction_code': transaction_code
    });
  }
}
