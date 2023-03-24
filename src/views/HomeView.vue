<template>
    <div class="home">
        <div class="admin">
            <router-link to="/admin">
                <Avatar theme="outline" size="120" fill="#333" />
            </router-link>
            <p class="front"> 管理员</p>
        </div>
        <div class="oprator">
            <p class="front">操作员</p>
            <router-link to="/user">
                <setting-two theme="outline" size="120" fill="#333" />
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SettingTwo, Avatar } from '@icon-park/vue-next';
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;

    .admin {
        margin: 0 auto;
        display: flex;

        .front {
            font-size: 20px;
            font-weight: 600;
            color: black;
            line-height: 80px;
        }
    }

    .oprator {
        margin-top: 50px;
        display: flex;

        .front {
            font-size: 20px;
            font-weight: 600;
            color: black;
            line-height: 80px;
        }
    }
}
</style>
