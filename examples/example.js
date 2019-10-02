

const { getLocationCode, browseRoutes } = require('../lib');

async function toEverywhereAnytime(origin) {
  const fromSkyscannerCode = await getLocationCode(origin);
  console.log(`Searching for flights to everywhere, anytime from ${fromSkyscannerCode.PlaceId}`);
  const flights = await browseRoutes(fromSkyscannerCode.PlaceId);
  console.log(flights);
}

async function toEverywhereAndDates(origin, outbound, inbound) {
  const fromSkyscannerCode = await getLocationCode(origin);
  console.log(`Searching for flights from ${fromSkyscannerCode.PlaceId} to anywhere leaving ${outbound} coming back ${inbound}`);
  const flights = await browseRoutes(fromSkyscannerCode.PlaceId, 'anywhere', outbound, inbound);
  console.log(flights);
}

toEverywhereAnytime('Barcelona');
const outbound = (new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)))
  .toISOString().substring(0, 10);
const inbound = (new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000)))
  .toISOString().substring(0, 10);
toEverywhereAndDates('Tokyo', outbound, inbound);
