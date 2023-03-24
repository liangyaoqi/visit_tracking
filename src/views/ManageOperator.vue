<template>
    <NavBar title="管理操作员" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="operator-list">
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
            <List v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <Cell v-for="item in list" :key="item" :title="item" />
            </List>
        </PullRefresh>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { NavBar, PullRefresh, List, Cell } from 'vant';

const onClickLeft = () => history.back();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
            list.value = [];
            refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }
        loading.value = false;

        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
};

const onRefresh = () => {
    // 清空列表数据
    finished.value = false;

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    loading.value = true;
    onLoad();
};
</script>

<style lang="scss" scoped></style>
