const bp = require('body-parser')
const cors = require('cors')

module.exports = app => {
  app.use(bp.urlencoded({ extended: true }))
  app.use(bp.json())
  app.use(cors({
    origin: '*'
  }))
}