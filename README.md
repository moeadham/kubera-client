# Unofficial Kubera API Client

Based off of the API from here (v3):
https://docs.google.com/document/d/1G6YjL27eOrfBQZPS6H91ZFDGZ97YnS6Ra5Nnsth7CYg/view?tab=t.0 

## Usage

Install the package:
```bash
npm install kubera-client
```

How to use the client:
```js
const KuberaClient = require('kubera-client');
const client = new KuberaClient(apiKey, apiSecret);

(async () => {
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
    const itemId = portfolioData.data.asset[0].id;
    const updateData = {
      value: 400,
      name: 'Updated Asset Name',
    };
    const updateResponse = await client.updateItem(itemId, updateData);
    console.log('Update Response:', updateResponse);
})();
```

## Testing

```bash
npm test
```

Or, if you want to test against the production API:
```bash
cp .env.sample .env
```

Put your API keys in the .env file, then run:
```bash
./prodDemo.sh
```

## License

MIT

## Contributing

Feel free to open issues or submit PRs!
