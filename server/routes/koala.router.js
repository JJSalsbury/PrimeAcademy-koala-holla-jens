const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

//added static services for server
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log('error getting koalas', err)
        res.sendStatus(500);
    })
})

// POST


// PUT


// DELETE

module.exports = koalaRouter;