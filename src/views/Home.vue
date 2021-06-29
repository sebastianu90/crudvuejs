<template>
  <div>
    <cabecera class="cabecera" />
    <tabla />
  </div>
</template>

<script>
import Tabla from "../components/Tabla";
import Cabecera from "../components/Cabecera";

export default {
  name: "Home",

  components: {
    Tabla,
    Cabecera,
  },
};
</script>

<style scoped>
.cabecera {
  padding: 20px;
}
</style>
