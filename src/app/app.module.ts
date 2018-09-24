import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler, LOCALE_ID  } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { routing } from './app.routing';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import {SuiModule} from 'ng2-semantic-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ToastrModule } from 'ngx-toastr';
import { PersonComponent } from './person/person.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ChildrenComponent } from './children/children.component';
import { TransferenceComponent } from './children/transference/transference.component';
import { TransferenceModal } from './children/transference/transference.modal';
import { CreateComponent } from './accounts/create/create.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { EditComponent } from './accounts/edit/edit.component';
registerLocaleData(ptBr);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: '.',
  precision: 2,
  prefix: '',
  suffix: '' ,
  thousands: ''
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftMenuComponent,
    FooterComponent,
    PersonComponent,
    AccountsComponent,
    ChildrenComponent,
    TransferenceComponent,
    CreateComponent,
    TransactionsComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    routing,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SuiModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
  entryComponents: [
    TransferenceComponent,
    EditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
