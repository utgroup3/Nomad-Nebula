const router = require('express').Router();
const { Post, User, Comment, Like } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.post('/', withAuth, async (req, res) => {
    const isLiked = req.body.isLiked;

    if (isLiked) {

        Like.create({
            post_id: req.body.post_id,
            user_id: req.session.user_id,
            isLiked: isLiked
        }).then(dbLikeData => {
            res.json(dbLikeData)
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }

});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const like = await Like.findByPk(req.params.id);

        if(!like || !like.isLiked) {
            return res.status(404).json({ message: "No like found or like is not current"})
        }

   
            await like.destroy();

            res.status(200).json({ message: "Like destroyed "})
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error." })
    }

 
})
  
  

module.exports = router;