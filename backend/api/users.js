const config = require("../config_files/databases.json")

module.exports = (app) => {
	const get = async (req, res) => {
		const env = req.params.env
		let tempUsers = []

		for (let index = 0; index < config[env].databases.length; index++) {
			const temp = await app.modules.users.getUsers(
				config[env].pathToDatabases,
				config[env].databases[index]
			)

			tempUsers.push(temp)
		}
		const connections = tempUsers.flat()
		let groupedUsers = groupByProperty(connections, "name")
		arrayOfUsers = Object.keys(groupedUsers).sort()
		const users = []
		arrayOfUsers.forEach((user) => {
			users.push({ user })
		})

		res.status(200).send({ users, connections })
	}

	const drop = async (req, res) => {
		const env = req.params.env
		const body = req.body.flat()

		if (
			body.length === 0 ||
			body === undefined ||
			Object.entries(body).length === 0
		)
			return res.status(400).json({ error: "Não enviado informações" })

		const msg = await app.modules.users.disconnectUser(
			config[env].pathToDatabases,
			body
		)

		res.status(200).send(msg)
	}

	function groupByProperty(array, prop) {
		return array.reduce((acc, obj) => {
			let key = obj[prop]
			if (!acc[key]) {
				acc[key] = []
			}
			acc[key].push(obj)
			return acc
		}, {})
	}

	return { get, drop }
}
