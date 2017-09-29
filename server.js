'use strict'

var express = require('express'),
    exphbs = require('express-handlebars'),
    hbsHelpers = require('handlebars-helpers'),
    hbsLayouts = require('handlebars-layouts'),
    compression = require('compression'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    csurf = require('csurf'),
    favicon = require('serve-favicon'),
    merge = require('merge'),
    path = require('path'),
    swaggerTools = require('swagger-tools'),

    //Local Modules 
    customExpressHbsHelpers = require('./app/helpers/hbsHelpers/expressHbsHelpers'),
    routes = require('./app/routes/router.js'),
    logger = require('./utils/logger'),
    port = process.env.PORT || 3000,
    app = express();

//*************************************************
//        Handlebars template registration
//*************************************************

var customHelpers = merge(customExpressHbsHelpers, hbsHelpers());

var hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: 'app/views/layouts/',
    partialsDir: 'app/views/partials/',
    defaultLayout: 'master',
    helpers: customHelpers
});
app.set('views', path.join(__dirname, 'app/views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//Add custom handlebars template helper functionality
hbsLayouts.register(hbs.handlebars, {});

app.use(express.static(__dirname + '/app/public'));

app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    keys: ['some*key']
}));
app.use(csurf());

//*********************************************************
//    Convention based route loading 
//*********************************************************
var apiRouter = express.Router();
app.use('/api', apiRouter);

var apiV1 = express.Router();
apiRouter.use('/v1', apiV1);
routes.load(express, apiV1);

//Handle any routes that are unhandled and return 404
apiV1.use(function(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    var err = new Error('Not Found');
    err.status = 404;

    if (fullUrl.includes('/api/')) {
        res.send({ message: 'errors/404', err: err });
    } else {
        res.render('errors/404', err);
    }
});


app.listen(port, function(err) {
    logger.info('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
});