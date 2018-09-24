import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PersonLegal } from '../models/personlegal.model';
import { PersonPhysical } from '../models/personphysical.model';
import { PersonService } from './person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuiModalService } from 'ng2-semantic-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  segmentDimmedPhysical: boolean;
  segmentDimmedLegal: boolean;

  formPersonPhysical: FormGroup;

  formPersonLegal: FormGroup;

  ListPersonPhysical: Array<PersonPhysical> = [];
  ListPersonLegal: Array<PersonLegal> = [];

  constructor(private personService: PersonService ,  private router: Router, private formBuilder: FormBuilder,
    public modalService: SuiModalService, private toastr: ToastrService ) { }

  ngOnInit() {

    this.getAllPersonPhysical();
    this.getAllPersonLegal();

    this.formPersonPhysical = this.formBuilder.group({
      id: [null],
      full_name: [null, [ Validators.required ]],
      document: [null, [ Validators.required ]],
      birth: [null, [ Validators.required ]]
    });

    this.formPersonLegal = this.formBuilder.group({
      id: [null],
      fantasy_name: [null, [ Validators.required ]],
      social_reason: [null, [ Validators.required ]],
      document: [null, [ Validators.required ]]
    });
  }

  getAllPersonLegal() {
    this.personService.getAllPersonLegal().subscribe(res => {
      this.ListPersonLegal = res;
      this.segmentDimmedLegal = false;
    });
  }

  getAllPersonPhysical() {
    this.personService.getAllPersonPhysical().subscribe(res => {
      this.ListPersonPhysical = res;
      this.segmentDimmedPhysical = false;
    });
  }

  savePersonLegal() {
    this.segmentDimmedLegal = true;
    this.personService.savePersonLegal(this.formPersonLegal.value).subscribe(res => {
      this.getAllPersonLegal();
      this.toastr.success('Salvo realizado com sucesso', 'Informacao!');
      this.formPersonLegal.reset();
    }, error => {
      this.segmentDimmedLegal = false;
      this.toastr.error(error.error.Message, 'Ops!');
    });
  }

  savePersonPhysical() {
    this.segmentDimmedPhysical = true;
    this.personService.savePersonPhysical(this.formPersonPhysical.value).subscribe(res => {
      this.getAllPersonPhysical();
      this.toastr.success('Salvo realizado com sucesso', 'Informacao!');
      this.formPersonPhysical.reset();
    }, error => {
      console.log(error);
      this.segmentDimmedPhysical = false;
      this.toastr.error(error.error.Message, 'Ops!');
    });
  }

}
