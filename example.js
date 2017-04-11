'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');
var CronJob = require('cron').CronJob;
var timeZone = 'Asia/Jakarta';
var kue = require('kue'),
   queue = kue.createQueue();

var job = new CronJob('* * * * * *', function() {
    var task = queue.create('email', {
      title: 'welcome email from cron'
    , to: 'habilhusni@gmail.com'
    , template: 'welcome-email'
    }).save( function(err){
       if( !err ) console.log( task.id );
    });
      console.log(`I'm in!!!!`);

  }, function () {
    /* This function is executed when the job stops */
  },
  true, /* Start the job right now */
  timeZone /* Time zone of this job. */
);

queue.process('email', function(job, done){
  sendEmail(job.data.to, done);
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'habilhusni@gmail.com',
        pass: process.env.SECRETKEYS
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <habilhusni@gmail.com>', // sender address
    to: 'habilhusni@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
let sendEmail = function(jobData, done) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  console.log('Email sent!')
  done()
}
