<template>
    <div class="blacklist">
        <NavBar title="黑名单管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
</template>

<script setup>
import { NavBar } from 'vant';

const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped></style>
