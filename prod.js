const KuberaClient = require('./index.js'); // Adjust the path as needed

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const client = new KuberaClient(apiKey, apiSecret);

(async () => {
  try {
    // Fetch the list of portfolios
    const portfolios = await client.getPortfolios();
    console.log('Portfolios:', portfolios);

    // Use a portfolio ID from the list
    const portfolioId = portfolios.data[0].id;

    // Fetch data for a specific portfolio
    const portfolioData = await client.getPortfolioData(portfolioId);
    console.log('Portfolio Data:', portfolioData);

    // Use an item ID from the portfolio data
    console.log(portfolioData.data.asset);
    // Update an item (asset or debt)
    // const itemId = portfolioData.data.asset[0].id;
    // const updateData = {
    //   value: 400,
    //   name: 'Updated Asset Name',
    // };
    // const updateResponse = await client.updateItem(itemId, updateData);
    // console.log('Update Response:', updateResponse);
  } catch (error) {
    console.error('Error:', error);
  }
})();