const express = require('express');

const viewRoute = express.Router();
const quotes = require('../Template/quotes');

viewRoute.get('/', async(req,res)=>{
    const quotesData = await quotes.find({});
    res.send(quotesData)
});

export default viewRoute