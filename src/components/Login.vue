<template>
    <div class="login">
        <div class="avatar">
            <avatar theme="outline" size="75" fill="#333" />
        </div>
        <Form :model="form" :rules="rules">
            <Field v-model="form.username" label="用户名" placeholder="请输入用户名" clearable required autofocus />
            <Field v-model="form.password" label="密码" type="password" placeholder="请输入密码" clearable required />

            <div class="login-btn">
                <Button type="primary" block :loading="isSubmitting" @click="handleSubmit">登录</Button>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Field, Form, Button } from 'vant';
import { Avatar } from '@icon-park/vue-next'


const form = reactive({
    username: "",
    password: "",
});

const isSubmitting = ref(false);

const rules = {
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }],
};

const handleSubmit = () => {
    isSubmitting.value = true;
    // 这里可以添加登录逻辑
    /* login(form)
        .then(res => {
            isSubmitting.value = false;
            if (res.code === 200) {
                Toast.success(res.msg);
                // 登录成功，跳转到首页
                this.$router.push("/");
            } else {
                Dialog.alert({
                    message: res.msg
                });
            }
        })
        .catch(() => {
            isSubmitting.value = false;
            Dialog.alert({
                message: "系统错误，请稍后重试！"
            });
        }); */
    isSubmitting.value = false
    console.log(form.username);
};
</script>

<style lang="scss" scoped>
.login {
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
