const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to display all posts created by logged in user
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'createdAt'
      // This code creates a SELECT statement that calls the COUNT SQL function on the post_id column of the vote table. The resulting column is also aliased as vote_count
      [sequelize.fn('COUNT', sequelize.col('vote.post_id')), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
        include: {
          model: User, 
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('/profile', { posts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Route to render the edit post page
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'createdAt'
      [sequelize.fn('COUNT', sequelize.col('vote.post_id')), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    const post = dbPostData.get({ plain: true });
    res.render('editPost', { post, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Route to render the new post page
router.get('/new', withAuth, (req, res) => {
  res.render('editPost', { loggedIn: true });
});

// Route to render the view post page
router.get('/post/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'createdAt',
      [sequelize.fn('COUNT', sequelize.col('vote.post_id')), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment',
          'post_id',
          'user_id',
          'createdAt'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    const post = dbPostData.get({ plain: true });
    res.render('singleBlog', { post, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;