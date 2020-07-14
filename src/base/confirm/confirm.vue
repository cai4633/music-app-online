<template>
  <div class="confirm" v-show="showflag">
    <div class="confirm-inner">
      <p>{{ title }}</p>
      <div class="btn-wrap">
        <span class="cancle" @click="clickCancleBtn">{{ cancleBtnText }}</span>
        <span class="enter" @click="clickEnterBtn">{{ enterBtnText }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class Confirm extends Vue {
  showflag = false;

  @Prop({ default: "是否全部删除？" })
  title!: string;
  @Prop({ default: "取消" })
  cancleBtnText!: string;
  @Prop({ default: "确定" })
  enterBtnText!: string;

  show() {
    this.showflag = true;
  }
  hide() {
    this.showflag = false;
  }
  clickCancleBtn() {
    this.$emit("cancle");
    this.hide();
  }
  clickEnterBtn() {
    this.$emit("enter");
    this.hide();
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';
@import '~common/stylus/variable.styl';
.confirm
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  color #FFF
  background-color rgba(90,90,90,.6)
  text-align center
  .confirm-inner
    position-center(absolute,both)
    top 40%
    background-color #000
    border-radius 10px
    box-sizing border-box
    width 80%
    max-width 400px
    padding 10px 30px
    p
      border 1px solid #000
      text-align center
    .btn-wrap
      margin-top 10px
      border 1px solid #000
      span
        margin 10px 0
      .enter
        float right
      .cancle
        float left
</style>
