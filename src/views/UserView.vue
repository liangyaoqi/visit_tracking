<template>
    <div class="user">
        <NavBar title="操作员主页" left-text="返回" left-arrow @click-left="onClickLeft" />

        <ul class="user-list">
            <li>
                <router-link to="/manage">
                    <inspection theme="outline" size="100" fill="#333" />
                    <p class="front"> 访客登记</p>
                </router-link>

            </li>
            <li>
                <router-link to="/manage">
                    <people-search-one theme="outline" size="100" fill="#333" />
                    <p class="front"> 来访检索</p>
                </router-link>

            </li>
            <li>
                <router-link to="/manage">
                    <forbid theme="outline" size="100" fill="#333" />
                    <p class="front"> 黑名单</p>
                </router-link>

            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { Inspection, PeopleSearchOne, Forbid } from '@icon-park/vue-next';
import { NavBar } from 'vant';

const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.user {
    .user-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        height: 100vh;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .front {
        font-size: 20px;
        font-weight: 600;
        color: black;
        text-align: center;
    }
}
</style>
