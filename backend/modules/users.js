const { oe_path } = require("../config_files/config.json")
const Shell = require("node-powershell")
//const config = require('../config_files/databases.json')

module.exports = (app) => {
	const getUsers = async (path, database) => {
		const params = "\\proshut"
		const command = `${oe_path}${params} ${path}\\${database} -C list`
		const ps = new Shell({
			executionPolicy: "Bypass",
			noProfile: true
		})
		ps.addCommand(command)
		const output = await ps
			.invoke()
			.then((output) => output)
			.catch((err) => {
				console.log(err)
			})

		let users = []
		let work = output.split("\n")

		work.shift()
		work.shift()
		work.pop()

		work.forEach((item) => {
			user = {
				key: `${item.substr(0, 3).trim()}-${item
					.substr(38, 12)
					.trim()}-${database}`,
				id: item.substr(0, 3).trim(),
				timeOfLogin: item.substr(11, 24).trim(),
				name: item.substr(38, 12).trim(),
				type: item.substr(50, 6).trim(),
				db: database
			}
			users.push(user)
		})

		const filteredUsers = users.filter(
			(user) => user.type === "REMC" && user.name !== "pub"
		)

		return filteredUsers
	}

	const disconnectUser = async (path, data) => {
		const params = "\\proshut"
		let message = ""

		for (let index = 0; index < data.length; index++) {
			const element = data[index]
			const command = `${oe_path}${params} ${path}\\${element.db} -C disconnect ${element.id}`
			const ps = new Shell({
				executionPolicy: "Bypass",
				noProfile: true
			})
			ps.addCommand(command)
			const output = await ps
				.invoke()
				.then((output) => output)
				.catch((err) => {
					console.log(err)
				})
			if (output.search(6796) !== -1) {
				message += `Usuário ${element.name} sendo derrubado do banco ${element.db}\n`
			}
			if (output.search(6799) !== -1) {
				message += `Usuário ${element.name} não encontrado no banco ${element.db}\n`
			}
			if (output.search(1423) !== -1) {
				message += `Banco de dados ${element.db} não está online\n`
			}
		}

		return message
	}

	return { getUsers, disconnectUser }
}
