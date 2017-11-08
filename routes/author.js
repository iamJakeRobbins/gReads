var express = require('express');
var router = express.Router();
const knex = require('../db/knex')

router.get('/', function(req, res, next) {
	knex('author')
	.select()
	.then(author => {
  res.render('allAuthor', {author: author })
})
});


module.exports = router;
