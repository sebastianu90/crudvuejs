<template>
  <div>
    <form-nuevo-producto class="cabecera" />
  </div>
</template>

<script>
import FormNuevoProducto from "../components/FormNuevoProducto.vue";

export default {
  name: "Home",

  components: {
    FormNuevoProducto,
  },
};
</script>

<style scoped>
.cabecera {
  padding: 20px;
}
</style>
