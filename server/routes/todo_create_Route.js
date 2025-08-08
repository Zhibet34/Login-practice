const express = require('express');
const todoRoute = express.Router();
const Todo = require('../Template/toDo');

todoRoute.get('/', async(req,res)=>{
    const to_do_items = await Todo.find({});
    res.send(to_do_items)
});

todoRoute.post('/', async(req,res)=>{
    const {item} = req.body;
    console.log(item)
    const user = req.user
    const newEntry = new Todo({
        item: item,
        created_by: user
    });

    await newEntry.save();
    res.status(201).json({
        message: 'New Todo item have been added',
        added_item: newEntry.item,
    })
})

module.exports =  todoRoute