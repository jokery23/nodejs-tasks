const csvToJson = require('csvtojson');
const fs = require('fs');
const path = require('path');

const pathToCsv = path.join(__dirname, '..', 'csv', 'example1.csv');
const pathToOutput = path.join(__dirname, '..', 'output', 'result.task2.txt');

const readStream = fs.createReadStream(pathToCsv);
const writeStream = fs.createWriteStream(pathToOutput);

readStream
    .pipe(csvToJson({
        output: 'json'
    }))
    .pipe(writeStream)

readStream.on('error', handleError);
writeStream.on('error', handleError);

function handleError(error){
    console.error(error.message || error);
}