var express = require('express');
var router = express.Router();
const knex = require('../db/knex')

// functions to be refactored

// Title validation
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
})
});

router.get('/new', (req, res) =>{
	res.render('newBook')
})

// router for single book view
router.get('/:id', (req,res) =>{
	console.log(req.params.id);
	const id = req.params.id;
	console.log(id);
	if (typeof id != 'undefined') {
		knex('book')
		.select()
		.where ('id', id)
		.first()
		.then(book => {
		res.render('singleBook', book)
	})
	}else {
		res.status(500)
		res.render('error', {
			message: 'invalid'
	})
}
})

// router for single book edit view
router.get('/:id/editBook', (req,res) => {
	const id = req.params.id;
	knex('book')
	.select()
	.where('id', id)
	.first()
	.then(book =>{
	res.render('editBook', book)
})
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

// Put request to update existing book entry
router.put('/:id', (req, res) =>{
validator(req,res,(book)=> {
	knex('book')
	.where('id', req.params.id)
	.update(book, 'id')
	.then(ids =>{
		const id = ids[0]
		res.redirect(`/book/${id}`)
	})
})
})

module.exports = router;
