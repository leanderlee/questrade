/** @format */

// ! async method getOptionChain(symbolId)
// public async getOptionChain(symbolId: number) {
//   try {
//     const response = await this._api<an!y>(
//       'GET',
//       `/symbols/${symbolId}/options`
//     );
//     return chain(response.optionChain)
//       .keyBy('expiryDate')
//       .mapValues(option => {
//         return keyBy(
//           option.chainPerRoot[0].chainPerStrikePrice,
//           'strikePrice'
//         );
//       })
//       .value();
//   } catch (error) {
//     console.error(error.message);
//     throw new Error(error.message);
//   }
// }/** @format */

// ! async method getOptionQuoteSimplified(filters)
// public async getOptionQuoteSimplified(filters: an!y) {
//   try {
//     const optionsQuotes: an!y = await this.getOptionQuote(filters);
//     return chain(optionsQuotes)
//       .map(optionQuote => {
//         const parsedSymbol = optionQuote.symbol.match(
//           /^([a-zA-Z]+)(.+)(C|P)(\d+\.\d+)$/
//         );
//         if (parsedSymbol !== null) {
//           if (parsedSymbol.length >= 5) {
//             const parsedDate = parsedSymbol[2].match(
//               /^(\d+)([a-zA-Z]+)(\d+)$/
//             );
//             if (parsedDate !== null) {
//               const expiryDate = moment()
//                 .utc()
//                 .month(parsedDate[2])
//                 .date(parsedDate[1])
//                 .year(20 + parsedDate[3])
//                 .startOf('day');
//               const expiryString = `${expiryDate
//                 .toISOString()
//                 .slice(0, -1)}000-04:00`;
//               optionQuote.underlying = parsedSymbol[1];
//               optionQuote.expiryDate = expiryString;
//               optionQuote.strikePrice = parseFloat(parsedSymbol[4]);
//               optionQuote.optionType =
//                 parsedSymbol[3] === 'P' ? 'Put' : 'Call';
//             }
//           }
//           return optionQuote;
//         }
//       })
//       .groupBy('underlying')
//       .mapValues(underlyingQuotes => {
//         return chain(underlyingQuotes)
//           .groupBy('optionType')
//           .mapValues(optionTypeQuotes => {
//             return chain(optionTypeQuotes)
//               .groupBy('expiryDate')
//               .mapValues(expiryDateQuotes => {
//                 return chain(expiryDateQuotes)
//                   .keyBy(quote => {
//                     return quote.strikePrice.toFixed(2);
//                   })
//                   .mapValues(quote => {
//                     return pick(quote, [
//                       'symbol',
//                       'symbolId',
//                       'lastTradePrice',
//                     ]);
//                   })
//                   .value();
//               })
//               .value();
//           })
//           .value();
//       })
//       .value();
//   } catch (error) {
//     console.error(error.message);
//     throw new Error(error.message);
//   }
// }

// $ old version
// ! async method getSymbol(id)
// public async getEquitySymbols(idOrSymbol: idType):
// Promise<IEquitySymbols> {
//   try {
//     let params;
//     if (typeof idOrSymbol === 'number') {
//       params = {
//         id: idOrSymbol,
//       };
//     } else if (typeof idOrSymbol === 'string') {
//       params = {
//         names: idOrSymbol,
//       };
//     }
//     if (params === undefined) {
//       throw new Error('missing_id');
//     }
//     const { symbols } = this._api<IEquitySymbols>
// ('GET', '/symbols', params);
//     return symbols;
//   } catch (error) {
//     console.error(error.message);
//     throw new Error(error.message);
//   }
// }
// ! async method getSymbols(ids)
// public async getSymbols(ids: idsType): Promise<ISymbol[]> {
//   try {
//     if (!Array.isArray(ids)) {
//       throw new Error('missing_ids');
//     }
//     if (!ids.length) return [];
//     let params;
//     if (typeof ids[0] === 'number') {
//       params = {
//         ids: ids.join(','),
//       };
//     } else if (typeof ids[0] === 'string') {
//       params = {
//         names: ids.join(','),
//       };
//     }
//     if (params === undefined) {
//       throw new Error('missing_id');
//     }
//     const { symbols } =
//  await this._api<ISymbols>('GET', '/symbols', params);

//     return symbols;
//   } catch (error) {
//     console.error(error.message);
//     console.error(error.message);
//     throw new Error(error.message);
//   }
// }
