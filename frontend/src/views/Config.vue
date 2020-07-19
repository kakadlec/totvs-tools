<template>
  <div class="config">
    <v-container fill-height>
      <v-row>
        <v-col align="center">
          <h1>Configuração do Ambiente</h1>
          <p>{{ status }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table :headers="headers" :items="env" class="elevation-1"></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "Config",

  data: () => ({
    headers: [
      { text: "Ambiente", value: "environment" },
      { text: "Diretório", value: "pathToDatabases" },
      { text: "Bancos de dados", value: "databases" }
    ]
  }),
  computed: {
    ...mapState(["status", "env"])
  }
}
</script>
