const router = require('express').Router();
const { Post, User, Comment, Like } = require('../../models');
const withAuth = require('../../utils/auth');
const postUpload = require('../../utils/postPicture.js');
const sequelize = require('../../config/connection');

// GET all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'image',
      'createdAt',
      'content',
    ],
    include: [
      {
        model: User,
        attributes: [
          'username'
        ]
      },
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
          attributes: [
            'username'
          ]
        }
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single post by id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
      'createdAt',
    ],
    include: [
      {
        model: User,
        attributes: [
          'username'
        ]
      },
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
          attributes: [
            'username'
          ]
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new post
router.post('/', withAuth, postUpload.single('image'), async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    };

    console.log(req.file);
    // If an image was uploaded, add its path to the newPost object
    if (req.file) {
      newPost.image = `/uploads/postPicture/${req.file.filename}`;
    }

    const postData = await Post.create(newPost);

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a post by ID
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a post by ID
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;