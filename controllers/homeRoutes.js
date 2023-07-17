const router = require('express').Router();
const { Review, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const getAllReviewData = await Review.findAll({
            include: {
                model: User,
                attributes: ['name']
            }
        });

        // to modify the data only show what we need
        const reviews = getAllReviewData.map((review) => review.get({ plain: true }));


        res.render('homepage', {
            reviews,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/review/:id', async (req, res) => {
    try {
        const targetReviewId = req.params.id;
        const getAllComment = await Review.findByPk(targetReviewId, {
            include: {
                model: Comment,
                attributes: ['comment_detail', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
        });

        const review = getAllComment.get({ plain: true })
        console.log(review);
        res.render('review', {
            review,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/dashboard', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Review }],
        });

        const user = userData.get({ plain: true });
        console.log(user);
        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})








router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile')
    }
    res.render('login')
})











module.exports = router;