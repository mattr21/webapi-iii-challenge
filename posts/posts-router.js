const express = require('express');

const postDB = require('./postDb.js');

const router = express.Router();

// GET - retrieve all posts
router.get('/', async (req, res) => {
    try {
        const posts = await postDB.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the posts' });
    }
});

// GET - retrieve specific post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await postDB.getById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message:'Post not found.' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error retrieving the post.' });
    }
});

// POST - add new post
router.post('/', async (req, res) => {
    try {
        const post = await postDB.insert(req.body);

        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding post.' })
    }
});

// DELETE - delete post
router.delete('/:id', async (req, res) => {
    try {
        const count = await postDB.remove(req.params.id);

        if (count > 0) {
            res.status(200).json({ message: 'The post has been deleted.' });
        } else {
            res.status(404).json({ message: 'The post could not be found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing post.' });
    }
});

// PUT - change post
router.put('/:id', async (req, res) => {
    try {
        const post = await postDB.update(req.params.id, req.body);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post could not be found.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating post.' });
    }
});

module.exports = router;