module.exports = app => {
  app.route('/ping').get(app.api.ping.get)

  app.route('/env').get(app.api.settings.getEnv)

  app.route('/:env/users').get(app.api.users.get)

  app.route('/:env/drop').post(app.api.users.drop)
}
