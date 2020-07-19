const fs = require('fs')
const path = require('path')
const config = require('../config_files/config.json')

module.exports = app => {
  const getDatabaseNames = () => {
    const obj = {}

    config.env.forEach(element => {
      const env = Object.keys(element)[0]
      const pathToDatabases = Object.values(element)[0]
      const files = fs.readdirSync(pathToDatabases)
      const databasesFiles = files.filter(file => {
        return path.extname(file) === '.db'
      })
      const databases = databasesFiles.map(database => {
        return database.replace('.db', '')
      })

      Object.assign(obj, { [env]: { pathToDatabases, databases } })
    })
    fs.writeFileSync('./config_files/databases.json', JSON.stringify(obj))
  }
  return { getDatabaseNames }
}
