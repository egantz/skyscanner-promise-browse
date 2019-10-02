

const { getLocationCode, browseRoutes } = require('../lib');

async function toEverywhere(origin) {
  const fromSkyscannerCode = await getLocationCode(origin);
  console.log('Searching for flights to everywhere, anytime from ', fromSkyscannerCode);
  const flights = await browseRoutes(fromSkyscannerCode.PlaceId);
  console.log(flights);
}

toEverywhere('Barcelona');
