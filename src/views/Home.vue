<template>
  <div class="home">
    <m-header></m-header>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MHeader from "@/components/m-header/m-header";
export default {
  name: "Home",
  components: {
    MHeader
  }
};
</script>
