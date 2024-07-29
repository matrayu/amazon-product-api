const AmazonScraper = require('./lib/Amazon');

const options = {
    scrapeType: 'asin',
    asin: ['B07DD3HVJZ', 'B000NWA1A4'], // Example ASINs
    geo: {
        host: 'www.amazon.com', // Adjust based on the region
        currency: 'USD', // Adjust currency if needed
        symbol: '$', // Adjust currency symbol if needed
        price_format: function (priceString) {
            // Example price formatting function
            const price = priceString.replace(/[^\d.]/g, '');
            return parseFloat(price);
        },
        review_date: function (dateString) {
            // Example review date parsing function
            const date = new Date(dateString);
            return date.toISOString();
        },
        best_seller: function (bestSellerString) {
            // Example best seller parsing function
            const rank = parseInt(bestSellerString.replace(/[^\d]/g, ''), 10);
            return rank ? { rank } : null;
        },
        product_information: {
            id: ['#detailBulletsWrapper_feature_div', '#prodDetails', '#detail-bullets'],
            fields: {
                'Product Dimensions': { key: 'dimensions' },
                'Item Weight': { key: 'weight' },
                'Date First Available': { key: 'available_from' },
                Manufacturer: { key: 'manufacturer' },
                ASIN: { key: 'asin' },
                'Item model number': { key: 'model_number' },
                Department: { key: 'department' },
            },
        },
        variants: {
            split_text: ': ',
        },
    },
    cookie: '', // Provide a valid cookie string if needed
    bulk: false, // Set to true if you want to scrape in bulk mode
    proxy: [], // Provide proxies if necessary
    cli: false, // Set to true if running from CLI
    sort: false, // Set to true if sorting is needed
    discount: false, // Set to true if filtering by discount
    rating: [1, 5], // Set rating range if needed
    timeout: 5000, // Adjust timeout as needed
    randomUa: false, // Set to true for random user agents
    referer: '', // Set referer if needed
    filetype: 'json', // Export both JSON and CSV
    reviewFilter: {}, // Provide review filters if needed
};

const scraper = new AmazonScraper(options);

scraper
    .startScraper()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
