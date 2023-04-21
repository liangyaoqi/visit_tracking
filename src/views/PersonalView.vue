<template>
    <div class="personal">
        <NavBar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="avatar">
            <User theme="outline" size="100" fill="#333" />
        </div>
        <div class="operator-msg">
            <CellGroup inset>
                <Cell title="姓名" :value="user.name" />
                <Cell title="邮箱" :value="user.email" />
                <Cell title="手机号" :value="内容" />
                <Cell title="部门" value="内容" />
            </CellGroup>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useStore } from "vuex";
import { NavBar, Cell, CellGroup } from "vant";
import { User } from '@icon-park/vue-next';

const store = useStore();

const user = store.state.user;

const onClickLeft = () => history.back();
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
    }
}
</style>