let count = 0

module.exports = (req, res, next) => {
  res.locals.count = count
  count++
  next()
}
