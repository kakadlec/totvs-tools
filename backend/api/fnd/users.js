const config = require("../../config_files/databases.json")
const { databases } = require("../../config_files/databases.json")[0]

module.exports = app => {
  const get = async (req, res) => {
    let users = []

    for (let index = 0; index < databases.length; index++) {
      const temp = await app.modules.users.getUsers(databases[index])
      users.push(temp)
    }
    users = users.flat()
    res.status(200).send(users)
  }

  const drop = async (req, res) => {
    const usersToDrop = req.body
    //TODO Derrubar os usuário a partir do array recebido de id/banco
    const msg = await app.modules.users.disconnectUsers(id)
    res.status(200).send(msg)
  }

  return { get, drop }
}
