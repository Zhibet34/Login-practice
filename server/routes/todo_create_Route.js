const express = require('express');
const todoRoute = express.Router();
const Todo = require('../Template/toDo');

todoRoute.get('/', async(req,res)=>{
    const user = req.user.username
    const to_do_items = await Todo.find({});
    const object = {person: user, information: to_do_items}
    res.send(object)
});

todoRoute.post('/', async(req,res)=>{
    const {item} = req.body;
    console.log(item)
    const user = req.user
    console.log(user)
    const newEntry = new Todo({
        item: item,
        created_by: req.user._id
    });

    await newEntry.save();
    res.status(201).json({
        message: 'New Todo item have been added',
        added_item: newEntry.item,
    })
})

module.exports =  todoRoute