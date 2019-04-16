/** @format */

export interface IPosition {
  symbol: string;
  symbolId: number;
  openQuantity: number;
  closedQuantity: number;
  currentMarketValue: number;
  currentPrice: number;
  averageEntryPrice: number;
  dayPnl: number;
  closedPnl: number;
  openPnl: number;
  totalCost: number;
  isRealTime: boolean;
  isUnderReorg: boolean;
}

export interface IPositions {
  positions: IPosition[];
}

/*
 *
 *
 * GET accounts/:id/positions
 * Retrieves positions in a specified account.
 *
 * Request parameters
 * Parameter	Type	Description
 * id	String	Account number.
 * Can occur in the 'location' header only.
 * Response Properties
 * Property	Type	Description
 * positions	Complex	List of position records.
 * Position	Complex
 * symbol	String	Position symbol.
 * symbolId	Integer	Internal symbol identifier
 * openQuantity	Double	Position quantity remaining open.
 * closedQuantity	Double	Portion of the position that was closed today.
 * currentMarketValue	Double	Market value of the position (quantity x price).
 * currentPrice	Double	Current price of the position symbol.
 * averageEntryPrice
 * Double	Average price paid for all executions constituting the position.
 * closedPnL	Double	Realized profit/loss on this position.
 * openPnL	Double	Unrealized profit/loss on this position.
 * totalCost	Double	Total cost of the position.
 * isRealTime
 *
 * Boolean	Designates whether real-time quote was used to compute PnL.
 * isUnderReorg
 * Boolean	Designates whether a symbol is currently undergoing a reorg.
 * Sample request
 * GET https://api01.iq.questrade.com/v1/accounts/26598145/positions
 * Sample JSON response
 * {
 * 	"positions": [
 * 		{
 * 			"symbol": "THI.TO",
 * 			"symbolId": 38738 ,
 * 			"openQuantity": 100,
 * 			"currentMarketValue": 6017,
 * 			"currentPrice": 60.17,
 * 			"averageEntryPrice": 60.23,
 * 			"closedPnl": 0,
 * 			"openPnl": -6,
 * 			"totalCost": false,
 * 			"isRealTime": "Individual",
 * 			"isUnderReorg": false
 * 		}
 * 	]
 * }
 *
 * @format
 */
