const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const upload = require("./upload");

// routes
router.post('/sendEmail',upload.single("file"), readCsvAndSendMail);

module.exports = router;

function readCsvAndSendMail(req, res, next) {
  //  console.log(req.body)
    emailService.readCsvAndSendMail(req,res)
        .then(() => res.json({"strMessage":"mail sended"}))
       // .then(()=> res.json(req))
        .catch(err => next(err));
}

