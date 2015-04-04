'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var geoip = require('geoip-lite');
var hbs;

// For gzip compression
app.use(express.compress());
app.enable('trust proxy')

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */
// Index Page
app.get('/', function(req, res, next) {
		var result = {'ip':req.ip};
		//result.ip='123.123.123.123';
		
		var geo = geoip.lookup(result.ip);

		result.location = {};

		if (geo) {
			result.location.country = geo.country;
			result.location.region = geo.region;
			result.location.city = geo.city;
			result.location.ll = geo.ll;
			result.location.map = "https://www.google.com/maps?q="+geo.ll[0]+","+geo.ll[1];
		}

		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result)+ "\n");
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
