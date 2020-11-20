const { expect } = require('chai');
const chai = require('chai');
const rp = require('request-promise');

const api = require('../src/api')
const categories = require('../src/categories')

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
    });

    context('get categories', async () => {
      await categories.initialize()
      const allCategories = ['Food', 'Miscellaneous', 'Charity', 'Travel', 'Transport']

      it('has all categories', async () => {
        expect(categories.allNames).to.equal(allCategories)
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
