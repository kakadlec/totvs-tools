const { oe_path } = require("../config_files/config.json")
const Shell = require("node-powershell")
const { pathToDatabases } = require("../config_files/databases.json")[0]

module.exports = app => {
  const getUsers = async database => {
    const params = "\\proshut"
    const command = `${oe_path}${params} ${pathToDatabases}${database} -C list`
    const ps = new Shell({
      executionPolicy: "Bypass",
      noProfile: true
    })
    ps.addCommand(command)
    const output = await ps
      .invoke()
      .then(output => output)
      .catch(err => {
        console.log(err)
      })

    let users = []
    let work = output.split("\n")

    work.shift()
    work.shift()
    work.pop()

    work.forEach(item => {
      user = {
        id: item.substr(0, 3).trim(),
        name: item.substr(59, 12).trim(),
        db: database
      }
      users.push(user)
    })

    return users
  }

  const disconnectUsers = async (usersId, database) => {
    const params = "\\proshut"
    const command = `${oe_path}${params} ${pathToDatabases}${database} -C disconnect ${usersId}`
    const ps = new Shell({
      executionPolicy: "Bypass",
      noProfile: true
    })
    ps.addCommand(command)
    const output = await ps
      .invoke()
      .then(output => output)
      .catch(err => {
        console.log(err)
      })

    if (output.search(6796) !== -1) {
      return "Usuário sendo derrubado!"
    }
    if (output.search(6799) !== -1) {
      return "Usuário não encontrado"
    }
    if (output.search(1423) !== -1) {
      return "Nenhum banco de dados online encontrado!"
    }
  }

  return { getUsers, disconnectUsers }
}
