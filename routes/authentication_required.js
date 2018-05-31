const requiredLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect('/signin');
    }
    next();
}

module.exports = function (app) {
    app.get('/profile/activity', requiredLoggedIn);

    app.get('/profile/posts', requiredLoggedIn);

    app.get('/profile/update-profile', requiredLoggedIn);

    app.get('/create/thread/:topic', requiredLoggedIn);

    app.get('/forums/edit-thread/:id', requiredLoggedIn);
}