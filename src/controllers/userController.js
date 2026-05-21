const { listUsers } = require('../data/store')

const getUsers = (req, res) => {
  res.json({ users: listUsers() })
}

module.exports = {
  getUsers
}
