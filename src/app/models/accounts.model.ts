import { Person } from './person.model';
import { Status } from './status.model';
import { ChildrenAccounts } from './children_accounts.model';

export class Accounts {
  id: number;
  name: string;
  created: string;
  money: string;
  master: boolean;
  person_id: Number;
  person: Person;
  status: Status;
  status_id: boolean;
  children_accounts: Array<ChildrenAccounts>;

}
