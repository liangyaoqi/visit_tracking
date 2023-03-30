<template>
    <div class="search">
        <NavBar title="访客记录检索" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
</template>

<script setup>
import { NavBar } from 'vant';

const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped></style>
