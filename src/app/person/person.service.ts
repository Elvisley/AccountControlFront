import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PersonLegal } from '../models/personlegal.model';
import { PersonPhysical } from '../models/personphysical.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  ENDPOINT_LEGAL_ROOT = '1.0/person/legal';

  ENDPOINT_PHYSICAL_ROOT = '1.0/person/physical';

  constructor(private http: HttpClient ,  private router: Router ) { }

  getAllPersonLegal() {
    const URL = `${environment.api}${this.ENDPOINT_LEGAL_ROOT}`;
    return this.http.get<Array<PersonLegal>>(URL);
  }

  getAllPersonPhysical() {
    const URL = `${environment.api}${this.ENDPOINT_PHYSICAL_ROOT}`;
    return this.http.get<Array<PersonPhysical>>(URL);
  }

  savePersonLegal(personLegal: PersonLegal) {
    delete(personLegal.id);
   return this.http.post<PersonLegal>(`${environment.api}${this.ENDPOINT_LEGAL_ROOT}` , personLegal);
  }

  savePersonPhysical(person: PersonPhysical) {
    delete(person.id);
    person.birth = new Date(person.birth).toISOString();
    return this.http.post<PersonPhysical>(`${environment.api}${this.ENDPOINT_PHYSICAL_ROOT}` ,  person );
   }
}
