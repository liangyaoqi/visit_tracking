<template>
    <div class="blacklist">
        <NavBar title="黑名单管理" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="list">
            <ul>
                <li v-for="(item, index) in list">
                    <div class="list-content">
                        <div class="left">
                            <p>身份证号:{{ item.idcar }}</p>
                            <p>原因：{{ item?.reason }}</p>
                        </div>
                        <div class="right">
                            <van-button type="danger" @click="handleDelete(item)">删除</van-button>
                        </div>
                    </div>
                    <Divider />
                </li>
            </ul>
        </div>
        <div class="add-overlay">
            <van-overlay :show="show">
                <van-form @submit="onSubmit">
                    <CellGroup inset>
                        <van-field v-model="form.idcar" name="身份证号码" label="身份证号码" placeholder="身份证号码"
                            :rules="[{ required: true, message: '请填写身份证号码' }]" />
                        <van-field v-model="form.reason" type="text" name="原因" label="原因" placeholder="原因"
                            :rules="[{ required: true, message: '请填写原因' }]" />
                    </CellGroup>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            提交
                        </van-button>
                        <van-button round block type="default" class="cancel-btn" @click="show = false">
                            取消
                        </van-button>
                    </div>
                </van-form>
            </van-overlay>
        </div>
        <div class="add-blacklist">
            <van-button type="primary" size="large" @click="handleAdd">添加</van-button>
        </div>
    </div>
</template>

<script setup>
import { NavBar, Divider, showConfirmDialog, CellGroup } from 'vant';
import { onMounted, ref } from 'vue';
import { getBlacklist, addBlacklist, deleteBlacklist } from '../request/blacklist';

const form = ref({
    reason: '',
    idcar: '',
})
const show = ref(false)
const list = ref([]);

const handleDelete = (item) => {
    showConfirmDialog({
        title: '提示',
        message: '确认删除该操作员吗？',
    }).then(async () => {
        // on confirm
        const result = await deleteBlacklist(item.idcar);
        console.log(result);
        list.value = list.value.filter((x) => x.idcar !== item.idcar);
    }).catch(() => {
        // on cancel
        console.log('cancel');
    });
};

onMounted(async () => {
    const result = await getBlacklist();
    list.value = result.data
});

const onSubmit = async () => {
    console.log(form.value);
    show.value = false;
    const result = await addBlacklist(form.value);
    list.value.push(form.value);
    console.log(result);
}

const onClickLeft = () => history.back();

const handleAdd = () => {
    show.value = true;
};
</script>

<style lang="scss" scoped>
.blacklist {
    .add-overlay {
        margin-top: 200px;
    }

    .list-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }

    .add-blacklist {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 7vh;

    }
}

.van-button {
    &.cancel-btn {
        margin-top: 10px;
    }
}

.van-form {
    margin-top: 200px;
}
</style>
