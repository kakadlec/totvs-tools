const fs = require("fs")
const path = require("path")
const pathToConfig = "./modules/config.json"
let config = {}

const loadConfig = async pathToConfig => {
  temp = fs.readFileSync(pathToConfig, "utf8")
  config = JSON.parse(temp)
}

const getDbs = dbPath => {
  loadConfig(pathToConfig)
}

module.exports = getDbs
