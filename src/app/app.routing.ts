import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonComponent } from './person/person.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ChildrenComponent } from './children/children.component';
import { CreateComponent } from './accounts/create/create.component';
import { TransactionsComponent } from './transactions/transactions.component';


const APP_ROUTES: Routes = [
    {
      path: 'persons',
      component: PersonComponent,
    },
    {
      path: '',
      component: AccountsComponent,
    },
    {
      path: 'accounts',
      component: AccountsComponent,
    },
    {
      path: 'accounts/created',
      component: CreateComponent,
    },
    {
      path: 'accounts/:id/children',
      component: ChildrenComponent,
    },
    {
      path: 'transactions',
      component: TransactionsComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
