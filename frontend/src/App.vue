<template>
	<v-app>
		<v-app-bar app color="secondary" dark>
			<div class="d-flex align-center">
				<v-btn text to="/">
					<v-icon large>mdi-hammer-wrench</v-icon>
				</v-btn>
				<v-divider class="mx-4" vertical></v-divider>
				<v-toolbar-title>TotvsTools</v-toolbar-title>
			</div>

			<v-spacer></v-spacer>

			<v-btn text to="/config">
				<v-icon large>mdi-settings</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			<transition class="ma-0" mode="out-in">
				<router-view></router-view>
			</transition>
		</v-content>
	</v-app>
</template>

<script>
	import { mapActions } from "vuex"

	export default {
		name: "App",

		components: {},

		data: () => ({
			//
		}),
		methods: {
			...mapActions({
				fetchStatus: "fetchStatus",
				fetchEnv: "fetchEnv"
			})
		},
		created() {
			this.fetchStatus()
			this.fetchEnv()
		}
	}
</script>
<style>
	.v-enter,
	.v-leave-to {
		opacity: 0;
	}

	.v-enter {
		transform: translate3d(0px, -20px, 0);
	}

	.v-leave-to {
		transform: translate3d(0, 20px, 0);
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.3s;
	}
</style>
