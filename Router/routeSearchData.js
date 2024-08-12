const express = require('express')
const routerSearch = express.Router();
const {searchData} = require('../Controller/searchData')


routerSearch.get('/search_policy', searchData)


module.exports = routerSearch;