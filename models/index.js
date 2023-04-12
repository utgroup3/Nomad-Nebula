const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const Like = require('./Like');

// ONE TO MANY: user may have posts/comments, each post/comment belongs to one user
User.hasMany(Post, {
    foreignKey: 'user_id',
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
})

User.belongsToMany(Post, {
    through: Like,
    as: 'Liked_posts',
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.belongsToMany(User, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

// Post can have many comments, but each comment belongs to one post. 
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'user_id'
});

// LIKES LOGIC

Like.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Like.belongsTo(Post, {
    foreignKey: 'post_id'
});


User.hasMany(Like, {
    foreignKey: 'user_id'
});

Post.hasMany(Like, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Comment, Like };