<template>
 <ul class="m-nav">
  <template v-if="forRouter">
    <li v-for="(item, index) in options" :key="index">
      <router-link :to="item.url">{{item.title}}</router-link>
    </li>
  </template>
   <template v-if="!forRouter">
    <li v-for="(item, index) in options" :key="index">
      <a>{{item.title}}</a>
    </li>
  </template>
</ul>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props:["options","forRouter"]
})
export default class Nav extends Vue{
  data(){
    return {

    };
  }
}
</script>
<style lang="less">
.m-nav{
  display: flex;
  height: 100%;
  li{
   
     height: 100%;
     box-sizing: border-box;
    a{
       padding:0 20px;
       height: 100%;
      display: block;
      vertical-align: middle;
      color: #fff;
      &:hover{
        background-color: #fff;
        color:#333;
      }
    }
  }
}
</style>