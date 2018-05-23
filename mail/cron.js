const cron = require('node-cron');
const createMail = require('./createMail.js');

 module.exports = cron.schedule('00 12 * * Friday', () =>  {
     createMail();
});
