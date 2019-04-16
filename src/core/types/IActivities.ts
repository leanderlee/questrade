/** @format */
// GET accounts/:id/activities
// Retrieve account activities,
// including cash transactions, dividends, trades, etc.
import { Currency } from './enums';

type DateTime = Date | string;
export interface IActivities {
  activities: IAccountActivity[];
}
export interface IAccountActivity {
  tradeDate: DateTime; // Trade date
  transactionDate: DateTime; // Transaction date
  settlementDate: DateTime; // Settlement date
  action: string; // Activity action
  symbol: string; // Symbol name
  symbolId: string | number; // Symbol ID
  description: string; // Description
  currency: Currency; // Enumeration Currency
  quantity: number; // The quantity
  price: number; // The price
  grossAmount: number; // Gross amount
  commission: number; // The commission
  netAmount: number; // Net Amount
  type: string; // Activity Type
}

/*

Maximum 31 days of data can be requested at a time.

Sample request:
GET https://api01.iq.questrade.com/v1/accounts/26598145/
activities?startTime=
2011-02-01T00:00:00-05:00&endTime=2011-02-28T00:00:00-05:00&
Sample response:
{
  "activities": [
        {
            "tradeDate": "2011-02-16T00:00:00.000000-05:00",
            "transactionDate": "2011-02-16T00:00:00.000000-05:00",
            "settlementDate": "2011-02-16T00:00:00.000000-05:00",
            "action": "",
            "symbol": "",
            "symbolId": 0,
            "description":
             "INT FR 02/04 THRU02/15@ 4 3/4%BAL  205,006   AVBAL  204,966 ",
            "currency": "USD",
            "quantity": 0,
            "price": 0,
            "grossAmount": 0,
            "commission": 0,
            "netAmount": -320.08,
            "type": "Interest"
        },
        ...
    ]
}


*/
