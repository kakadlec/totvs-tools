require("dotenv").config()
const app = require("express")()
const consign = require("consign")

consign({
  cwd: process.cwd(),
  locale: "pt-br",
  logger: console,
  verbose: true,
  extensions: [".js", ".json", ".node"],
  loggingType: "info"
})
  .include("./config/middlewares.js")
  .then("./modules/dbs.js")
  .then("./modules/users.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app)

app.modules.dbs.getDatabaseNames()
app.modules.users.getUsers()

app.listen(4100, () => {
  console.log(`Server started on port: 4100`)
})
