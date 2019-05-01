<!-- @format -->

# Questrade API

## This version do not have any test suites installed yet and is not ready for production

Until version 1.0 breaking change will occur at minor version change 0.X.0, Please make sure to open a [GitHub issues](https://github.com/luxcium/questrade-ts/issues) for anything problematic to help us during the development phase of this project.

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
import { tokenConnection } from '.';

const seedToken = 'R0TFhgiWFjKi1YCwCjAMJFugwD4A8cgb0';

// using async function to avoid  then().catch()
(async () => {
  try {
    const { questrade } = await tokenConnection(seedToken);

    // using qt for short if you prefer
    const qt = questrade;

    const symb = await qt.searchSymbol('aapl');

    console.log(symb);

    console.log(await qt.getQuote(symb.symbolId));
  } catch (error) {
    console.log(error);
  }
})();
```

### Security and Token management

Questrade's security token system requires that you save the latest refresh token that it vends you. After you create one in the user apps page, our library needs to save a key somewhere onto disk. By default, we create a folder for these keys in `./keys` at your working directory, but you can change the directory location or to load from a text file (with the key as its contents).

In order to do that, you should set either the `keyDir` option (defaults to `./keys`) or `keyFile` to point to a file (defaults to using a directory.) -- See full options below.

### Switching Accounts

By default, if you instantiate the `Questrade` class without passing in an account ID to options, we will try to find and select the primary account (by fetching a list of all the accounts). If you want to change the account, simply do:

```typescript
qt.account = '123456'; // Switch to account 123456 -- All future calls will use this account.
```

## Contributions

All contributions are welcome!

## Questrade does not maintain this unofficial SDK

Refer to [Questrade's Documentation](https://www.questrade.com/api/documentation/) to get help and please open a [GitHub issues](https://github.com/luxcium/questrade-ts/issues) for anything you feel dont match the way it should be working when refering to Questrade docs.

### MIT LICENSE

Copyright (c) 2019 Benjamin Vincent Kasapoglu (Luxcium)
Copyright (c) 2016-2019 Leander Lee

MIT LICENSE (WITH ALL DUE RESERVATION PLEASE FIRST READ ./notice.md)
Permission is hereby granted, free of charge, to all person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ALL KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ALL CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
