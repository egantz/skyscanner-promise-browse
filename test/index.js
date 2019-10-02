
const assert = require('assert');
const sinon = require('sinon');

const skyscanner = require('../src/index');
const data = require('./data/skyscannerData');


describe('Skyscanner', () => {
  describe('.formatRoutesData', () => {
    it('should throw error if no args are passed in', async () => {
      try {
        await skyscanner.formatRoutesData();
      } catch (err) {
        assert.equal(err, 'Error: You must specify routes, places and a currency for formatRoutesData');
      }
    });
    it('should throw error if no places array is passed in', async () => {
      try {
        await skyscanner.formatRoutesData(data.routes);
      } catch (err) {
        assert.equal(err, 'Error: You must specify routes, places and a currency for formatRoutesData');
      }
    });
    it('should throw error if no currency array is passed in', async () => {
      try {
        await skyscanner.formatRoutesData(data.routes, data.places);
      } catch (err) {
        assert.equal(err, 'Error: You must specify routes, places and a currency for formatRoutesData');
      }
    });
    it('should format data as expected with normal input', async () => {
      const res = await skyscanner.formatRoutesData(data.routes, data.places, data.currency);
      assert.deepEqual(res, data.expected.formatRoutesData);
    });
  });
  describe('.formatQuotesData', () => {
    it('should throw error if no args are passed in', async () => {
      try {
        await skyscanner.formatQuotesData();
      } catch (err) {
        assert.equal(err, 'Error: You must specify quotes, places, carriers and a currency for formatQuotesData');
      }
    });
    it('should throw error if no places array is passed in', async () => {
      try {
        await skyscanner.formatQuotesData(data.quotes);
      } catch (err) {
        assert.equal(err, 'Error: You must specify quotes, places, carriers and a currency for formatQuotesData');
      }
    });
    it('should throw error if no currency array is passed in', async () => {
      try {
        await skyscanner.formatQuotesData(data.quotes, data.places);
      } catch (err) {
        assert.equal(err, 'Error: You must specify quotes, places, carriers and a currency for formatQuotesData');
      }
    });
    it('should throw error if no carriers array is passed in', async () => {
      try {
        await skyscanner.formatQuotesData(data.quotes, data.places, data.currency);
      } catch (err) {
        assert.equal(err, 'Error: You must specify quotes, places, carriers and a currency for formatQuotesData');
      }
    });
    it('should format data as expected with normal input', async () => {
      const res = await skyscanner.formatQuotesData(
        data.quotes,
        data.places,
        data.carriers,
        data.currency,
      );
      assert.equal(res.length, 3);
      assert.deepEqual(res, data.expected.formatQuotesData);
    });
    it('should return only 1 element when length is set', async () => {
      const res = await skyscanner.formatQuotesData(
        data.quotes,
        data.places,
        data.carriers,
        data.currency,
        1,
      );
      assert.equal(res.length, 1); // Bounded by passed in length
      assert.deepEqual(res, [data.expected.formatQuotesData[2]]);
    });
  });
  describe('.getLocationCode', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should call callAPI with defaults', async () => {
      const stub = sinon.stub(skyscanner, 'callAPI').resolves({
        Places: ['some place'],
      });

      const res = await skyscanner.getLocationCode('random');
      assert(stub.calledWith('autosuggest/v1.0/UK/GBP/en-GB/'));
      assert.equal(res, 'some place');
    });
    it('should call callAPI with passed in args', async () => {
      const stub = sinon.stub(skyscanner, 'callAPI').resolves({
        Places: ['some place'],
      });

      const res = await skyscanner.getLocationCode('random', '1', '2', '3');
      assert(stub.calledWith('autosuggest/v1.0/1/2/3/'));
      assert.equal(res, 'some place');
    });
  });
  describe('.browseQuotes', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should throw an error if no originAiport is passed', async () => {
      try {
        await skyscanner.browseQuotes();
      } catch (err) {
        assert.equal(err, 'Error: Origin aiport undefined. Required in browseQuotes');
      }
    });
    it('should call callAPI with passed in args', async () => {
      const stub = sinon.stub(skyscanner, 'callAPI').resolves({
        Quotes: data.quotes,
        Places: data.places,
        Carriers: data.carriers,
        Currencies: [data.currency],
      });

      const res = await skyscanner.browseQuotes('Prague', '1', '2', '3', '4', '5', '6');
      assert(stub.calledWith('browsequotes/v1.0/4/5/6/Prague/1/2/3'));
      assert.deepEqual(res, data.expected.formatQuotesData);
    });
    it('should call callAPI with default args', async () => {
      const stub = sinon.stub(skyscanner, 'callAPI').resolves({
        Quotes: data.quotes,
        Places: data.places,
        Carriers: data.carriers,
        Currencies: [data.currency],
      });

      const res = await skyscanner.browseQuotes('Prague');
      assert(stub.calledWith('browsequotes/v1.0/UK/GBP/en-UK/Prague/anywhere/anytime/anytime'));
      assert.deepEqual(res, data.expected.formatQuotesData);
    });
  });
  describe('.browseRoutes', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should throw an error if no originAiport is passed', async () => {
      try {
        await skyscanner.browseRoutes();
      } catch (err) {
        assert.equal(err, 'Error: Origin aiport undefined. Required in browseRoutes');
      }
    });
    it('should call callAPI with passed in args', async () => {
      const stub = sinon.stub(skyscanner, 'callAPI').resolves({
        Routes: data.routes,
        Places: data.places,
        Currencies: [data.currency],
      });

      const res = await skyscanner.browseRoutes('Prague', '1', '2', '3', '4', '5', '6');
      assert(stub.calledWith('browseroutes/v1.0/4/5/6/Prague/1/2/3'));
      assert.deepEqual(res, data.expected.formatRoutesData);
    });
    it('should call callAPI with default args', async () => {
      const stub = sinon.stub(skyscanner, 'callAPI').resolves({
        Routes: data.routes,
        Places: data.places,
        Currencies: [data.currency],
      });

      const res = await skyscanner.browseRoutes('Prague');
      assert(stub.calledWith('browseroutes/v1.0/UK/GBP/en-UK/Prague/anywhere/anytime/anytime'));
      assert.deepEqual(res, data.expected.formatRoutesData);
    });
  });
});
