const express = require('express');

const userDB = require('./userDb.js');

const router = express.Router();

function confirmUpper(req, res, next) {
    if (req.body.name === req.body.name.toUpperCase()) {
        next();
    } else {
        res.status(400).json({ message: 'The user name must be in all caps.' });
    }
}

// GET - retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await userDB.get(req.query);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the users' });
    }
});

// GET - retrieve specific user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await userDB.getById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the user.'  });
    }
});

// GET - retrieve specific user's posts
router.get('/:id/posts', async (req, res) => {
    try {
        const posts = await userDB.getUserPosts(req.params.id);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting the posts for the user.' })
    }
});

// POST - add new user
router.post('/', confirmUpper, async (req, res) => {
    try {
        const user = await userDB.insert(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding user.' });
    }
});

// DELETE - delete user
router.delete('/:id', async (req, res) => {
    try {
        const count = await userDB.remove(req.params.id);

        if (count > 0) {
            res.status(200).json({ message: 'The user has been deleted.' });
        } else {
            res.status(404).json({ message: 'The user could not be found.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error removing the user.' });
    }
});

// PUT - change user
router.put('/:id', confirmUpper, async (req, res) => {
    try {
        const user = await userDB.update(req.params.id, req.body);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'The user could not be found.' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating the user.' });
    }
});

module.exports = router;