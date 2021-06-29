<template>
  <v-app>
    <v-app-bar app color="white" white>
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="TGL Logo"
            class="shrink mr-2"
            contain
            src="./assets/logoTGL.jpeg"
            transition="scale-transition"
            width="40"
          />
          <!-- <h3>TheGroupLab</h3> -->
        </div>
      </router-link>
      <v-toolbar-title>TheGroupLab</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text class="mr-2" :to="{ name: 'Agregar' }"
        >Agregar Producto
        <v-icon middle>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  methods: {
    goToAdd() {
      this.$router.push({ name: "Agregar" });
    },
  },
};
</script>
<style scoped>
.main {
  background-color: #30bf6e;
}
</style>
