var express = require('express');
var router = express.Router();
const knex = require('../db/knex')
// var Book = require('../models/book');
// var Author = require('../models/author');
// var Author_Book = require('../models/author_book');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/search', function(request, response, next) {
  var search = request.query.search;
  if (search) {
    knex.search(search).then(function (data) {
      response.render('search', {
        search: search,
        book: data.book,
        author: data.author
      });
    });
  } else {
    response.render('index');
  }
});

module.exports = router;
// router.get(/movies/:id, (req, res) =>{
// 	knex('movie')
// 	.select('movie.title', 'actor.name')
// 	.where('movie.id', req.params.id)
// 	.innerJoin('actor_movie', 'movie.id', 'actor_movie.movie.id')
// 	.innerJoin('actor', 'actor.id', 'actor_movie.actor_id')
// 	.then((movieInfo) =>{
// 		res.status(201).json({
// 			status:'succes',
// 			data:movieInfo
// 		})
// 	})
// })
