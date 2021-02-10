const db = require('../_helpers/db');
const fs = require('fs');
const dotenv = require('dotenv');
const csv = require('fast-csv');
const userService = require('../users/user.service');
const nodemailer = require('nodemailer');
dotenv.config();
const { publisherMessage } = require('./emailWorker')	
const Logs = db.Logs;
module.exports = {
    sendMail,
    readCsvAndSendMail,
    createLogs    
};

async function readCsvAndSendMail(req,res) {
    try {
        if (req.file == undefined) {
          return res.status(400).send("Please upload a CSV file!");
        }
    
        let arrCsv = [];
        let strPath = __basedir + "/upload/" + req.file.filename; 
        console.log(req.file.filename)   
        await fs.createReadStream(strPath)
          .pipe(csv.parse({ headers: false }))
          .on("error", (error) => {
            throw error.message;
          })
          .on("data", (row) => {
              arrCsv.push(row);
          })
          .on("end", async () => {  
              //csv read and send mail
            for(let arrSubCsv of arrCsv){ 
                //read csv data
                let objUserData = await userService.getByEmail(arrSubCsv[0]) ; 
                const emailOptions = {	   
                    mail: [arrSubCsv[0]],
                    subject: arrSubCsv[2],
                    template: arrSubCsv[1]+"\n"+objUserData.firstName+" "+objUserData.lastName	 
                    }	 
                  // call rabbitmq service to app mail to queue
                    publisherMessage(emailOptions);
            }
            console.log(arrCsv)
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
      }

}

/**
 * @method sendMail
 * @param {Array} strToAddress array of mails to send content to	   
 * @param {String} strSubject Subject of mail to be sent	   
 * @param {String} strMessage content of strMessage in html template format	   
 * @param {String} strFrom not required: mail to send email from	   
 * @returns {Promise} Promise	   *
 */
function sendMail(strToAddress, strSubject, strMessage, strFrom)
{
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_ADDRESS,
    port: process.env.PORT,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASSWORD
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: process.env.FROM, // sender address
    to: strToAddress, // list of receivers
    subject: strSubject, // Subject line
    text: strMessage, // plain text body
    //html: '<b>Hello world ?</b>' // html body
};
return new Promise((resolve, reject) => {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            reject(err); 
        }
        else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            resolve(info);	
        }
    })
  });
}

async function createLogs(strEmail,strNewsLetterName) {
    // validate   
    const logs = new Logs({email:strEmail,newsLetterName:strNewsLetterName});
    // save user
    await logs.save();
}
