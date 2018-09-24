import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  ENDPOINT_STATUS_ROOT = '1.0/status';

  constructor(private http: HttpClient  ) { }

  getAll() {
    const URL = `${environment.api}${this.ENDPOINT_STATUS_ROOT}`;
    return this.http.get<Array<Status>>(URL);
  }

}
