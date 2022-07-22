<template>
  <Layout class="app" id="app">
    <template v-slot:header>
      <div class="m-logo">
        <img alt="Vue logo" height="40" src="./assets/logo.png" />
      </div>
      <Nav :forRouter="true" :options="navOptions" />
      <div class="m-user"><a>退出</a></div>
    </template>
    <template v-slot:sider>
      <ul>
        <li><router-link to="/actions">活动列表</router-link></li>
        <li><router-link to="/actions/add">创建活动</router-link></li>
      </ul>
    </template>

    <template v-slot:default>
      <router-view />
    </template>
    <template v-slot:footer>
      <p>footerfooterfooterfooterfooter</p>
    </template>
  </Layout>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Layout from "@/components/Layout.vue"; // @ is an alias to /src
import Nav from "@/components/Nav.vue";
import AAA from "ant-design-vue";
@Options({
  components: {
    Layout,
    Nav,
  },
})
export default class App extends Vue {
  data() {
    return {
      navOptions: [
        { title: "首页", url: "/" },
        { title: "关于", url: "/about" },
      ],
    };
  }
  created() {
    //console.log(AAA);
  }
}
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
ul,
dl,
li,
ol,
p,
h1,
h2,
h3,
h4,
p {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .header {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    .m-logo {
      width: 200px;
      line-height: 50px;
      box-sizing: border-box;
    }
    .m-nav {
      flex: 1;
      text-align: left;
      justify-content: start;
      li {
        line-height: 50px;
        box-sizing: border-box;
      }
    }
    .m-user {
      padding-right: 20px;
      line-height: 50px;
    }
  }
  .sider {
    width: 200px;
    ul {
      margin-top: 20px;
      li {
        line-height: 30px;
      }
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
