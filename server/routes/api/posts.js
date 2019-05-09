const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET Post 
router.get('/', async (req, res) =>{

const posts = await loadPostsCollection();

res.send(await posts.find({}).toArray());
	
});

// ADD Post
router.post('/', async(req, res)=>{
	const posts = await loadPostsCollection();

	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date()
	});

	res.status(201).send();
});

// DELETE Post
router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();

	await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id) });

	res.status(200).send();
});


async function loadPostsCollection(){
	const client = await mongodb.MongoClient.connect('mongodb+srv://kidikudazi:ZwU1zehHFwemk32k@nodekb-etupp.mongodb.net/test?retryWrites=true', {
		useNewUrlParser:true
	});

	return client.db('nodekb').collection('posts');
}
module.exports = router