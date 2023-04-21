<template>
    <div class="user">
        <NavBar title="操作员主页" left-text="返回" left-arrow @click-left="onClickLeft" />

        <ul class="user-list">
            <li class="list-item">
                <router-link to="/rigistered">
                    <inspection theme="outline" size="100" fill="#333" />
                    <p class="front"> 访客登记</p>
                </router-link>

            </li>
            <li class="list-item">
                <router-link to="/search">
                    <message-search theme="outline" size="100" fill="#333" />
                    <p class="front"> 来访检索</p>
                </router-link>

            </li>
            <li class="list-item">
                <router-link to="/blacklist">
                    <forbid theme="outline" size="100" fill="#333" />
                    <p class="front"> 黑名单</p>
                </router-link>

            </li>
            <li class="list-item">
                <router-link to="/personal">
                    <personal-privacy theme="outline" size="100" fill="#333" />
                    <p class="front"> 我的信息</p>
                </router-link>

            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { Inspection, MessageSearch, PersonalPrivacy, Forbid } from '@icon-park/vue-next';
import { NavBar } from 'vant';

const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.user {
    .user-list {
        margin-top: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;

        .list-item {
            text-align: center;
            width: 20vh;
        }
    }

    .front {
        font-size: 20px;
        font-weight: 600;
        color: black;
        text-align: center;
    }
}
</style>
