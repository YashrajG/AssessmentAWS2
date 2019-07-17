/*Scalable Architecture
The frontend uploads the object to the s3 bucket and also triggers an api call.
API built using AWS API Gateway 
API call given by the frontend contains the query.......giving us the object name. 
This API call triggers the Lambda Function
The Lambda Function fetches the object specified in query , resizes it  and adds it to s3 bucket.
*/

exports.handler = async (event) => {
    // TODO implement
    'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const Sharp = require('sharp');

const BUCKET = process.env.BUCKET;
const dest_bucket = process.env.dest_bucket;
//const URL = process.env.URL;
//const ALLOWED_RESOLUTIONS = process.env.ALLOWED_RESOLUTIONS ? new Set(process.env.ALLOWED_RESOLUTIONS.split(/\s*,\s*/)) : new Set([]);

exports.handler = function(event, context, callback) {
  const key = event.queryStringParameters.key;
  //const match = key.match(/((\d+)x(\d+))\/(.*)/);

  //Check if requested resolution is allowed
  document.write(event.fileName)
  S3.getObject({Bucket: BUCKET, Key: event.fileName}).promise()
    .then(data => Sharp(data.Body)
      .resize(200, 200)
      .toFormat('png')
      .toBuffer()
    )
    .then(buffer => S3.putObject({
        Body: buffer,
        Bucket: dest_bucket,
        ContentType: 'image/png',
        Key: key,
      }).promise()
    )
    .then(() => callback(null, {
        statusCode: '301',
        body: 'xyz',
      })
    )
    .catch(err => callback(err))
}
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

