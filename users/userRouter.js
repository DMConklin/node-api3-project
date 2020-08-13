const express = require('express');
const router = express.Router();
const db = require('./userDb')

router.post('/', async (req, res) => {
  // do your magic!
});

router.post('/:id/posts', async (req, res) => {
  // do your magic!
});

router.get('/', async (req, res) => {
  // do your magic!

});

router.get('/:id', async (req, res) => {
  // do your magic!
});

router.get('/:id/posts', async (req, res) => {
  // do your magic!
});

router.delete('/:id', async (req, res) => {
  // do your magic!
});

router.put('/:id', async (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  try {
    return (req,res,next) => {
      const user = db.getById(req.params.id)
      if (!user) {
        return res.status(404).json({
          message: 'invalid user id'
        })
      }
      next()
    }
  } catch(err) {
    console.log(err)
    next(err)
  }
}

function validateUser(req, res, next) {
  // do your magic!
  try {
    return (req, res, next) => {
      if (!req.body.name) {
        return res.status(400).json({
          message: 'missing required name field'
        })
      }
      next()
    }
  } catch(err) {
    console.log(err)
    next(err)
  }
}

function validatePost(req, res, next) {
  // do your magic!
  try {
    return (req,res,next) => {
      if (!req.body) {
        return res.status(400).json({
          message: 'missing post data'
        })
      }
      if (!req.body.text) {
        res.status(400).json({
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
