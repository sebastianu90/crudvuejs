<template>
  <v-container>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">
              ID Producto
            </th>
            <th class="text-center">
              Identificador
            </th>
            <th class="text-center">
              Nombre Dispositivo
            </th>
            <th class="text-center">
              Tipo Dispositivo
            </th>
            <th class="text-center">
              Tipo Tecnologia
            </th>
            <th class="text-center">
              Nombre trabajador
            </th>
            <th class="text-center">
              Apellido trabajador
            </th>
            <th class="text-center">
              Ingreso <br />
              Fecha / Hora
            </th>
            <th class="text-center">
              Editar Producto
            </th>
            <th class="text-center">
              Eliminar Producto
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos.data" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.identifier }}</td>
            <td class="text-center">{{ item.alias }}</td>
            <td class="text-center">{{ item.device_type }}</td>
            <td class="text-center">{{ item.technology_type }}</td>
            <td class="text-center">{{ item.worker_name }}</td>
            <td class="text-center">{{ item.worker_last_name }}</td>
            <td class="text-center">{{ item.timestamp }}</td>
            <td>
              <v-btn text @click="dialog2 = true">
                <v-icon color="yellow darken-2">mdi-file-edit-outline</v-icon>
              </v-btn>
            </td>
            <td class="text-center">
              <v-btn text @click="getIdEliminar(item.id)">
                <v-icon color="red darken-2">mdi-delete-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- Modal para eliminar -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            ¿Estas seguro de eliminar este <br />producto?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="dark darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="red darken-1" text @click="eliminarProducto(urlBase, token, idEliminar)">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Modal editar -->
    <v-row justify="center">
      <v-dialog v-model="dialog2" persistent max-width="400">
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
                <v-text-field
                  v-model="alias"
                  :rules="nameRules"
                  label="Alias"
                  required
                ></v-text-field>
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
                  :items="this.items2"
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
            <v-btn dark class="mr-3" @click="dialog2 = false">
              Cancelar
            </v-btn>
            <v-btn dark class="mr-3" @click="dialog2 = false">
              Actualizar
            </v-btn>
          </v-container>
        </v-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  name: "Tabla",
  data() {
    return {
      dialog: false,
      dialog2: false,
      idEliminar: "",
    };
  },
  computed: {
    ...mapState(["urlBase", "token", "productos", "items", "items2"]),
    ...mapActions(["setToken", "setProductosInicial"]),
  },

  mounted() {
    this.getToken(this.urlBase);
  },

  methods: {
    async getToken(url) {
      const user = {
        email: "demo@thegrouplab.com",
        password: "demo",
      };

      await axios.post(url + "login", user).then((response) => {
        this.$store.dispatch("setToken", response.data.access_token);
        console.log(this.token);
      });

      const config = {
        headers: { Authorization: "Bearer " + this.token },
      };

      await axios.get(url + "devices", config).then((response) => {
        this.$store.dispatch("setProductosInicial", response.data);
        console.log(this.productos);
      });
    },

    getIdEliminar(id) {
      this.dialog = true;
      this.idEliminar = id;
      console.log(this.idEliminar);
    },

    async eliminarProducto(url, token, id) {
      const config = {
        headers: { Authorization: "Bearer " + token },
      };

      await axios.delete(url + "device/" + id, config).then((response) => {
        alert("Producto Elimando");
        this.dialog = false;
      });
      this.$router.go();
    },
  },
};
</script>
<style scoped>
.formulario {
  background-color: white;
  justify-content: center;
}
</style>
