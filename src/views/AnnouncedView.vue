<template>
    <div class="announced">
        <NavBar title="发布公告" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="content"></div>
        <Form @submit="onSubmit" :model="form">
            <CellGroup inset>
                <Field v-model="form.content" name="公告内容" label="公告内容" placeholder="公告内容"
                    :rules="[{ required: true, message: '请填写内容' }]" />
            </CellGroup>
            <div style="margin: 16px;">
                <Button round block type="primary" native-type="submit">
                    提交
                </Button>
            </div>
        </Form>
    </div>
</template>

<script lang="ts" setup>
import { Field, Form, Button, CellGroup, NavBar, Dialog, showDialog, showToast } from 'vant';
import { reactive } from 'vue'

const form = reactive({
    username: "",
    password: "",
});

const onClickLeft = () => history.back();

const onSubmit = () => {

}
</script>

<style lang="scss" scoped>
.content {
    margin-top: 40px;

}
</style>
