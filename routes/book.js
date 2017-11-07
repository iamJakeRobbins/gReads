var express = require('express');
var router = express.Router();
const knex = require('../db/knex')

/* GET home page. */
router.get('/', function(req, res, next) {
	knex('book')
	.select()
	.then(book => {
  res.render('allBook', {book: book })
	console.log({book: book.length});
})
});

module.exports = router;
