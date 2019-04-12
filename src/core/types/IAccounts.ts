/** @format */

export interface IAccount {
  type: string;
  number: string;
  status: string;
  isPrimary: boolean;
  isBilling: boolean;
  clientAccountType: string;
}

export interface IAccounts {
  accounts: IAccount[];
}
