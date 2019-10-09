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
  .then("./api")
  .then("./config/routes.js")
  .into(app)

require("./modules/getDbs")("Teste")

app.listen(4100, () => {
  console.log(`Server started on port: 4100`)
})
