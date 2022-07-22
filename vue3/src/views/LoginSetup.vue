<template>
  <div class="m-login">
    <header class="head">登陆</header>
    <section class="cont">
      <dl>
        <dt>用户名</dt>
        <dd><Input v-model:value="username" placeholder="请输入用户名" /></dd>
      </dl>
      <dl>
        <dt>密码</dt>
        <dd><Password v-model:value="password" placeholder="请输入密码" /></dd>
      </dl>
      <dl>
        <dt>&nbsp;</dt>
        <dd class="btns">
          <Button
            @click="dologin"
            :disabled="!username || !password"
            type="primary"
            >登陆</Button
          >
          <a>忘记密码？</a>
        </dd>
      </dl>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import { Input, Button, message } from "ant-design-vue";

import { login } from "../services";
const { Password } = Input;

export default defineComponent({
  components: { Input, Button, Password },

  // mounted() {
  //   console.log("Component is mounted!");
  // },
  setup(props) {
    onMounted(() => {
      console.log("Component is mounted!");
    });
    let username = ref("");
    let password= ref("");
    const dologin = async () => {
      let res = await login({
        username: username.value,
        password: password.value,
      });
      if (res.code == 200) {
        message.success("登录成功");
      } else {
        message.error("用户名或密码错误");
      }
    };
    return {
      username,
      password,
      dologin,
    };
  },
  methods: {
    async onSubmit() {
      this.dologin();
    },
  },
});
</script>

<style lang="less">
.m-login {
  width: 500px;
  border: solid 1px #ddd;
  box-shadow: 1px 2px 6px 2px #009;
  margin: 200px auto;
  .head {
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    background-color: #efefef;
    border-bottom: solid 1px #ddd;
  }
  .cont {
    padding: 40px 50px 20px;
    dl {
      display: flex;
      padding-bottom: 20px;
      line-height: 30px;
      dt {
        width: 80px;
        padding-right: 10px;
        text-align: right;
      }
      dd {
        position: relative;
        flex: 1;
        text-align: left;
        &.btns {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>