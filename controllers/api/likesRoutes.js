const router = require('express').Router();
const { Post, User, Comment, Like } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.post('/', withAuth, async (req, res) => {
  const isLiked = req.body.isLiked;

  if (isLiked) {
    // Code for adding a like
    Like.create({
      post_id: req.body.post_id,
      user_id: req.session.user_id,
      isLiked: isLiked
    }).then(dbLikeData => {
      res.json(dbLikeData)
    }).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  } else {
    // Code for removing a like
    Like.findOne({
      where: {
        post_id: req.body.post_id,
        user_id: req.session.user_id
      }
    }).then(like => {
      if (!like) {
        res.status(404).json({ message: 'No like found' });
      } else {
        like.destroy().then(() => {
          res.status(200).json({ message: 'Like removed successfully' });
        }).catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
});

module.exports = router;