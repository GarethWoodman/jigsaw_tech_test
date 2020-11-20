const { expect } = require('chai');
const chai = require('chai');
const rp = require('request-promise');

const api = require('../src/api')
const categories = require('../src/controllers/categories')
const months = require('../src/controllers/months')

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
    await months.initialize()
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

    context('get categories', () => {      
      const allCategories = ['Food', 'Miscellaneous', 'Charity', 'Travel', 'Transport']

      it('has all categories', async () => {
        expect(categories.allNames.sort).to.equal(allCategories.sort)
      })
    })

    context('get aggregated List', () => {
      it('returns aggregated list of first category', async () => {
        const resultFromCategories = JSON.stringify(categories.getAggregatedList()[0])
        expect(resultFromCategories).to.equal(categoryRecord)
      })
    })
  });

  describe('/cashflow', () => {
    let monthRecord = {
      "10/01/2020": {
        "totalNumber":22,
        "totalValue":2923,
        "averageValue":132.86363636363637
      }
    }
    monthRecord = JSON.stringify(monthRecord)

    context('gets page', () => {
      it('returns 200', async () => {
        const response = await request('/cashflow');
        response.statusCode.should.equal(200);
      });

      it('returns json data of aggregated months', async () => {
        const response = await request('/cashflow');
        const data = JSON.stringify(response.body)
        expect(data.includes(monthRecord)).to.equal(true)
      });
    });

    context('get months', () => {
      const allMonths = ['10/01/2020', '11/01/2020']
      it('has all months', () => {
        expect(months.allDates.sort).to.equal(allMonths.sort)
      })
    })

    context('get breakdown of spending by month', () => {
      it('returns aggregated list of spending by month', () => {
        const resultFromMonths = JSON.stringify(months.getAggregatedList()[0])
        expect(resultFromMonths).to.equal(monthRecord)
      })
    })
  });
});
