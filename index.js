const {send} = require('micro')

module.exports = async (req, res) => {
  const statusCode = 200
  const data = { message: "Hello from 'The Future'!" }

  send(res, statusCode, data)
}
