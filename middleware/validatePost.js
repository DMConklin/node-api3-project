module.exports = () => {
    // do your magic!
    return (req, res, next) => {
      if (!req.body.text || !req.body.user_id) {
        return res.status(400).json({
          message: "Text and user id are required"
        })
      }
      next()
    }
  }