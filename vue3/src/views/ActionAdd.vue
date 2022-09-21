<template>
  <div class="m-form">
    <header class="head">创建员工</header>
    <section class="cont">
      <dl>
        <dt>姓名</dt>
        <dd><Input v-model:value="name" placeholder="请输入姓名" /></dd>
      </dl>
      <dl>
        <dt>年龄</dt>
        <dd><Input v-model:value="age" placeholder="请输入年龄" /></dd>
      </dl>
      <dl>
        <dt>性别</dt>
        <dd><Input v-model:value="sex" placeholder="请输入性别1或0" /></dd>
      </dl>
      <dl>
        <dt>email</dt>
        <dd><Input v-model:value="email" placeholder="请输入性别1或0" /></dd>
      </dl>
      <dl>
        <dt>&nbsp;</dt>
        <dd class="btns">
          <Button
            @click="dologin"
            :disabled="!name"
            type="primary"
            >提交</Button
          >
        </dd>
      </dl>
    </section>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Input, Button, message } from "ant-design-vue";
import { insertStaff } from "../services";
@Options({
  components: {
    Input, Button, message
  }
})
export default class ActionAdd extends Vue {
  data(){
    return {
      name:"",
      sex:1,
      age:30,
      email:""
    }
  }
  async dologin(){
    let intance:any=this.$data;
    const form={
      name:intance.name,
      sex:intance.sex,
      age:intance.age,
      email:intance.email
    };
    console.log(form);
    let res = await insertStaff(form);
    if (res.code == 200) {
      message.success("创建成功");
    } else {
      message.error("创建失败");
    }
  }
}
</script>

<style lang="less">
.m-form {
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