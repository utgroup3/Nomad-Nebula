const router = require('express').Router();
const { Post, User, Comment, Vote } = require('../models');
const { format_date } = require('../utils/helpers')
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  res.render('landing-page', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/profile', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'location',
        'birthday',
        'createdAt'
      ]
    });

    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'createdAt',
        'content',
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });

    const user = dbUserData.get({ plain: true });
    user.joinedDate = format_date(user.createdAt);
    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('profile', {
      user,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/community', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({});
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render('community', {
      posts: dbPostData,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create-post', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render('create-post', {
      user_id: req.session.user_id,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/night-sky', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
      ],
    });

    const user = dbUserData.get({ plain: true });

    res.render('night-sky', {
      user_id: req.session.user_id,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit-profile', (req, res) => {
  res.render('edit-profile', {
    user_id: req.session.user_id,
    username: req.session.username,
    birthday: req.session.birthday,
    location: req.session.location
  })
})

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
  res.render('login');
});

// render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// LOGOUT a user
router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy()
  }
  res.render('landing-page', {
    loggedIn: false,
  });
});


module.exports = router;