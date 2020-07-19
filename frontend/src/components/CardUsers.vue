<template>
	<v-container>
		<v-row>
			<v-col>
				<h2>Ambiente: {{ env.environment }}</h2>
				<p>Path: {{ env.path }}</p>
			</v-col>
			<v-col>
				<v-row>
					<v-col>
						<v-btn :loading="loading" :disabled="loading" @click="fetchUsers"
							>Carregar Usuários Conectados</v-btn
						>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-btn
							:loading="loading"
							:disabled="loading"
							@click="disconnectUser"
							>Derrubar Usuários Selecionados</v-btn
						>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<h3>Users</h3>
				<v-data-table
					:headers="headers"
					:items="users"
					item-key="user"
					show-select
					no-data-text="Nenhum usuário carregado"
					@item-selected="prepareKick"
				></v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import axios from "axios"
	const URL = `http://localhost:4100`
	export default {
		name: "CardUsers",
		props: ["env"],
		data: () => ({
			loading: false,
			connections: [],
			users: [],
			selectedUsers: [],
			headers: [{ item: "Usuário", value: "user" }]
		}),
		computed: {},
		methods: {
			fetchUsers() {
				this.loading = true
				fetch(`${URL}/${this.env.environment}/users`)
					.then((stream) => stream.json())
					.then((data) => {
						this.connections = data.connections
						this.users = data.users
					})
					.catch((error) => console.error(error.message))
					.finally(() => (this.loading = false))
			},
			disconnectUser() {
				this.loading = true
				const connToKill = []
				this.selectedUsers.forEach((user) => {
					const temp = this.connections.filter((conn) => user === conn.name)
					connToKill.push(temp)
				})

				axios
					.post(`${URL}/${this.env.environment}/drop`, connToKill)
					.then((res) => {
						console.log(res.data)
					})
					.catch((error) => console.log(error))
					.finally(() => (this.loading = false))
			},
			prepareKick(data, value) {
				if (data.value === true) {
					this.selectedUsers.push(data.item.user)
				} else {
					this.selectedUsers.shift(data.item.user)
				}
			}
		},
		mounted() {}
	}
</script>

<style></style>
