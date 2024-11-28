// test/kubera.test.js
const { expect } = require('chai');
const nock = require('nock');
const KuberaClient = require('../index.js'); // Adjust the path as needed

describe('KuberaClient', function () {
  const apiKey = 'test-api-key';
  const apiSecret = 'test-api-secret';
  const baseUrl = 'https://api.kubera.com';

  let client;

  before(function () {
    client = new KuberaClient(apiKey, apiSecret, baseUrl);
  });

  afterEach(function () {
    // Clean all interceptors after each test
    nock.cleanAll();
  });

  describe('getPortfolios()', function () {
    it('should fetch the list of portfolios', async function () {
      const mockResponse = {
        data: [
          {
            id: 'portfolio-1',
            name: 'Portfolio One',
            currency: 'USD',
          },
          {
            id: 'portfolio-2',
            name: 'Portfolio Two',
            currency: 'EUR',
          },
        ],
        errorCode: 0,
      };

      // Mock the API response
      nock(baseUrl)
        .get('/api/v3/data/portfolio')
        .reply(200, mockResponse);

      const response = await client.getPortfolios();
      expect(response).to.deep.equal(mockResponse);
    });
  });

  describe('getPortfolioData()', function () {
    it('should fetch data for a specific portfolio', async function () {
      const portfolioId = 'portfolio-1';
      const mockResponse = {
        data: {
          asset: [
            {
              id: 'asset-1',
              name: 'Asset One',
              value: {
                amount: 1000,
                currency: 'USD',
              },
              // Other asset fields...
            },
          ],
          debt: [],
          id: 'portfolio-1',
          name: 'Portfolio One',
          ticker: 'USD',
          timestamp: 1620000000,
          document: [],
          insurance: [],
        },
        errorCode: 0,
      };

      // Mock the API response
      nock(baseUrl)
        .get(`/api/v3/data/portfolio/${portfolioId}`)
        .reply(200, mockResponse);

      const response = await client.getPortfolioData(portfolioId);
      expect(response).to.deep.equal(mockResponse);
    });
  });

  describe('updateItem()', function () {
    it('should update a specific asset or debt item', async function () {
      const itemId = 'asset-1';
      const updateData = {
        value: 1500,
        name: 'Updated Asset Name',
      };
      const mockResponse = {
        data: {
          success: true,
        },
        errorCode: 0,
      };

      // Mock the API response
      nock(baseUrl)
        .post(`/api/v3/data/item/${itemId}`, updateData)
        .reply(200, mockResponse);

      const response = await client.updateItem(itemId, updateData);
      expect(response).to.deep.equal(mockResponse);
    });
  });
});
