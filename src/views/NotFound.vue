<template>
  <div class="not-found">
    您访问的页面不存在！
  </div>
</template>

<script>
// @ is an alias to /src
import MHeader from "@/components/m-header/m-header";
export default {
  name: "Home",
  components: {
    MHeader
  }
};
</script>

<style lang="stylus">
.not-found
  margin-top 3em;
  color #bbb;
</style>

