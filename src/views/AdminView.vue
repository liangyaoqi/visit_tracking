<template>
    <div class="admin">
        <NavBar title="管理员主页" left-text="返回" left-arrow @click-left="onClickLeft" />

        <!-- 列表 -->
        <ul class="admin-list">
            <li class="list-item">
                <router-link to="/manage">
                    <more-app class="operator-icon" theme="outline" size="80" fill="#333" />
                    <p class="front"> 管理操作员</p>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/announced">
                    <Announcement theme="outline" size="80" fill="#333" />
                    <p class="front"> 发布公告</p>
                </router-link>
            </li>
            <li class="list-item">
                <router-link to="/blacklist">
                    <forbid theme="outline" size="100" fill="#333" />
                    <p class="front"> 查看黑名单</p>
                </router-link>

            </li>
            <li class="list-item">
                <router-link to="/dept">
                    <transform theme="outline" size="100" fill="#333" />
                    <p class="front"> 单位管理</p>
                </router-link>

            </li>
        </ul>

    </div>
</template>

<script lang="ts" setup>
import { MoreApp, Announcement, Forbid, Transform } from '@icon-park/vue-next';
import { NavBar } from 'vant';

const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.admin {
    .admin-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        height: 80vh;
        justify-content: space-around;

        .list-item {
            width: 38vw;
            height: 30vh;
            // margin: 20px;
            border-radius: 10px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            box-shadow: 0 0 10px #ccc;
        }

        .operator-icon {
            margin-left: 8px;
        }

        .front {
            font-size: 20px;
            font-weight: 600;
            color: black;
            text-align: center;
        }
    }
}
</style>
