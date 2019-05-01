<!-- @format -->

# Questrade TS/NodeJS API

This API is an easy way to use the [Questrade API](www.questrade.com/api/documentation/getting-started) immediately. It give full support for TypeScript and NodeJS.

## Getting Started

Simply start by installing this questrade-ts library:

```bash
npm install --save-exact questrade-ts
```

or

```bash
npm install --save-exact questrade-ts@latest
```

### Currently, this API does not have any test suites installed and is therefore not to be considered ready for production

Until version 1.0 breaking change will occur at minor version change 0.X.0, Please make sure to open a [GitHub issues](https://github.com/luxcium/questrade-ts/issues) for anything problematic to help us during the development phase of this project. use the `--save-exact` flag until the version 1.0.x Using the caret (circumflex accent`U+005E`) ^0.X.Y on a version stating with 0.x should not upgrade to folowing minor version but to have full control make sure you unsing that flag or `-E` and then to upgrade to a new latest version use `@latest` i.e. `npm i --save-exact questrade-ts@latest`. alternatively you may use `--no-save` to prevents saving to dependencies at all.

### Features

- Token management
- Easy to use API calls
- Auto-select primary account

You will then need to get an [API key](https://login.questrade.com/APIAccess/userapps.aspx).

After that, it is really simple to use:

```typescript
// typescript
import { tokenConnection } from 'questrade-ts';

const seedToken = 'R0TFhgiWFjKi1YCwCjAMJFugwD4A8cgb0';

// using async Immediately Invoked Function Expressions to avoid using then().catch()
(async () => {
  // always put your code in a try catch block
  try {
    const { questrade } = await tokenConnection(seedToken);

    // using qt for short if you prefer
    const qt = questrade;

    const symb = await qt.searchSymbol('aapl');

    console.log(symb);

    console.log(await qt.getQuote(symb.symbolId));
  } catch (error) {
    // manage your errors here if needed
    console.log(error);
  }
})();
```

## Security and Token management

Questrade's security token system requires that you save the latest refresh token that it vends you. After you create one in the user apps page, our library needs to save a key somewhere onto disk. By default, we create a folder for these keys in `./keys` at your working directory, but you can change the directory location or load from a text file (with the key as its contents).

In order to do that, you should set either the `keyDir` option (defaults to `./keys`) or `keyFile` to point to a file (defaults to using a directory.) -- See full options below.

## Switching Accounts

By default, if you instantiate the `Questrade` class without passing in an account ID to options, we will try to find and select the primary account (by fetching a list of all the accounts). If you want to change the account, simply do:

```typescript
qt.account = '12345678'; // Switch to account 12345678 -- All future calls will use this account. using 8 digits
```

# Contributions

All contributions are welcome!

## Questrade does not maintain this unofficial SDK

Refer to [Questrade's Documentation](https://www.questrade.com/api/documentation/) to get help. Please always open a [questrade-ts GitHub issue](https://github.com/luxcium/questrade-ts/issues) for anything you feel doesn't match the way it should be working when referring to Questrade docs.

# MIT LICENSE

Copyright (c) 2019 Benjamin Vincent Kasapoglu (Luxcium)
Copyright (c) 2016-2019 Leander Lee

MIT LICENSE

(WITH ALL DUE RESERVATION PLEASE FIRST READ ./notice.md)

Permission is hereby granted, free of charge, to all person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ALL KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ALL CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
