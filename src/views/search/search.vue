<template>
  <div class="search">
    <div class="search-box-wrap">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="hotkey-wrap">
      <h1>热门搜索</h1>
      <div class="hotkey">
        <span class="key" v-for="key in hotkeys" :key="key.k + key.n" @click="selectItem(key.k)">{{ key.k }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import SearchBox from "base/search-box/search-box"
import { getHotKey, getSearchInfo } from "api/search"
import { ERR_OK } from "../../api/config"
@Component({
  components: { SearchBox },
})
export default class Search extends Vue {
  hotkeys = []
  queryWord = ""
  created() {
    this._getHotKey()
  }
  selectItem(key) {
    this.$refs.searchBox.setQuery(key)
  }
  onQueryChange(newQuery) {
    console.log(1111, newQuery)
    this._getSearchInfo(newQuery)
  }
  _getHotKey() {
    getHotKey().then((response) => {
      if (response.code === ERR_OK) {
        this.hotkeys = response.data.hotkey.slice(0, 10)
      }
      console.log(this.hotkeys)
    })
  }
  _getSearchInfo(key) {
    getSearchInfo(key).then((response) => {
      console.log(response)
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.search
  background-color $background-color
  position fixed
  top 81px
  bottom 0px
  left 0px
  right 0px
  padding 0px 20px
  .search-box-wrap
    margin-top 20px
  .hotkey-wrap
    color $text-color
    margin-top 20px
    h1
      text-align left
      font-weight normal
    .hotkey
      margin-top 10px
      display flex
      flex-wrap wrap
      .key
        margin 10px 20px 10px 0px
        background-color $background-light-color
        line-height 1em
        padding 5px
        border-radius 5px
        color $text-dark-color
</style>
