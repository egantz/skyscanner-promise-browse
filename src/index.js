const request = require('request-promise-native');

const callAPI = async (endpoint, params) => {
  const { SKYSCANNER_TOKEN } = process.env;
  if (!params) {
    params = {};
  }
  params.apikey = SKYSCANNER_TOKEN;
  const options = {
    uri: `http://partners.api.skyscanner.net/apiservices/${endpoint}`,
    qs: params,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };
  return request(options);
};

const getLocationCode = async (query, country, currency, locale) => {
  if (!country) country = 'UK';
  if (!currency) currency = 'GBP';
  if (!locale) locale = 'en-GB';

  const locations = await module.exports.callAPI(`autosuggest/v1.0/${country}/${currency}/${locale}/`, { query });
  return locations.Places[0];
};

const formatRoutesData = async (routes, places, currency, length) => {
  if (!routes || !places || !currency) throw new Error('You must specify routes, places and a currency for formatRoutesData');
  const placesLookUp = {};
  places.forEach((place) => {
    placesLookUp[place.PlaceId] = {
      name: place.Name,
      type: place.Type,
      code: place.SkyscannerCode,
    };
  });

  if (!length) length = 9;
  routes = routes.sort((a, b) => (
    a.Price < b.Price
  )).slice(routes.length - length);

  let offers = routes.map(route => ({
    origin: placesLookUp[route.OriginId],
    destination: placesLookUp[route.DestinationId],
    currency,
    price: route.Price,
  }));
  offers = offers.sort((a, b) => (
    parseInt(a.price, 10) < parseInt(b.price, 10)
  ));
  return offers.slice(0, length);
};


const formatQuotesData = async (quotes, places, carriers, currency, length) => {
  if (!quotes || !places || !carriers || !currency) throw new Error('You must specify quotes, places, carriers and a currency for formatQuotesData');
  const placesLookUp = {};
  places.forEach((place) => {
    placesLookUp[place.PlaceId] = {
      name: place.Name,
      type: place.Type,
      code: place.SkyscannerCode,
    };
  });

  const carriersLookUp = {};
  carriers.forEach((carrier) => {
    carriersLookUp[carrier.CarrierId] = {
      name: carrier.Name,
    };
  });


  if (!length) length = 9;
  quotes = quotes.slice(quotes.length - length);
  let offers = quotes.map((quote) => {
    let inbound;
    let outbound;
    if (quote.InboundLeg) {
      inbound = {
        carrier: quote.InboundLeg.CarrierIds[0] ? carriersLookUp[quote.InboundLeg.CarrierIds[0]] : { name: 'unknown' },
        origin: placesLookUp[quote.InboundLeg.OriginId],
        destination: placesLookUp[quote.InboundLeg.DestinationId],
        date: quote.InboundLeg.DepartureDate,
      };
    }
    if (quote.OutboundLeg) {
      outbound = {
        carrier: carriersLookUp[quote.OutboundLeg.CarrierIds[0]],
        origin: placesLookUp[quote.OutboundLeg.OriginId],
        destination: placesLookUp[quote.OutboundLeg.DestinationId],
        date: quote.OutboundLeg.DepartureDate,
      };
    }
    return {
      outbound,
      inbound,
      currency,
      direct: quote.Direct,
      price: quote.MinPrice,
      quoteDate: quote.QuoteDateTime,
    };
  });
  offers = offers.sort((a, b) => (
    parseInt(a.price, 10) < parseInt(b.price, 10)
  ));
  return offers.slice(0, length);
};

const browseRoutes = async (
  originAirport,
  destinationAirport,
  outboundDate,
  returnDate,
  country,
  currency,
  locale) => {
  if (!originAirport) throw new Error('Origin aiport undefined. Required in browseRoutes');
  if (!destinationAirport) destinationAirport = 'anywhere';
  if (!outboundDate) outboundDate = 'anytime';
  if (!returnDate && returnDate !== '') returnDate = 'anytime';
  if (!country) country = 'UK';
  if (!currency) currency = 'GBP';
  if (!locale) locale = 'en-UK';

  const res = await module.exports.callAPI(`browseroutes/v1.0/${country}/${currency}/${locale}/${originAirport}/${destinationAirport}/${outboundDate}/${returnDate}`);
  const options = await formatRoutesData(res.Routes, res.Places, res.Currencies[0]);
  return options;
};

const browseQuotes = async (
  originAirport,
  destinationAirport,
  outboundDate,
  returnDate,
  country,
  currency,
  locale) => {
  if (!originAirport) throw new Error('Origin aiport undefined. Required in browseQuotes');
  if (!destinationAirport) destinationAirport = 'anywhere';
  if (!outboundDate) outboundDate = 'anytime';
  if (!returnDate && returnDate !== '') returnDate = 'anytime';
  if (!country) country = 'UK';
  if (!currency) currency = 'GBP';
  if (!locale) locale = 'en-UK';

  const res = await module.exports.callAPI(`browsequotes/v1.0/${country}/${currency}/${locale}/${originAirport}/${destinationAirport}/${outboundDate}/${returnDate}`);
  const options = await formatQuotesData(res.Quotes, res.Places, res.Carriers, res.Currencies[0]);
  return options;
};

module.exports = {
  callAPI,
  browseRoutes,
  browseQuotes,
  getLocationCode,
  formatRoutesData,
  formatQuotesData,
};
