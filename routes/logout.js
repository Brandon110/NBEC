module.exports = function (app) {
    app.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
}