const express = require('express');
const querystring = require('querystring')
const exchange = require('../exchange-rates/exchangeRates');

const routes = express.Router();

const router = () => {
    
    const exchangeRate = async (req, res) => {
        res.set('Cache-Control', 'public, max-age=300, s-max-age=600');
        let from = req.query.from;
        let to = req.query.to;
        try {
            const result = await exchange(from, to);
            console.log(result);
            res.status(200);
            res.json(result);
        } catch (ex) {
            console.log(ex);
            res.status(500);
            res.end();
        }

    }

    routes.get('/exchangeRate', exchangeRate);

    return routes;
}

module.exports = router();
