var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
module.exports = router;
