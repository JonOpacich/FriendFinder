
module.exports = function (app) {

    app.get('/survey', function (req, res) {
        res.redirect('/survey.html');
    });
    app.get('*', function (req, res) {
        res.redirect('/home.html');
    });
}
