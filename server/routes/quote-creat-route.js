const express = require('express');

quoteRoute.post('/', async(req,res)=>{
    const {quote} = req.body;
    console.log(quote);
    const user = req.user._id;
    console.log(user);

    const newEntry = new Quote({
        item: quote,
        created_by: user
    });

    await newEntry.save()
    res.send('Quote have been save successfully', newEntry)

})

module.exports =  quoteRoute