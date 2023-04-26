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

const cloudinary = require('../../cloudinary');

// UPDATE a post by ID
router.put('/:id', withAuth, postUpload.single('image'), async (req, res) => {
  const updateData = {
    title: req.body.title,
    content: req.body.content,
  };

  // If an image was uploaded, upload it to Cloudinary and add its URL to the updateData object
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
  }

  Post.update(updateData, {
    where: {
      id: req.params.id
    },
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

// UPDATE a post by ID
// router.put('/:id', withAuth, postUpload.single('image'), (req, res) => {
//   const updateData = {
//     title: req.body.title,
//     content: req.body.content,
//   };

//   if (req.file) {
//     updateData.image = `/uploads/postPicture/${req.file.filename}`;
//   }

//   Post.update(updateData, {
//     where: {
//       id: req.params.id
//     },
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// DELETE a post by ID
router.delete('/:id', withAuth, (req, res) => {
  console.log(`Received DELETE request for post ID ${req.params.id}`);
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