<template>
    <NavBar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="login">
        <div class="avatar">
            <avatar theme="outline" size="75" fill="#333" />
        </div>
        <Form :model="form" :rules="rules">
            <Field v-model="form.username" label="用户名" placeholder="请输入用户名" clearable required autofocus />
            <Field v-model="form.password" label="密码" type="password" placeholder="请输入密码" clearable required />
            <RouterLink to="/registry" class="register-link">没有账号？点我去注册</RouterLink>
            <div class="login-btn">
                <Button type="primary" block :loading="isSubmitting" @click="handleSubmit">登录</Button>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Field, Form, Button, NavBar,showToast } from 'vant';
import { Avatar } from '@icon-park/vue-next'
import { login } from '../request/operator';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'


const form = reactive({
    username: "",
    password: "",
});

const isSubmitting = ref(false);

const rules = {
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }],
};

const onClickLeft = () => history.back();

const router = useRouter();

const store = useStore();

const handleSubmit = async () => {
    isSubmitting.value = true;
    // 这里可以添加登录逻辑
    const result = await login(form)
    if (result) {
        store.commit('saveUser')
        isSubmitting.value = false;
        if (result.code===200) {
            showToast("登陆成功");
            store.commit('saveUser')
            localStorage.setItem("token", result.data);
            // 登陆成功，跳转到首页
            await router.push("/");
        } else {
            await showDialog({
                message: result.message
            });
        }
    }
    isSubmitting.value = false
};
</script>

<style lang="scss" scoped>
.login {
    margin-top: 100px;

    .register-link {
        display: block;
        text-align: left;
        margin-top: 20px;
        margin-left: 10px;
        color: black;
    }

    .avatar {
        width: 100%;
        text-align: center;
        margin-bottom: 50px;
    }

    .login-btn {
        margin-top: 20px;
    }
}
</style>
