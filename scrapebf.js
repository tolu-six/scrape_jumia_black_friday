const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const saveToExcel = fs.createWriteStream('black_friday_product.csv');

//Header
saveToExcel.write(`S\\N, Product Name, Black Friday Price, Original Price \n`)

const url = 'https://www.jumia.com.ng/mlp-black-friday';

request(url, (error, response, html) => {

    if(!error && response.statusCode === 200) {

        const $ = cheerio.load(html);

        const bf = $("div.info").each((index, element) => {

            const products = $(element).find("h3.name");
            const bf_prices = $(element).find("div.prc");
            const original_prices = $(element).find("div.old");

            const product_name = $(products[0]).text().trim();
            const bf_product_price = $(bf_prices[0]).text().trim();
            const prod_original_price = $(original_prices[0]).text().trim();
          

            saveToExcel.write(`${++index}, ${product_name}, ${bf_product_price}, ${prod_original_price} \n`);
        });

    }
});