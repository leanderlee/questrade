/** @format */

import { OrderSide } from './enums';

/** @format */
export type DateTime = Date | string;
export interface IExecutions {
  executions: IExecution[];
}
export interface IExecution {
  // Execution symbol.
  symbol: string;
  // Internal symbol identifier
  symbolId: number;
  // Execution quantity.
  quantity: number;
  // Client side of the order to which execution belongs.
  side: OrderSide;
  // See Client Order Side section for all allowed values.
  // Execution price.
  price: number;
  // Internal identifier of the execution.
  id: number;
  // Internal identifier of the order to which the execution belongs.
  orderId: number;
  // Internal identifier of the order chain to which the execution belongs.
  orderChainId: number;
  // Identifier of the execution at the market where it originated.
  exchangeExecId: string;
  // Execution timestamp.
  timestamp: DateTime;
  // Manual notes that may have been entered by Trade Desk staff
  notes: string;
  // Trading venue where execution originated.
  venue: string;
  // Execution cost (price x quantity).
  totalCost: number;
  // Questrade commission for orders placed with Trade Desk.
  orderPlacementCommission: number;
  // Questrade commission.
  commission: number;
  // Liquidity fee charged by execution venue.
  executionFee: number;
  // SEC fee charged on all sales of US securities.
  secFee: number;
  // Additional execution fee charged by TSX (if applicable).
  canadianExecutionFee: number;
  // Internal identifierof the parent order.
  parentId: number;
}

/*

GET accounts/:id/executions
Retrieves executions for a specific account.

Request parameters
Parameter	Type	Description
id	String	Account number.
Can occur in the 'location' header only.
startTime	DateTime	Start of time range in ISO format.
By default – start of today, 12:00am.
endTime	DateTime	End of time range in ISO format.
By default – end of today, 11:59pm
Response properties
Property	Type	Description
executions	Complex	List of execution records.
Execution	Complex
symbol	String	Execution symbol.
symbolId	Integer	Internal symbol identifier
quantity	Integer	Execution quantity.
side	String	Client side of the order to which execution belongs.
See Client Order Side section for all allowed values.
price	Double	Execution price.
id	Integer	Internal identifier of the execution.
orderId	Integer	Internal identifier of the order to which the execution belongs.
orderChainId	Integer	Internal identifier of the order
chain to which the execution belongs.
exchangeExecId	String	Identifier of the execution
 at the market where it originated.
timestamp	DateTime	Execution timestamp.
notes	String	Manual notes that may have been entered by Trade Desk staff
venue	String	Trading venue where execution originated.
totalCost	Double	Execution cost (price x quantity).
orderPlacementCommission	Double	Questrade commission
for orders placed with Trade Desk.
commission	Double	Questrade commission.
executionFee	Double	Liquidity fee charged by execution venue.
secFee	Double	SEC fee charged on all sales of US securities.
canadianExecutionFee	Integer	Additional execution fee charged
by TSX (if applicable).
parentId	Integer	Internal identifierof the parent order.
Sample request
GET https://api01.iq.questrade.com/v1/accounts/26598145/executions
Sample JSON response
{
	"executions": [
		{
			"symbol": "AAPL",
			"symbolId": 8049,
			"quantity": 10,
			"side": "Buy",
			"price": 536.87,
			"id": 53817310,
			"orderId": 177106005,
			"orderChainId": 177106005,
			"exchangeExecId": "XS1771060050147",
			"timestamp": 2014-03-31T13:38:29.000000-04:00,
			"notes": "",
			"venue": "LAMP",
			"totalCost": 5368.7,
			"orderPlacementCommission": 0,
			"commission": 4.95,
			"executionFee": 0,
			"secFee": 0,
			"canadianExecutionFee": 0,
			"parentId": 0
		}
	]
}

*/
