const express = require('express');
const router = express.Router();
const posts = require('./postDb')
const validatePost = require('../middleware/validatePost')

router.get('/', (req, res) => {
  // do your magic!
  posts.get()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error retrieving the posts"
      })
    })
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error retrieving the post"
      })
    })
});

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
    .then(success => {
      if (!success) {
        return res.json({
          message: "Post could not be deleted"
        })
      }
      res.json({
        message: "The post was deleted successfully"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error deleting the post"
      })
    })
});

router.put('/:id', validatePostId(), validatePost(), (req, res) => {
  // do your magic!
  posts.update(req.params.id, req.body)
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error updating the post"
      })
    })
});

// custom middleware

function validatePostId() {
  // do your magic!
  return (req, res, next) => {
    posts.getById(req.params.id)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            message: "The post does not exist"
          })
        }
        next()
      })
  }
}

module.exports = router;
