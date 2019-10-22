module.exports = app => {
  app.route("/ping").get(app.api.ping.get)

  app.route("/users").get(app.api.fnd.users.get)

  app.route("/users/:id").post(app.api.fnd.users.drop)
}
