# Express Fast IP

An express module for getting IP information using [fast-geoip](https://github.com/onramper/fast-geoip).

## Installation

```
npm install express-fast-ip
```

## Usage

### Typescript
```typescript
import {ip, ipInfo} from 'express-fast-ip';
import * as express from 'express';

const app = express();

app.use(ip);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

// It is also possible to fetch ip information programatically
console.log(
    await ipInfo(),
);
```

### Javascript
```javascript
const express = require('express');
const app = express();
const {ip, ipInfo} = require('express-fast-ip');

app.use(ip);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

// It is also possible to fetch ip information programatically
console.log(
    await ipInfo(),
);
```

## Author
Eduardo Nuzzi <eduardomnuzzi@gmail.com>

## Contributions

Feel free to contribute to this project.

If you find a bug or want a feature, but don't know how to fix/implement it, please fill an [issue](https://github.com/o-compilador/express-fast-ip/issues).  
If you fixed a bug or implemented a new feature, please send a [pull request](https://github.com/o-compilador/express-fast-ip/pulls).

## Credits
Huge thanks to Oyetoke Toby for implementing [the code that inspired this lib](https://github.com/CITGuru/express-ip).