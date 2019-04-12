<!-- @format -->

# Questrade API

This API is an easy way to use the [Questrade API](www.questrade.com/api/documentation/getting-started) immediately.

### Features

- Token management
- Easy to use API calls
- Auto-select primary account

## Getting Started

Simply start by installing the questrade library:

```bash
npm install --save questrade
```

You will then need to get an [API key](https://login.questrade.com/APIAccess/userapps.aspx).

After that's it's really simple to use:

```typescript
import { QuestradeClass, QuestradeHelperFunction } from '.';

const seedToken = 'R0TFhgiWFjKi1YCwCjAMJFugwD4A8cgb0';

(async () => {
  await QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
    const symb = await qt.searchSymbol('aapl');
    console.log(symb);
    console.log(await qt.getQuote(symb.symbolId));
  });
})().catch(error => console.log(error));
```

### Security and Token management

Questrade's security token system requires that you save the latest refresh token that it vends you. After you create one in the user apps page, our library needs to save a key somewhere onto disk. By default, we create a folder for these keys in `./keys` at your working directory, but you can change the directory location or to load from a text file (with the key as its contents).

In order to do that, you should set either the `keyDir` option (defaults to `./keys`) or `keyFile` to point to a file (defaults to using a directory.) -- See full options below.

## Switching Accounts

By default, if you instantiate the `Questrade` class without passing in an account ID to options, we will try to find and select the primary account (by fetching a list of all the accounts). If you want to change the account, simply do:

```typescript
qt.account = '123456'; // Switch to account 123456 -- All future calls will use this account.
```

Copyright (c) 2019 Benjamin Vincent Kasapoglu (Luxcium)
Copyright (c) 2016-2019 Leander Lee

MIT LICENSE (WITH ALL DUE RESERVATION PLEASE FIRST READ ./notice.md)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Contributions

Are welcome!
