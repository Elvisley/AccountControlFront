import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Accounts } from '../models/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  ENDPOINT_ACCOUNT_ROOT = '1.0/accounts';

  constructor(private http: HttpClient ,  private router: Router ) { }

  getAccountsMaster() {
    const URL = `${environment.api}${this.ENDPOINT_ACCOUNT_ROOT}/master`;
    return this.http.get<Array<Accounts>>(URL);
  }

  getAll() {
    const URL = `${environment.api}${this.ENDPOINT_ACCOUNT_ROOT}`;
    return this.http.get<Array<Accounts>>(URL);
  }

  editAccount(id: string, name: string, status_id: string) {
    const URL = `${environment.api}${this.ENDPOINT_ACCOUNT_ROOT}/${id}`;
    return this.http.put<Accounts>(URL ,  {
        'name': name,
        'status_id': status_id
    });
  }

  postAccount(account: any) {

    let URL = `${environment.api}${this.ENDPOINT_ACCOUNT_ROOT}/master`;

    if ( account.account_parent_id != null && account.account_parent_id > 0) {
      URL = `${environment.api}${this.ENDPOINT_ACCOUNT_ROOT}/children`;
    }

    delete(account.person_type);
    delete(account.master);

    return this.http.post<Accounts>(URL ,  account);
  }

}
