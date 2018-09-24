import { TransactionType } from './transactiontype.model';

export class Transactions {
  id: number;
  transaction_code: string;
  created: string;
  money: string;
  transaction_type: TransactionType;
  transaction_type_id: Number;
  account_destination: Account;
  account_destination_id: Number;
  account_source: Account;
  account_source_id: Number;
  reversed: boolean;
}

