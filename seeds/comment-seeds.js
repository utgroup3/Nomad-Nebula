const { Comment } = require('../models');

const commentData = [
    {
        comment: "This is a comment",
        user_id: "5",
        post_id: "1",
    },
    {
        comment: "Hey its me, a comment",
        user_id: "4",
        post_id: "2",
    },
    {
        comment: "Ayo this is a comment",
        user_id: "3",
        post_id: "3",
    },
    {
        comment: "Hi, I'm a comment",
        user_id: "2",
        post_id: "4",
    },
    {
        comment: "issa comment",
        user_id: "1",
        post_id: "5",
    },
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;