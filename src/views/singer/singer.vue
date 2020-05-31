<template>
  <div class="singer">
    <list-view :singerlist="singerlist" @select="gotoDetails"></list-view>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { getSingerLists } from "../../api/singer";
import { ERR_OK } from "api/config";
import Scroll from "base/scroll/scroll.vue";
import ListView from "@/components/list-view/list-view.vue";
import { mapMutations } from "vuex";

const HOT_NAME = "热门";
const HOT_SONG_LENGTH = 10;
@Component({
  components: { Scroll, ListView },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
  },
})
export default class Singer extends Vue {
  items = [
    {
      avatar: "https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000",
      name: "薛之谦",
    },
  ];
  singerlist: object[] = [];

  mounted() {
    this.$nextTick(() => {
      this.__getSingerLists();
    });
  }

  normalizeSinger(data: { title: string }[]) {
    const map: any = {
      hot: {
        title: HOT_NAME,
        items: [],
      },
    };
    data.forEach((item, index, arr) => {
      if (index <= HOT_SONG_LENGTH - 1) {
        map.hot.items.push(item);
      }
      const key = item.title;
      if (!map[key]) {
        map[key] = {
          title: key,
          items: [],
        };
      }
      map[key].items.push(item);
    });

    // 处理map.items 得到有序列表
    const hot: object[] = [];
    const ret: object[] = [];
    for (const key in map) {
      if (key.match(/^[a-zA-Z]$/g)) {
        ret.push(map[key]);
      } else if (key === "hot") {
        hot.push(map[key]);
      }
    }
    ret.sort((a: any, b: any): any => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    });
    return hot.concat(ret);
  }

  __getSingerLists() {
    getSingerLists().then((response) => {
      if (response.code === ERR_OK) {
        this.singerlist = this.normalizeSinger(response.data.singerlist);
      }
    });
  }

  gotoDetails(singer: { singer_id: number }) {
    this.$router.push({ path: `/singer/${singer.singer_id}` });
    this.setSinger(singer);
  }
}
</script>

<style lang="stylus" scoped></style>
