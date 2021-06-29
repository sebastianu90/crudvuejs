<template>
  <v-container>
    <v-form>
      <v-container class="formulario">
        <v-row justify="center">
          <v-col cols="6" md="6">
            <v-text-field
              v-model="identifier"
              :rules="nameRules"
              label="Identificador"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" md="6">
            <v-text-field v-model="alias" :rules="nameRules" label="Alias" required></v-text-field>
          </v-col>

          <v-col cols="6" md="6">
            <v-select
              v-model="select"
              :items="items"
              item-text="name"
              item-value="id"
              :rules="[(v) => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" md="6">
            <v-select
              v-model="select2"
              :items="items2"
              item-text="name"
              item-value="id"
              :rules="[(v) => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select>
          </v-col>
          <v-col cols="6" md="6">
            <v-text-field v-model="mac" :rules="nameRules" label="MAC" required></v-text-field>
          </v-col>
          <v-col cols="6" md="6">
            <v-checkbox v-model="checkbox" label="GPS"></v-checkbox>
          </v-col>
        </v-row>
        <v-btn dark class="mr-6" @click="addProducto(urlBase, token)">
          Guardar
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["urlBase", "token"]),
  },
  data: () => ({
    valid: false,
    identifier: "",
    alias: "",
    mac: "",
    select: null,
    select2: null,
    items: [],
    items2: [],
    checkbox: false,
    techTypes: "technology-types",
    deviceTypes: "device-types",

    nameRules: [
      (v) => !!v || "required",
      (v) => v.length <= 20 || "Must be less than 10 characters",
    ],
  }),

  methods: {
    getTypes(url, types, token) {
      const config = {
        headers: { Authorization: "Bearer " + token },
      };
      axios.get(url + types, config).then((response) => {
        types === "technology-types" ? (this.items = response.data) : (this.items2 = response.data);
      });
    },

    addProducto(url, token) {
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let producto = {
        identifier: this.identifier,
        mac: this.mac,
        device_type_id: this.select2,
        technology_type_id: this.select,
        alias: this.alias,
        scope: 0,
        has_gps: this.checkbox,
      };
      console.log(url, token, producto);

      axios.post(url + "device", producto, { config }).then((response) => {
        console.log(response);
      });
    },
  },

  mounted() {
    this.getTypes(this.urlBase, this.techTypes, this.token);
    this.getTypes(this.urlBase, this.deviceTypes, this.token);
  },
};
</script>

<style scoped>
.formulario {
  background-color: white;
  justify-content: center;
}
</style>
