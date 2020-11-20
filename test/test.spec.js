const { expect } = require('chai');
const chai = require('chai');
const rp = require('request-promise');

const api = require('../src/api')
const categories = require('../src/controllers/categories')
const dates = require('../src/controllers/dates')

chai.should();

async function request(path) {
  return rp({
    url: `http://localhost:3000/insights/${path}`,
    method: 'GET',
    json: true,
    resolveWithFullResponse: true, // promise resolves with full response not just body. 
    simple: false   // ensures promise resolves even if statusCode is not 200 series.
  });
}

describe('Insights Service', () => {
  beforeEach( async function() {
    await dates.initialize()
    await categories.initialize()
  });

  describe('Api', () => {
    it('gets data from API', async () => {
      await api.getData()
      expect(api.data.length).to.not.equal(0)
    })
  })

  describe('/categories', () => {
    let categoryRecord = {
      "Food": {
        "totalNumber":24,
        "totalValue":2679,
        "averageValue":111.625
      }
    }
    categoryRecord = JSON.stringify(categoryRecord)

    context('gets page', () => {
      it('returns 200', async () => {
        const response = await request('/categories');
        response.statusCode.should.equal(200);
      });

      it('returns json data of aggregated categories', async () => {
        const response = await request('/categories');
        const data = JSON.stringify(response.body)
        expect(data.includes(categoryRecord)).to.equal(true)
      });
    });

    context('gets categories', () => {      
      const allCategories = ['Food', 'Miscellaneous', 'Charity', 'Travel', 'Transport']

      it('returns all categories', async () => {
        expect(categories.allNames.sort).to.equal(allCategories.sort)
      })
    })

    context('get aggregated list of category', () => {
      it('returns aggregated list of categories', async () => {
        const resultFromCategories = JSON.stringify(categories.getAggregatedList())
        expect(resultFromCategories.includes(categoryRecord)).to.equal(true)
      })
    })
  });

  describe('/cashflow', () => {
    let monthRecord = {
      "12/10/2020": {
        "totalNumber":2,
        "totalValue":47,
        "averageValue":23.5
      }
    }
    monthRecord = JSON.stringify(monthRecord)

    context('gets page', () => {
      it('returns 200', async () => {
        const response = await request('/cashflow');
        response.statusCode.should.equal(200);
      });

      it('returns json data of aggregated dates', async () => {
        const response = await request('/cashflow');
        const data = JSON.stringify(response.body)
        expect(data.includes(monthRecord)).to.equal(true)
      });
    });

    context('gets dates', () => {
      const firstDate = '01/10/2020'
      const lastDate = '04/11/2020'

      it('has first date', () => {
        expect(dates.allDates.includes(firstDate)).to.equal(true)
      })
      it('has last date', () => {
        expect(dates.allDates.includes(lastDate)).to.equal(true)
      })
    })

    context('get aggregated list of date', () => {
      it('returns aggregated list of spending by date', () => {
        const resultsFromdates = JSON.stringify(dates.getAggregatedList())
        expect(resultsFromdates.includes(monthRecord)).to.equal(true)
      })
    })
  });
});
