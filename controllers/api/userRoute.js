const router = require('express').Router();
const { User, Review, Comment } = require('../../models');


// api/users routes

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!req.body) {
            return res.status(404).json({ message: 'please enter name/ email/ password ' })
        }
        const createUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = createUserData.id;
            req.session.logged_in = true;
            res.status(200).json(createUserData);
        })

    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'incorrect email or password, please try again' })
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'incorrect email or password, please try again' })
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'you are now logged in!' })
        })


    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end()
    }
})



module.exports = router;