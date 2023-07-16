const router = require('express').Router();
const { Review, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const getAllReviewData = Review.findAll();

        res.render('homepage')
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;