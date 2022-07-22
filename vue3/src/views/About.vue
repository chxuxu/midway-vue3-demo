<template>
    <Layout>
      <template v-slot:header>
        <h1>headerheaderheaderheaderheaderheader</h1>
      </template>

      
      <template v-slot:default>
        <p>defaultdefaultdefaultdefault</p>
        <MyButton :disabled="false">11111</MyButton>
        <my-button :disabled="false">22222</my-button>
        <Nav :forRouter="true" :options="navOptions"/>
      </template>

      <template v-slot:footer>
        <p>footerfooterfooterfooterfooter</p>
      </template>
    </Layout>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Layout from '@/components/Layout.vue' // @ is an alias to /src
import Nav from '@/components/Nav.vue'
import MyButton from '@/components/MyButton.vue'
@Options({
  components: {
    Layout,Nav,MyButton
  }
})
export default class About extends Vue {
  data(){
    return {
      navOptions:[
        {title:"首页",url:"/"},
        {title:"关于",url:"/about"}
      ]
    }
  }
}
</script>
