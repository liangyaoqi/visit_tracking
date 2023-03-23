<template>
    <div class="registry">
        <div class="top-icon">
            <add-user theme="outline" size="75" fill="#333" />
        </div>
        <Form :model="form" :rules="rules">
            <Field v-model="form.username" label="用户名" placeholder="请输入用户名" clearable required autofocus />
            <Field v-model="form.password1" label="密码" type="password" placeholder="请输入密码" clearable required />
            <Field v-model="form.password2" label="密码" type="password" placeholder="请再次输入密码" clearable required />

            <div class="registry-btn">
                <Button type="primary" block :loading="isSubmitting" @click="handleSubmit">注册</Button>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Field, Form, Button } from 'vant';
import { AddUser } from '@icon-park/vue-next'

const form = reactive({
    username: "",
    password1: "",
    password2: "",
});

const isSubmitting = ref(false);

const rules = {
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }],
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
    console.log(form);
};
</script>

<style lang="scss" scoped>
.registry {
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
