const AWS = require('aws-sdk');	
const dotenv = require('dotenv');	
dotenv.config();	
AWS.config.update({	accessKeyId: process.env.AWS_ACCESS_KEY_ID,	
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                });	
module.exports = {
        key: process.env.AWS_ACCESS_KEY_ID,	
        secret: process.env.AWS_SECRET_ACCESS_KEY,	
        ses: {	  
              from: {                  
                // replace the email address
              default: '"nk" <kiwiscphp@gmail.com>',	
                },	   
                 // e.g. us-west-2	
            region: 'us-east-1'	
          }
        };

