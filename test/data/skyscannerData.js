const expected = {};

const routes = [{
  Price: 99,
  OriginId: '1',
  DestinationId: '2',
}, {
  Price: 100,
  OriginId: '1',
  DestinationId: '3',
}];

const places = [{
  PlaceId: '1',
  Name: 'place1',
  Type: 'type1',
  SkyscannerCode: 'code1',
}, {
  PlaceId: '2',
  Name: 'place2',
  Type: 'type2',
  SkyscannerCode: 'code2',
}, {
  PlaceId: '3',
  Name: 'place3',
  Type: 'type3',
  SkyscannerCode: 'code3',
}];

const currency = {
  Symbol: '£',
};

expected.formatRoutesData = [{
  origin: { name: 'place1', type: 'type1', code: 'code1' },
  destination: { name: 'place3', type: 'type3', code: 'code3' },
  currency: { Symbol: '£' },
  price: 100,
}, {
  origin: { name: 'place1', type: 'type1', code: 'code1' },
  destination: { name: 'place2', type: 'type2', code: 'code2' },
  currency: { Symbol: '£' },
  price: 99,
}];

const carriers = [{
  CarrierId: '1',
  Name: 'carrier1',
}, {
  CarrierId: '2',
  Name: 'carrier2',
}, {
  CarrierId: '3',
  Name: 'carrier3',
}, {
  CarrierId: '4',
  Name: 'carrier4',
}];

const quotes = [{
  Direct: true,
  InboundLeg: {
    CarrierIds: ['1'],
    OriginId: '1',
    DestinationId: '2',
    DepartureDate: '2018-10-09',
  },
  OutboundLeg: {
    CarrierIds: ['2'],
    OriginId: '2',
    DestinationId: '1',
    DepartureDate: '2018-09-09',
  },
  MinPrice: '100',
  QuoteDateTime: '2018-01-01',
}, {
  Direct: false,
  InboundLeg: {
    CarrierIds: ['3'],
    OriginId: '3',
    DestinationId: '1',
    DepartureDate: '2018-10-09',
  },
  OutboundLeg: {
    CarrierIds: ['4'],
    OriginId: '1',
    DestinationId: '3',
    DepartureDate: '2018-09-09',
  },
  MinPrice: '99',
  QuoteDateTime: '2018-01-01',
}, {
  Direct: true,
  InboundLeg: {
    CarrierIds: ['3'],
    OriginId: '3',
    DestinationId: '1',
    DepartureDate: '2018-10-09',
  },
  OutboundLeg: {
    CarrierIds: ['4'],
    OriginId: '1',
    DestinationId: '3',
    DepartureDate: '2018-09-09',
  },
  MinPrice: '99',
  QuoteDateTime: '2018-01-01',
}];

expected.formatQuotesData = [{
  outbound:
  {
    carrier: { name: 'carrier2' },
    origin: { name: 'place2', type: 'type2', code: 'code2' },
    destination: { name: 'place1', type: 'type1', code: 'code1' },
    date: '2018-09-09',
  },
  inbound:
  {
    carrier: { name: 'carrier1' },
    origin: { name: 'place1', type: 'type1', code: 'code1' },
    destination: { name: 'place2', type: 'type2', code: 'code2' },
    date: '2018-10-09',
  },
  direct: true,
  currency: { Symbol: '£' },
  price: '100',
  quoteDate: '2018-01-01',
},
{
  currency: {
    Symbol: '£',
  },
  direct: false,
  inbound: {
    carrier: {
      name: 'carrier3',
    },
    date: '2018-10-09',
    destination: {
      code: 'code1',
      name: 'place1',
      type: 'type1',
    },
    origin: {
      code: 'code3',
      name: 'place3',
      type: 'type3',
    },
  },
  outbound: {
    carrier: {
      name: 'carrier4',
    },
    date: '2018-09-09',
    destination: {
      code: 'code3',
      name: 'place3',
      type: 'type3',
    },
    origin: {
      code: 'code1',
      name: 'place1',
      type: 'type1',
    },
  },
  price: '99',
  quoteDate: '2018-01-01',
},
{
  direct: true,
  outbound:
  {
    carrier: { name: 'carrier4' },
    origin: { name: 'place1', type: 'type1', code: 'code1' },
    destination: { name: 'place3', type: 'type3', code: 'code3' },
    date: '2018-09-09',
  },
  inbound:
  {
    carrier: { name: 'carrier3' },
    origin: { name: 'place3', type: 'type3', code: 'code3' },
    destination: { name: 'place1', type: 'type1', code: 'code1' },
    date: '2018-10-09',
  },
  currency: { Symbol: '£' },
  price: '99',
  quoteDate: '2018-01-01',
}];

module.exports = {
  routes,
  places,
  currency,
  expected,
  carriers,
  quotes,
};
