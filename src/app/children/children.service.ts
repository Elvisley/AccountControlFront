import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Accounts } from '../models/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  ENDPOINT_ACCOUNT_CHILDREN_ROOT = '1.0/accounts/children';

  ENDPOINT_ACCOUNT_ROOT = '1.0/accounts';

  constructor(private http: HttpClient ,  private router: Router ) { }

  getAccountsChildren(AccountParentId: any) {
    const URL = `${environment.api}${this.ENDPOINT_ACCOUNT_CHILDREN_ROOT}?childrenAccountsId=${AccountParentId}`;
    return this.http.get<Array<Accounts>>(URL);
  }

  getAccountById(AccountId: any) {
    const URL = `${environment.api}${this.ENDPOINT_ACCOUNT_ROOT}/${AccountId}`;
    return this.http.get<Accounts>(URL);
  }

}
