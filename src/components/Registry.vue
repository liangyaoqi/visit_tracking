<template>
  <NavBar title="注册" left-text="返回" left-arrow @click-left="onClickLeft"/>
  <div class="registry">
    <div class="top-icon">
      <add-user theme="outline" size="75" fill="#333"/>
    </div>
    <Form :model="form">
      <Field v-model="form.name" label="昵称" placeholder="请输入昵称" clearable required autofocus/>
      <Field v-model="form.username" label="用户名" placeholder="请输入用户名" clearable required/>
      <Field v-model="form.password" label="密码" type="password" placeholder="请输入密码" clearable required/>
      <Field v-model="form.password1" label="密码" type="password" placeholder="请再次输入密码" clearable required/>

      <div class="registry-btn">
        <Button type="primary" block :loading="isSubmitting" @click="handleSubmit">注册</Button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {Field, Form, Button, NavBar,  Dialog, showDialog, showToast} from 'vant';
import {AddUser} from '@icon-park/vue-next'
import {registry} from '../request/operator'
import {useRouter} from 'vue-router'
const form = reactive({
  name: "",
  username: "",
  password: "",
  password1: "",
});

const isSubmitting = ref(false);

const onClickLeft = () => history.back();

const router = useRouter();

async function handleSubmit() {
  isSubmitting.value = true;
  if (form.password !== form.password1) {
    await showDialog({message: "两次密码不一致！"})
    isSubmitting.value = false;
    return;
  }
  const result = await registry(form)
  if (result) {
    isSubmitting.value = false;
    if (result.success) {
      showToast(result.message);
      // 登录成功，跳转到首页
      await router.push("/");
    } else {
      await showDialog({
        message: result.message
      });
    }
  } else {
    isSubmitting.value = false;
    await showDialog({
      message: "系统错误，请稍后重试！"
    });
  }
  isSubmitting.value = false
};
</script>

<style lang="scss" scoped>
.registry {
  margin-top: 40px;

  .top-icon {
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
  }

  .registry-btn {
    margin-top: 20px;
  }
}
</style>
