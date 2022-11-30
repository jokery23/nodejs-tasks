import csvToJson from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { handleError, toCamelCase } from './helpers';

const dirname = '../../';

const pathToCsv = join(__dirname, '..', '..', 'csv', 'sample.csv');
const pathToResult = join(__dirname, '..', '..', 'csv', 'result.txt');

const readStream = createReadStream(pathToCsv);
const writeStream = createWriteStream(pathToResult);

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
