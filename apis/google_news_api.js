const request = require('request');
const getTodaysDate = require('../helper_functions/getTodaysDate');

module.exports = function(app) {
    app.get('/top-headlines', (req, res) => {

        request('https://newsapi.org/v2/top-headlines?' +
            'q=climate&' +
            'from=' + getTodaysDate() + '&' +
            'sortBy=relevancy&' +
            'apiKey=' + process.env.GOOGLE_NEWS_API_KEY, (error, response, body) => {
                let data = JSON.parse(response.body)

                res.send(data);
            });
    });

    app.get('/all-news', (req, res) => {

        request('https://newsapi.org/v2//everything?' +
            'q=global warming&' +
            'from=' + getTodaysDate() + '&' +
            'sortBy=relevancy&' +
            'apiKey=' + process.env.GOOGLE_NEWS_API_KEY, (error, response, body) => {
                let data = JSON.parse(response.body);

                res.send(data);
            });
    });
}
