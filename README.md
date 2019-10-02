# Skyscanner Promise Browse

[![Build Status](https://travis-ci.org/flexdinesh/npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/flexdinesh/npm-module-boilerplate) [![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate) [![devDependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/dev-status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Usage

See [examples](examples/example.js).
Three methods exposed: 

## getLocationCode
As per [Skyscanner API docs](https://skyscanner.github.io/slate/?_ga=1.104705984.172843296.1446781555#list-of-places):
> Get a list of places that match a query string.

Takes one required argument `query` which can be any place or address. Also takes three optional arguments (defaults in brackets):
- country ('UK')
- currency ('GBP')
- locale ('en-UK')
## browseQuotes
As per [Skyscanner API docs](https://skyscanner.github.io/slate/?_ga=1.104705984.172843296.1446781555#browse-quotes):
> Retrieve the cheapest quotes from our cache prices.

Takes one required argument `origin` which can be an airport, city or country.Also takes seven optional arguments (defaults in brackets):
- destinationAirport ('anywhere')
- outboundDate ('anytime')
- returnDate ('anytime')
- country ('UK')
- currency ('GBP')
- locale ('en-UK')
- maxNumberOfOptions (10)

## browseRoutes
As per [Skyscanner API docs](https://skyscanner.github.io/slate/?_ga=1.104705984.172843296.1446781555#browse-routes):
> Retrieve the cheapest routes from our cache prices. Similar to the Browse Quotes API but with the routes built for you from the individual quotes.

Takes one required argument `origin` which can be an airport, city or country.
Also takes six optional arguments (defaults in brackets):
- destinationAirport ('anywhere')
- outboundDate ('anytime')
- returnDate ('anytime')
- country ('UK')
- currency ('GBP')
- locale ('en-UK')
- maxNumberOfOptions (10)



# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

Boiler plate ripped from [flexdinesh/npm-module-boilerplate](https://github.com/flexdinesh/npm-module-boilerplate).
