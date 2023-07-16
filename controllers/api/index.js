const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const reviewRoutes = require('./reviewRoutes');
const userRoute = require('./userRoute');

router.use('./comments', commentRoutes);
router.use('./reviews', reviewRoutes);
router.use('/users', userRoute);

module.exports = router;