<template>
    <div class="dept-manage">
        <NavBar title="单位管理" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="list">
            <ul>
                <li v-for="(item, index) in list">
                    <div class="list-content">
                        <div class="left">
                            <p>单位：{{ item?.deptName }}</p>
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
                        <van-field v-model="form.deptName" name="deptName" label="单位名称" placeholder="单位名称"
                            :rules="[{ required: true, message: '请填写单位名称' }]" />
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
import { ref, onMounted } from "vue"
import { NavBar, showToast, Divider, CellGroup, showConfirmDialog } from "vant"
import { getDept, addDept, deleteDept } from "../request/dept";

const list = ref([]);
const show = ref(false)
const form = ref({
    deptName: ''
})

onMounted(async () => {
    const res = await getDept();
    list.value = res.data;
})

const handleDelete = (item) => {
    console.log(item);
    showConfirmDialog({
        title: '提示',
        message: '确认删除该单位吗？',
    }).then(async () => {
        // on confirm
        const result = await deleteDept(item.deptId);
        console.log(result);
        list.value = list.value.filter((x) => x.deptId !== item.deptId);
        showToast('删除成功')
    }).catch(() => {
        // on cancel
        console.log('cancel');
    });
};

const onClickLeft = () => history.back();

const onSubmit = async () => {
    console.log(form.value.deptName);
    const result = await addDept(form.value);
    if (result.success) {
        showToast('添加成功');
        list.value.push({ deptName: form.value.deptName });
    }
    show.value = false;

}

const handleAdd = () => {
    show.value = true;
};


</script>

<style lang="scss" scoped>
.dept-manage {
    .list {
        .list-content {
            display: flex;
            justify-content: space-around;
        }
    }

    .add-overlay {
        margin-top: 200px;
    }

    .add-overlay {
        margin-top: 200px;
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