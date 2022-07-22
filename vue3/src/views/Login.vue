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
            @click="onSubmit"
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
import { Options, Vue } from "vue-class-component";
import { Input, Button, message } from "ant-design-vue";

import { defineComponent, ref } from "vue";
import { login } from "../services";
const { Password } = Input;
@Options({
  components: {
    Button,
    Input,
    Password,
  },
})
export default class Login extends Vue {
  username = "";
  password = "";
  async onSubmit(e: any) {
    let res = await login({
      username: this.username,
      password: this.password,
    });
    if (res.code == 200) {
      message.success("登录成功");
    } else {
      message.error("用户名或密码错误");
    }
  }
}
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