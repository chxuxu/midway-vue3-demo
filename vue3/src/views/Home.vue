<template>
  <div class="home">
    <LoginSetup/><a-date-picker/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import LoginSetup from "./LoginSetup.vue"
import { DatePicker } from 'ant-design-vue';
@Options({
  components: {
    HelloWorld,DatePicker,LoginSetup
  }
})
export default class Home extends Vue {
  //setup(props){
    mounted(){
      console.log('Component is mounted!')
    }
  //}
}
</script>
