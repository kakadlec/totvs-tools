const { oe_path } = require("../config_files/config.json")
const Shell = require("node-powershell")
const {
  pathToDatabases,
  databases
} = require("../config_files/databases.json")[0]

module.exports = app => {
  const getUsers = () => {
    const params = "\\proshut"
    const command = `${oe_path}${params} ${pathToDatabases}${
      databases[0]
    } -C list`
    const ps = new Shell({
      executionPolicy: "Bypass",
      noProfile: true
    })
    ps.addCommand(command)
    ps.invoke()
      .then(output => {
        console.log(output)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return { getUsers }
}
