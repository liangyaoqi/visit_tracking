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
import { Field, showConfirmDialog, Form, Button, CellGroup, NavBar, Dialog, showDialog, showToast } from 'vant';
import { reactive } from 'vue'
import { addAnnounce } from '../request/announce';
import { useStore } from 'vuex';
import { computed } from 'vue';

const form = reactive({
    content: ""
});

const onClickLeft = () => history.back();
const store = useStore();


const onSubmit = async () => {
    showConfirmDialog({
        title: '提示',
        message: '确认发布公告？',
    }).then(async () => {
        console.log(store.state.user.operatorid);

        const result = await addAnnounce({
            content: form.content,
            opratorid: store.state.user.operatorid
        });
        if (result.success) {
            showToast({
                message: '发布成功',
                duration: 1000,
            });
        } else {
            showToast({
                message: '发布失败',
                duration: 1000,
            });
        }
    }).catch(() => {
        // on cancel
        console.log('cancel');
    });

}
</script>

<style lang="scss" scoped>
.content {
    margin-top: 40px;

}
</style>
