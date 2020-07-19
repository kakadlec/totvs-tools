<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col align="center">
          <h1>Derrubar usuários</h1>
          <p>{{ status }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-tabs v-model="tab" background-color="secondary lighten-2" centered dark>
              <v-tab v-for="(env, index) in environments" :key="index">{{ env.environment }}</v-tab>
              <v-tab-item v-for="(env, index) in environments" :key="index">
                <v-container>
                  <CardUsers :env="env" />
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import CardUsers from "@/components/CardUsers";
  import { mapState, mapGetters } from "vuex";

  export default {
    name: "Home",
    components: { CardUsers },
    data: () => ({
      tab: null
    }),
    computed: {
      ...mapState(["status"]),
      ...mapGetters(["environments"])
    },
    methods: {},
    mounted() {}
  };
</script>
