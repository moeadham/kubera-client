const axios = require('axios');
const crypto = require('crypto');

class KuberaClient {
  constructor(apiKey, apiSecret, baseUrl = 'https://api.kubera.com') {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch the list of portfolios.
   */
  async getPortfolios() {
    const method = 'GET';
    const path = '/api/v3/data/portfolio';
    const body = '';
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = this._generateSignature(method, path, body, timestamp);

    const headers = {
      'Content-Type': 'application/json',
      'x-api-token': this.apiKey,
      'x-timestamp': timestamp.toString(),
      'x-signature': signature,
    };

    try {
      const response = await axios.get(`${this.baseUrl}${path}`, { headers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  /**
   * Fetch data for a specific portfolio.
   * @param {string} portfolioId - The ID of the portfolio.
   */
  async getPortfolioData(portfolioId) {
    const method = 'GET';
    const path = `/api/v3/data/portfolio/${portfolioId}`;
    const body = '';
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = this._generateSignature(method, path, body, timestamp);

    const headers = {
      'Content-Type': 'application/json',
      'x-api-token': this.apiKey,
      'x-timestamp': timestamp.toString(),
      'x-signature': signature,
    };

    try {
      const response = await axios.get(`${this.baseUrl}${path}`, { headers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  /**
   * Update a specific asset or debt item.
   * @param {string} itemId - The ID of the item (asset or debt).
   * @param {object} data - The data to update (allowed properties: name, description, value, cost).
   */
  async updateItem(itemId, data) {
    const method = 'POST';
    const path = `/api/v3/data/item/${itemId}`;
    const body = JSON.stringify(data);
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = this._generateSignature(method, path, body, timestamp);

    const headers = {
      'Content-Type': 'application/json',
      'x-api-token': this.apiKey,
      'x-timestamp': timestamp.toString(),
      'x-signature': signature,
    };

    try {
      const response = await axios.post(`${this.baseUrl}${path}`, data, { headers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  /**
   * Generate the signature required for authentication.
   * @private
   */
  _generateSignature(method, path, bodyData, timestamp) {
    const dataToSign = `${this.apiKey}${timestamp}${method.toUpperCase()}${path}${bodyData}`;
    return crypto.createHmac('sha256', this.apiSecret).update(dataToSign).digest('hex');
  }
}

module.exports = KuberaClient;
