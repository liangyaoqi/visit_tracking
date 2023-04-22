<template>
    <div class="personal">
        <NavBar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="avatar">
            <User theme="outline" size="100" fill="#333" />
        </div>
        <div class="operator-msg" v-if="edit">
            <CellGroup inset>
                <Cell title="姓名" :value="user.name" />
                <Cell title="邮箱" :value="user.email" />
                <Cell title="手机号" :value="user.phonenumber" />
                <Cell title="部门" :value="user.deptid" />
            </CellGroup>
        </div>
        <div class="edit-form" v-else="edit"><van-form @submit="onSubmit">
                <CellGroup inset>
                    <van-field v-model="form.deptid" name="deptid" label="部门" placeholder="部门" />
                    <van-field v-model="form.email" type="email" name="email" label="邮箱" placeholder="邮箱" />
                    <van-field v-model="form.name" name="name" label="昵称" placeholder="昵称" />
                    <van-field v-model="form.password" name="password" label="密码" placeholder="密码" />
                    <van-field v-model="form.phonenumber" type="phone" name="phonenumber" label="手机号码" placeholder="手机号码" />
                    <van-field v-model="form.position" name="position" label="地区" placeholder="地区" />

                </CellGroup>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form></div>
        <div class="edit-btn">
            <Button icon="edit" type="primary" @click="onEdit" v-if="edit">修改个人信息</Button>
            <Button icon="close" type="primary" @click="onCancel" v-else="edit">取消</Button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex";
import { NavBar, Cell, CellGroup, Button, showToast } from "vant";
import { User } from '@icon-park/vue-next';
import { updateOperator } from "../request/operator";

const edit = ref(true);
const form = ref({
    deptid: null,
    email: null,
    isadmin: "1",
    name: "admin",
    operatorid: 1,
    password: "admin",
    phonenumber: null,
    position: null,
    username: "admin"
});

const store = useStore();

const user = ref(store.state.user);

const onClickLeft = () => history.back();

const onEdit = () => {
    edit.value = edit.value ? false : true;
}

const onCancel = () => {
    edit.value = edit.value ? false : true;
}

const onSubmit = async () => {
    const result = await updateOperator(form.value);
    if (result.success) {
        showToast('修改成功')
        store.commit('updateUser', user.value.operatorid)
        setTimeout(() => {
            user.value = store.state.user;
        }, 500)
        console.log(store.state.user)
    } else {
        showToast('修改失败')
    }
}
</script>

<style lang="scss" scoped>
.personal {
    .avatar {
        margin-top: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .operator-msg {
        margin-top: 20px;
        height: 40vh;
        width: 100vw;
    }

    .edit-form {
        display: flex;
        justify-content: center;
    }

    .edit-btn {
        display: flex;
        justify-content: center;
    }

}
</style>