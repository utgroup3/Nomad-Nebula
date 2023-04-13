const router = require('express').Router();
const { Post, User, Comment, Like } = require('../models');
const { format_date } = require('../utils/helpers')
const sequelize = require('../config/connection');


// Define a GET route for the homepage, which renders the landing-page view
router.get('/', (req, res) => {
  res.render('landing-page', {
    loggedIn: req.session.loggedIn,
  });
});

// Define a GET route for the user's profile, which renders the profile view
// This route retrieves the user's data and all posts that the user has created
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
        'createdAt',
        'profilePicture'
      ]
    });

    // Retrieve all posts created by the user
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'createdAt',
        'content',
        'image',
      ],
      include: [
        {
          model: User,
          attributes: [
            'username',
            'profilePicture',
            'location'
          ]
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: [
              'username',
              'profilePicture',
              'location'
            ]
          }
        }
      ],
      order: [
        [
          'createdAt',
          'DESC'
        ]
      ]
    });

    // Format the user's join date and convert the posts to plain objects
    const user = dbUserData.get({ plain: true });
    user.joinedDate = format_date(user.createdAt);
    const posts = dbPostData.map(post => post.get({ plain: true }));

    // Render the profile view and pass in the user and post data
    res.render('profile', {
      user,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define a GET route for the community page, which renders the community view
// This route retrieves all posts and their associated user and comment data
router.get('/community', async (req, res) => {
  try {
    // Retrieve the current user's data
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'id',
        'username',
        'location',
        'birthday',
        'createdAt',
        'profilePicture'
      ]
    });

    // Retrieve the current user's data
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: [
            'username',
            'profilePicture',
            'location'
          ]
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: [
              'id',
              'username',
              'profilePicture'
            ]
          }
        }
      ],
      order: [
        [
          'createdAt',
          'DESC'
        ]
      ]
    });

    // Retrieve all posts that the current user has liked
    const likedPosts = await Like.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'post_id'
      ],
    });

    const likedPostIds = likedPosts.map((like) => like.post_id);

    const user = dbUserData.get({ plain: true });
    const posts = dbPostData.map((post) => {
      const postObj = post.get({ plain: true });
      postObj.isLiked = likedPostIds.includes(postObj.id);
      postObj.comments.forEach(comment => comment.loggedInUser = req.session.user_id);
      return postObj;
    });
    console.log(posts);
    const baseURL = `${req.protocol}://${req.get('host')}`;

    res.render('community', {
      user,
      posts,
      baseURL,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create-post', async (req, res) => {
  try {
    // Convert sequelize object data into plain object data
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'profilePicture'
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

router.get('/user-likes', async (req, res) => {
  try {

    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'profilePicture'
      ],
    });

    // Retrieve all posts that are currently liked
    const likedPosts = await Like.findAll({
      where: {
        user_id: req.session.user_id, 
        isLiked: true 
      },
      include: [{
        model: Post, include: [User,
          {
            model: Comment,
            include: [
              User
            ],
          }]
      }]
    });

    const user = dbUserData.get({ plain: true });
    const likes = likedPosts.map(post => post.get({ plain: true }));

    res.render('user-likes', {
      likes,
      user
    })

    // If there are no liked posts, send a 404 response
    if (likedPosts.length === 0) {
      console.log('No liked posts found');
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

router.get('/night-sky', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'profilePicture',
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

router.get('/edit-profile', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: [
        'username',
        'profilePicture',
      ],
    });

    const user = dbUserData.get({ plain: true });
    res.render('edit-profile', {
      user,
      user_id: req.session.user_id,
      username: req.session.username,
      birthday: req.session.birthday,
      location: req.session.location
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// get comments for a single post
router.get('/post/:id/comments', (req, res) => {
  Comment.findAll({
    where: {
      post_id: req.params.id
    },
    attributes: [
      'id',
      'comment',
      'post_id',
      'user_id',
      'createdAt'
    ],
    include: {
      model: User,
      attributes: [
        'id',
        'username',
      ]
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

// Route to render the edit post page
router.get('/editPost/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'content',
        'title',
        'image',
        'createdAt',
      ],
    })


    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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