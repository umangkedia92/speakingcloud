const AWS = require('aws-sdk');
const Ddb = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});
AWS.config.region = 'eu-west-1';
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
  var fileData ;
  let dbParams ={
        TableName: 'Performance',
        Key:{
            "EmailId" : "arpandubey@gmail.com"
        },
        Limit : 10 
    };
  /*
    let dbParams ={
        TableName: 'Performance',
        Key:{
            "EmailId" : "arpandubey@gmail.com"
        }
   };*/
   
   //Ddb.scan(dbParams,function(err,data){
    Ddb.get(dbParams,function(err,data){ 
        if (err) {
            callback(err,null);
        }
        else{
          fileData = JSON.stringify(data);
          uploadFileOnS3(`fileName.html`, fileData);
        callback(null,fileData);
        }
    })
    
  
  /*const id = new Date().getTime();
  const data = Object.assign({}, event.data, {id});
  const p = {
    Bucket: event.bucket,
    Key: `abcd`,
    Body: 'abcdef'
  };
 
  s3Promise(p, 'upload') 
    .then(data => {
     // console.log('id', data, { id: id.toString() });
      return callback(null, { id: id.toString() });
    }).catch(err => {
      //console.log('error in s3 upload', err);
      return callback(err);
    });*/
    
  //uploadFileOnS3(`fileName.html`, fileData);
    
};


//AWS.config.update({accessKeyId: "ACCESS_KEY",secretAccessKey: 'SECRET_KEY'});

var s3bucket = new AWS.S3({params: {Bucket: 'performance-report-2018'}});

function uploadFileOnS3(fileName, fileData){
    var params = {
      Key: fileName,
      Body: fileData,
    };
    s3bucket.upload(params, function (err, res) {               
        if(err)
            console.log("Error in uploading file on s3 due to "+ err)
        else    
            console.log("File successfully uploaded.")
    });
}

/*
function s3Promise (params, method) {
  return new Promise(function (resolve, reject) {
    s3[method](params, function (err, data) {
      console.log('err in s3', method, err);
      if (err) return reject(err);
      console.info('incoming data:', data);
      resolve(data);
    });
  });
}*/
