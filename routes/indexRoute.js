var express = require('express');
var router = express.Router();
var path = require('path');
var cheerio = require('cheerio');
var fs = require('fs');

router.get('/', function (req, res, next) {
    var filePath = path.join(__dirname, '/../views/index.html');
    var $ = cheerio.load(fs.readFileSync(filePath));

    var navContent = getNavBar(req.user);

    $('nav-bar').replaceWith(navContent);
    res.send($.html());
});

router.get('/loginPage', function (req, res, next) {
    var filePath = path.join(__dirname, '/../views/login.html');
    var $ = cheerio.load(fs.readFileSync(filePath));
    res.send($.html());
});

router.get('/loginWithError', function (req, res, next) {
    var filePath = path.join(__dirname, '/../views/login.html');
    var $ = cheerio.load(fs.readFileSync(filePath));

    var errMsg = "Username or password is incorrect!"

    $('span#errMsg').text(errMsg);
    res.send($.html());
});

router.get('/productList', function (req, res, next) {
    var filePath = path.join(__dirname, '/../views/productList.html');
    var $ = cheerio.load(fs.readFileSync(filePath));

    var navContent = getNavBar(req.user);

    $('nav-bar').replaceWith(navContent);
    res.send($.html());
});

router.get('/createProduct', isLoggedIn, function (req, res, next) {
    var filePath = path.join(__dirname, '/../views/createProduct.html');
    var $ = cheerio.load(fs.readFileSync(filePath));

    var navContent = getNavBar(req.user);

    $('nav-bar').replaceWith(navContent);
    res.send($.html());
});

router.get('/shoppingCart', isLoggedIn, function (req, res, next) {
    var filePath = path.join(__dirname, '/../views/shoppingCart.html');
    var $ = cheerio.load(fs.readFileSync(filePath));

    var navContent = getNavBar(req.user);

    $('nav-bar').replaceWith(navContent);
    res.send($.html());
});

// As with any middleware it is quintessential to call next()
// if the user is authenticated

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function getNavBar(user) {
    var navContent;   
    if (user) {
        navContent = cheerio.load(fs.readFileSync(path.join(__dirname, '/../views/nav-bar-user.html'))).html();
    } else {
        navContent = cheerio.load(fs.readFileSync(path.join(__dirname, '/../views/nav-bar-guest.html'))).html();
    }
    return navContent;
}

module.exports = router;