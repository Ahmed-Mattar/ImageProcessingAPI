# Image Processing API

This project is part of the Udacity Advanced web development Nanodegree

the project purpose is the resize an image using Sharp library and to serve it back to the client but if it already has been resized it serves back a cached version from the disk.
using TDD approach  



## Installation

Use the npm package manager to install the project dependecies and get started.

```bash
npm install
```

## Scripts

```
"test": "npm run build && npm run jasmine"
"jasmine": "jasmine"
"start": "nodemon src/index.ts"
"build": "npx tsc"
"lint": "eslint --ext .js,.ts ."
"prettier": "prettier --config .prettierrc src/**/*.ts --write"
```

## built with
1. [express.js](https://www.npmjs.com/package/express)
2. [sharp.js](https://www.npmjs.com/package/sharp)
3. [typescript](https://www.npmjs.com/package/typescript)
4. [jasmine](https://www.npmjs.com/package/jasmine)
5. [jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter)




