const config = require("../../config_files/databases.json")
const { databases } = require("../../config_files/databases.json")[0]

module.exports = app => {
  const get = async (req, res) => {
    // FOR AQUI PARA CADA DB! Pensar....
    const users = await app.modules.users.getUsers(databases[0])
    res.status(200).send(users)
  }

  const drop = async (req, res) => {
    const id = req.params.id
    const msg = await app.modules.users.disconnectUsers(id)
    res.status(200).send(msg)
  }

  return { get, drop }
}
