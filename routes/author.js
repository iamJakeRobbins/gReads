var express = require('express');
var router = express.Router();
const knex = require('../db/knex')

function validEntry(author){
	return typeof author.name == 'string' &&
		author.name.trim() != ''
}

function validator(req,res,callback){
	if(validEntry(req.body)){
		console.log(req.body);
		const author = {
			name: req.body.name,
			portrait: req.body.portrait,
			bio: req.body.bio,
		};
		callback(author);
} else {
	res.status(500)
	res.render('error', {
		message: 'that aint a real author fella'
	})
}
}

router.get('/new', (req, res) =>{
	res.render('newauthor')
})

router.get('/', function(req, res, next) {
	knex('author')
	.select()
	.then(author => {
  res.render('allAuthor', {author: author })
})
});

router.get('/:id/editAuthor', (req,res) => {
	const id = req.params.id;
	knex('author')
	.select()
	.where('id', id)
	.first()
	.then(author =>{
	res.render('editAuthor', author)
})
})

router.get('/:id', (req,res) =>{
	console.log(req.params.id);
	const id = req.params.id;
	console.log(id);
	if (typeof id != 'undefined') {
		knex('author')
		.select()
		.where ('id', id)
		.first()
		.then(author => {
		res.render('singleAuthor', author)
	})
	}else {
		res.status(500)
		res.render('error', {
			message: 'invalid'
	})
}
})



// Post a new author and redirect to all authors
router.post('/', (req,res) =>{
	validator(req,res, (author) =>{
		knex('author').insert(author,'id')
		.then(ids =>{
			const id = ids[0];
			console.log(id)
			res.redirect('/author')
		})
	})
})

router.put('/:id', (req, res) =>{
validator(req,res,(author)=> {
	knex('author')
	.where('id', req.params.id)
	.update(author, 'id')
	.then(ids =>{
		const id = ids[0]
		res.redirect('/author/')
	})
})
})

module.exports = router;
