const fs = require("fs")
const path = require("path")
const config = require("../config_files/config.json")

module.exports = app => {
  const getDatabaseNames = () => {
    const databasesArray = []
    config.env.forEach(element => {
      const obj = {}
      const env = Object.keys(element)[0]
      const pathToDatabases = Object.values(element)[0]
      const files = fs.readdirSync(pathToDatabases)
      const databases = files.filter(file => {
        return path.extname(file) === ".db"
      })

      Object.assign(obj, { env })
      Object.assign(obj, { pathToDatabases })
      Object.assign(obj, { databases })
      databasesArray.push(obj)
    })
    fs.writeFileSync(
      "./config_files/databases.json",
      JSON.stringify(databasesArray)
    )
  }
  return { getDatabaseNames }
}
