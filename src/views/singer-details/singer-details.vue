<template>
  <div class="singer-details">details</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
@Component({
  computed: {
    ...mapGetters(["singer"]),
  },
})
export default class SingerDetails extends Vue {
  mounted() {
    this.$nextTick(() => {
      console.log(this.singer.singer_name);
    });
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.singer-details
  background-color #000
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 20
  color $text-color
</style>
