<template>
    <div class="admin">
        <!-- 列表 -->
        <ul class="admin-list">
            <li>
                <router-link to="/manage">
                    <more-app class="operator-icon" theme="outline" size="80" fill="#333" />
                    <p class="front"> 管理操作员</p>
                </router-link>
            </li>
            <li>
                <router-link to="/announced">
                    <Announcement theme="outline" size="80" fill="#333" />
                    <p class="front"> 发布公告</p>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script lang="ts" setup>
import { MoreApp, Announcement } from '@icon-park/vue-next';

</script>

<style lang="scss" scoped>
.admin {
    .admin-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        height: 100vh;
        justify-content: space-around;

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
