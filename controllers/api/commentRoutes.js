const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id', 
      'comment', 
      'createdAt'
    ],
    include: {
      model: User,
      attributes: ['username']
    }
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // check session
  if (req.session) {
    Comment.create({
      comment: req.body.comment, // Change this line
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentData => {
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    if (commentData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this comment' });
      return;
    }
    await Comment.update(
      {
        comment: req.body.comment,
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    const updatedCommentData = await Comment.findByPk(req.params.id);
    res.json(updatedCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    if (commentData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this comment' });
      return;
    }
    await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;