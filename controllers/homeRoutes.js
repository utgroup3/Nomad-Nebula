const router = require('express').Router();
const { Post, User, Comment, Vote } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  res.render('landing-page', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/profile', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id // Filter the posts based on the logged-in user's ID
      },
      attributes: [
        'id',
        'title',
        'createdAt',
        'content',
        // Add any other required attributes
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        // Add any other required associations
      ]
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('profile', {
      user: req.session,
      posts
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/community', (req, res) => {
  Post.findAll({})
    .then(dbPostData => {
      res.render('community', {
        posts: dbPostData
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }); 
})

router.get('/create-post', (req, res) => {
  res.render('create-post', {
    user_id: req.session.user_id
  })
})

router.get('/night-sky', (req, res) => {
  res.render('night-sky', {
    user_id: req.session.user_id
  })
})
// GET all users
// router.get('/community', (req, res) => {
//   User.findAll({})
//     .then(dbUserData => res.json(dbUserData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
  // if (req.session.loggedIn) {
  //    res.redirect('/');
  //    return;
  // }
  res.render('login');
});

// render signup page
router.get('/signup', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/profile');
  //   return;
  // }
  res.render('signup');
});

// LOGOUT a user
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy()
    //   () => {
    //   res.status(204).end();
    // });
  }
    res.render('landing-page', {
      loggedIn: false,
    });
  // } else {
  //   res.status(404).end();
  // }
});


module.exports = router;