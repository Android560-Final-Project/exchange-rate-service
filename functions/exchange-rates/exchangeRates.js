const axios = require('axios');
const moment = require('moment');
const currencies = require('../models/currencies');
const exchangeRates = [];
const exchange = async (from, to) => {
    if(!currencies.some(currency => (currency === from || currency === to))) {
        return Promise.reject(new Error('unsupported currency type'));
    }
    let exchangeRate = exchangeRates.find(rate => rate.currency === from);
    return new Promise(async (resolve, reject) => {
        if(!exchangeRate || exchangeRate.lastUpdated < moment().subtract(1, 'days')) {
            // call api
            const currencyExchange = await axios.get(`https://prime.exchangerate-api.com/v5/<api_key>/latest/${from}`);
            const newRate = {
                currency: from,
                lastUpdated: moment(),
                exchangeRates: currencyExchange.data.conversion_rates
            };
            if (exchangeRate) {
                const index = exchangeRates.findIndex(rate => rate.currency === from);
                exchangeRates[index] = newRate;
                resolve(newRate.exchangeRates[to]);
            } else {
                exchangeRates.push(newRate);
                resolve(newRate.exchangeRates[to]);
            }
        } else {
            //call cache
            resolve(exchangeRate.exchangeRates[to]);
        }
    })
    
}

module.exports = exchange;