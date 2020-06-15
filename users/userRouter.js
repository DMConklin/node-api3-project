const express = require('express');
const router = express.Router();
const users = require('./userDb')
const posts = require('../posts/postDb')
const validatePost = require('../middleware/validatePost')

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error adding the user"
      })
    })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  posts.insert(req.params.id)
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error making the post"
      })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error retrieving users"
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.getById(req.param.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error retrieving the user"
      })
    })
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error retrieving the user posts"
      })
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    ,then(success => {
      if (!success) {
        return res.json({
          message: "Could not delete the user"
        })
      }
      res.json({
        message: "The user was deleted successfully"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error deleting the user"
      })
    })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  // do your magic!
  users.update(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was an error updating the message"
      })
    })
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    users.getById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: "The user id does not exist"
          })
        }
        next()
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "There was an error retrieving the user"
        })
      })
  }
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Name is required"
      })
    }
    next()
  }
}

module.exports = router
