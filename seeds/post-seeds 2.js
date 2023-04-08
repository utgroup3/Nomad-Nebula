const { Post} = require('../models');

const postData = [
    {
        title: "This title rocks!",
        content: "I love this content!",
        user_id: 2,
    },
    {
        title: "Here is another title",
        content: "Testing content",
        user_id: 4
    },
    {
        title: "I love nebula",
        content: "heck yeah nebula",
        user_id: 1
    },
    {
        title: "ahhhhhh",
        content: "eyoooo",
        user_id: 5
    },
    {
        title: "Hello, I'm new here",
        content: "Please be nice",
        user_id: 3
    }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;