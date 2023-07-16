const sequelize = require('../config/connection');
const { User, Comment, Review } = require('../models');

const commentData = require('./commentData.json');
const reviewData = require('./reviewData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const review = await Review.bulkCreate(reviewData, {
        returning: true
    });

    const comments = await Comment.bulkCreate(commentData, {
        returning: true
    });


    process.exit(0);

}

seedDatabase();