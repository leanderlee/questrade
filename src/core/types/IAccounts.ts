/** @format */

import { AccountStatus, ClientAccountType, UserAccountType } from './enums';

export type AcountNumber = string | number;

export interface IAccount {
  type: UserAccountType;
  number: AcountNumber;
  status: AccountStatus;
  isPrimary: boolean;
  isBilling: boolean;
  clientAccountType: ClientAccountType;
}

export interface IAccounts {
  accounts: IAccount[];
}
