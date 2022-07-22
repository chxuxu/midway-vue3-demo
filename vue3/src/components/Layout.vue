<template>
  <div class="g-layout">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="main" v-if="$slots.sider">
      <div class="sider"><slot name="sider"></slot></div>
      <div class="content"><slot></slot></div>
    </main>
    <div class="main" :class="!$slots.sider?'z-nosider':''" v-if="!$slots.sider"><slot></slot></div>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class Layout extends Vue {
  data(){
    return {
      title:"sssssss"
    }
  }
  created() {
    console.log(this, 111);
  }

  mounted() {
    console.log(this.$slots, 222);
  }
}
</script>
<style lang="less">
.g-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    min-height: 50px;
    box-sizing: border-box;
    border-bottom: solid 1px #ddd;
    background-color: #21145a;
    color: #fff;
  }
  .main {
    box-sizing: border-box;
    display: flex;
    height: 100%;
    width: 100%;
    &.z-nosider{
      display:block;
    }
    .sider {
      //height: 100%;
      border-right: solid 1px #ddd;
      background-color: #e9e7f1;
    }
    .content {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }
  }
  .footer {
    min-height: 20px;
    box-sizing: border-box;
    border-top: solid 1px #ddd;
    background-color: #21145a;
    color: #fff;
  }
}
</style>
