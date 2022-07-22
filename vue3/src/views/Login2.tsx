import { Options, Vue } from "vue-class-component";
import { Input, Button, message } from "ant-design-vue";
import { login } from "../services";
import "./login2.less";
const { Password } = Input;
@Options({
  components: {
    Button,
    Input,
    Password,
  },
})
export default class Login2 extends Vue {
  //components:{Input,Button,Password},
  username = "";
  password = "";
  mounted() {
    
  }

  async onSubmit() {
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


  render() {
    return (<div class="m-login">
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
            <Button onClick={this.onSubmit} disabled={!this.username || !this.password} type="primary">登陆</Button>
            <a>忘记密码？</a>
          </dd>
        </dl>
      </section>
    </div>);
  }

}
