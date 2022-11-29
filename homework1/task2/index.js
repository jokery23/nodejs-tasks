const csvToJson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const { handleError, toCamelCase } = require('./helpers');

const pathToCsv = path.join(__dirname, 'csv', 'sample.csv');
const pathToResult = path.join(__dirname, 'csv', 'result.txt');

const readStream = fs.createReadStream(pathToCsv);
const writeStream = fs.createWriteStream(pathToResult);

const csvConverter = csvToJson({
  output: 'json',
  ignoreColumns: /Amount/,
  checkType: true,
})
  .on('header', (headers) => {
    headers.forEach((header, i) => (headers[i] = toCamelCase(header)));
  })
  .on('error', handleError);

readStream.pipe(csvConverter).pipe(writeStream);

readStream.on('error', handleError);
writeStream.on('error', handleError);
