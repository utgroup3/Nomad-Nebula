const router = require('express').Router();
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');
const upload = require('../../utils/imageUpload.js').single('image');
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
      [sequelize.fn('COUNT', sequelize.col('vote.post_id')), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
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
          attributes: ['username']
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
      [sequelize.fn('COUNT', sequelize.col('vote.post_id')), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
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
          attributes: ['username']
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
router.post('/', withAuth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      try {
        console.log(req.body);
        const postData = {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
          user_id: req.session.user_id
        };

        if (req.file) {
          postData.image = 'uploads/' + req.file.filename;
        }

        const dbPostData = await Post.create(postData);
        res.json(dbPostData);

        console.log(dbPostData)
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  });
});

router.put('/votePost', withAuth, (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.votePost({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(voteData => res.json(voteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
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