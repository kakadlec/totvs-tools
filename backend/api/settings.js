const config = require('../config_files/databases.json')

module.exports = app => {
  const getEnv = (req, res) => {
    const env = []

    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const temp = {}
        Object.assign(temp, { environment: key }, config[key])

        env.push(temp)
      }
    }
    res.status(200).json(env)
  }
  return { getEnv }
}
