<template>
  <div class="songlist" ref="songList">
    <ul>
      <li
        v-for="(item, index) in songs"
        :key="item.id"
        @click="selectItem(item, index)"
      >
        <h2>{{ item.name }}</h2>
        <p>{{ getDesc(item) }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { mapGetters, mapMutatios, mapMutations } from "vuex";

@Component({
  components: {}
})
export default class SongList extends Vue {
  @Prop()
  private songs!: object[];

  getDesc(item) {
    return item.singer + "·" + item.album;
  }

  selectItem(item, index) {
    this.$emit("select", item, index);
  }
}
</script>

<style lang="stylus" scoped>
.songlist
  padding  5px  30px  15px 30px
  ul
    li
      text-align left
      padding  10px 0
      line-height 1.6
      h2
       font-weight normal
       color #fff
      p
       margin-top 2px
       color rgba(255,255,255,.3)
       white-space nowrap
       text-overflow ellipsis
       overflow hidden
</style>
