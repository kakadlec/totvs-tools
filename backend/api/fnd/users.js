module.exports = app => {
  const get = (req, res) => {
    res.status(200).send("Retornar lista de usuários de todos os bancos!")
  }

  return { get }
}
