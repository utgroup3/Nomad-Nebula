const router = require('express').Router();
const { Post, User, Comment, Vote } = require('../models');
const sequelize = require('../config/connection');


// router.get('/', (req, res) => {
//   Post.findAll({
//     attributes: [
//       'id',
//       'title',
//       'createdAt',
//       'content',
//       [sequelize.fn('COUNT', sequelize.col('votes.post_id')), 'vote_count']
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['id', 'username']
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
//         include: {
//           model: User,
//           attributes: ['id', 'username']
//         }
//       },
//       {
//         model: Vote,
//         attributes: [],
//       }
//     ],
//     group: ['post.id'],

//   })
//   .then(dbPostData => {
//     const posts = dbPostData.map(post => post.get({ plain: true }));
//     res.render('homepage', { 
//       posts, 
//       loggedIn: req.session.loggedIn,
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'createdAt',
      'content',
      [sequelize.fn('COUNT', sequelize.col('votes.post_id')), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      },
      {
        model: Vote,
        attributes: [],
      }
    ],
    group: ['post.id'],

  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.loggedIn,
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

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
// get single post
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

//login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;