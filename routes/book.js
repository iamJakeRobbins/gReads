var express = require('express');
var router = express.Router();
const knex = require('../db/knex')

// functions to be refactored
function validEntry(book){
	return typeof book.title == 'string' &&
		book.title.trim() != ''
}

function validator(req,res,callback){
	if(validEntry(req.body)){
		console.log(req.body);
		const book = {
			title: req.body.title,
			genre: req.body.genre,
			cover: req.body.cover,
			description: req.body.description,
			author1: req.body.author1
		};
		callback(book);
} else {
	res.status(500)
	res.render('error', {
		message: 'that aint a real book fella'
	})
}
}

/* GET all books page. */
router.get('/', function(req, res, next) {
	knex('book')
	.select()
	.then(book => {
  res.render('allBook', {book: book })
	console.log({book: book.length});
})
});
router.get('/new', (req, res) =>{
	res.render('newBook')
})

// Post a new book and redirect to all books
router.post('/', (req,res) =>{
	validator(req,res, (book) =>{
		knex('book').insert(book,'id')
		.then(ids =>{
			const id = ids[0];
			console.log(id)
			res.redirect('/book')
		})
	})
})

module.exports = router;
