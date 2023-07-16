const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/:review_id', withAuth, async (req, res) => {
    try {
        const getAllComment = await Comment.findAll({ where: { review_id: req.params.review_id } });

        res.status(200).json(getAllComment)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.post('/', withAuth, async (req, res) => {
    try {
        const createNewComment = await Comment.create(
            {
                ...req.body,
                user_id: req.session.user_id
            }
        );
        res.status(200).json(createNewComment)
    } catch (error) {
        res.status(400).json(error)
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await Comment.delete({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!deleteComment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return
        }
        res.status(200).json('succeeded')
    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;
