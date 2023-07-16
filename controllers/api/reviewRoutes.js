const router = require('express').Router();
const Review = require('../../models/Review');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
        const getAllReviewData = await Review.findAll();
        res.status(200).json(getAllReviewData);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newReview = await Review.create(
            {
                ...req.body,
                user_id: req.session.user_id
            }
        );
        res.status(200).json(newReview)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const targetId = req.params.id;
        const deleteReview = await Review.destroy({ where: { id: targetId, user_id: req.session.user_id } });

        if (!deleteReview) {
            res.status(404).json({ message: 'No review found with this id!' });
            return
        }
        res.status(200).json(deleteReview)


    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router