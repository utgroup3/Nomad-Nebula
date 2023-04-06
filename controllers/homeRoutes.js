const router = require('express').Router();
const { Post, User, Comment, Vote } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  res.render('landing-page', {
    loggedIn: req.session.loggedIn,
  });
});

// get comments for a single post
router.get('/post/:id/comments', (req, res) => {
  Comment.findAll({
    where: {
      post_id: req.params.id
    },
    attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
    include: {
      model: User,
      attributes: ['id', 'username']
    }
  })
    .then(dbCommentData => {
      const comments = dbCommentData.map(comment => comment.get({ plain: true }));

      res.render('comments', {
        comments,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single post my id
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id', 
      'title', 
      'content', 
      'createdAt',
      [sequelize.fn('COUNT', sequelize.col('votes.post_id')), 'vote_count']
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
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('singleBlog', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// render signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  res.render('signup');
});

module.exports = router;