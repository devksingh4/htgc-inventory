
module.exports = (app, dbHandler) => {
  app.get('/', async (req, res) => {
    res.render('index')
  })
}