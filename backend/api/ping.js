module.exports = app => {
  const get = (req, res) => {
    res.status(200).send("API is LIVE!")
  }

  return { get }
}
