const cron = require('node-cron');
const newsletter = require('./newsletter.js');

 module.exports = cron.schedule('00 12 * * Friday', () =>  {
     newsletter();
});
