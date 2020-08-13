const express = require('express');
const router = express.Router();
const db = require('./userDb')
const postDb = require('../posts/postDb')

router.post('/', validateUser(), async (req, res) => {
  // do your magic!
  try {
    const test = await db.insert(req.body)
    res.json(test)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error posting user'
    })
  }
});

router.post('/:id/posts', validateUserId(), validatePost(), async (req, res) => {
  // do your magic!
  try {
    const post = await postDb.insert({...req.body, user_id: req.params.id})
    res.json(post)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error creating the post'
    })
  }
});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await db.get()
    res.json(users)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error retrieving users'
    })
  }
});

router.get('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  try {
    res.json(req.user)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error retrieving the user'
    })
  }
});

router.get('/:id/posts', validateUserId(), async (req, res) => {
  // do your magic!
  try {
    const userPosts = await db.getUserPosts(req.params.id)
    if (userPosts.length < 1) {
      return res.json({
        message: 'There are no posts by this user'
      })
    }
  res.json(userPosts)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error while retrieving posts'
    })
  }
});

router.delete('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  try {
    const success = await db.remove(req.params.id)
    res.json({
      ...req.user,
      status: 'deleted'
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error while deleting user'
    })
  }
});

router.put('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  try {
    await db.update(req.body)
    const user = await db.getById(req.params.id)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'There was an error updating the user'
    })
  }
});

//custom middleware

function validateUserId() {
  // do your magic!
  return async (req,res,next) => {
    try {
      const user = await db.getById(req.params.id)
      if (!user) {
        return res.status(404).json({
          message: 'invalid user id'
        })
      }
      req.user = user
      next()
    } catch(err) {
      console.log(err)
      next(err)
    }
  }
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    try {
      if (!req.body.name) {
        return res.status(400).json({
          message: 'missing required name field'
        })
      }
      next()
    } catch(err) {
      console.log(err)
      next(err)
    }
  }
}

function validatePost() {
  // do your magic!
  try {
    return (req,res,next) => {
      if (!req.body) {
        return res.status(400).json({
          message: 'missing post data'
        })
      }
      if (!req.body.text) {
        return res.status(400).json({
          message: 'missing required text field'
        })
      }
      next()
    }
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports = router;
