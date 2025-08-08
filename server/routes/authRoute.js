const express = require('express');
const authRoute = express.Router();

authRoute.get('/', (req,res)=>{
    try {
        if(req.isAuthenticated()){
            return res.json({
                isAuthenticated: true,
                user: req.user
            })
        }
        res.json({isAuthenticated: false})
    } catch (error) {
        console.error("auth check error", error);
        req.status(500).json({error: ' authentication check failed'})
    }
});

module.exports = authRoute;