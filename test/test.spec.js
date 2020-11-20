const { expect } = require('chai');
const chai = require('chai');
const rp = require('request-promise');

const api = require('../src/api')
const categories = require('../src/controllers/categories')

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
  describe('Api', () => {
    it('gets data from API', async () => {
      await api.getData()
      expect(api.data.length).to.not.equal(0)
    })
  })

  describe('/categories', () => {
    context('gets page', () => {
      it('returns 200', async () => {
        const response = await request('/categories');
        response.statusCode.should.equal(200);
      });

      it('returns json data of aggregated categories', async () => {
        const response = await request('/categories');
        const data = response.body

        const result = {
          "Food": {
            "totalNumber":24,
            "totalValue":2679,
            "averageValue":111.625
          }
        }

        expect(JSON.stringify(data).includes(JSON.stringify(result))).to.equal(true)
      });
    });

    context('get categories', () => {      
      const allCategories = ['Food', 'Miscellaneous', 'Charity', 'Travel', 'Transport']

      it('has all categories', async () => {
        await categories.initialize()
        expect(categories.allNames.sort).to.equal(allCategories.sort)
      })
    })

    context('get aggregated List', () => {
      const firstResult = {
        "Food": {
          "totalNumber":24,
          "totalValue":2679,
          "averageValue":111.625
        }
      }

      it('returns aggregated list of first category', async () => {
        await categories.initialize()
        const firstResultFromList = JSON.stringify(categories.getAggregatedList()[0])
        expect(firstResultFromList).to.equal(JSON.stringify(firstResult))
      })
    })
  });

  describe('/cashflow', () => {
    context('it is yet to be implemented', () => {
      it('should return a 501 error', async () => {
        const response = await request('/cashflow');
        response.statusCode.should.equal(501);
      });
    });
  });
});
