<template>
    <NavBar title="管理操作员" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="operator-list">
        <ul>
            <li v-for="(item, index) in list">
                <div class="list">
                    <div class="list-content">
                        <div class="left">
                            <p>姓名:{{ item.name }}</p>
                            <p>是否为管理员：{{ item.isadmin == 1 ? "是" : "否" }}</p>
                            <p>手机号码：{{ item?.phonenumber }}</p>
                        </div>
                        <div class="right">

                            <van-button type="primary" @click="handleClick(item)">编辑</van-button>
                            <van-button type="danger" @click="handleDelete(item)">删除</van-button>
                        </div>

                    </div>
                    <Divider />
                </div>
            </li>
        </ul>
        <!-- //操作员添加按钮（注册） -->
        <div class="add-btn">
            <Button @click="addOperator">添加操作员</button>
        </div>
        <Overlay :show="show">
            <div class="pop-form">
                <van-form @submit="onSubmit">
                    <CellGroup inset>
                        <van-field v-model="popItem.operatorid" name="operatorid" style="display: none;" />
                        <van-field v-model="popItem.name" name="name" label="姓名" placeholder="姓名" />
                        <van-field v-model="popItem.email" type="text" name="email" label="邮箱" placeholder="邮箱" />
                        <van-field v-model="popItem.phonenumber" type="text" name="phonenumber" label="手机号码"
                            placeholder="手机号码" />
                        <van-field v-model="popItem.password" :type="showPassword ? 'password' : 'text'" name="password"
                            label="密码" placeholder="密码" right-icon="eye-o"
                            @click-right-icon="showPassword = !showPassword" />

                    </CellGroup>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit" style="margin-bottom: 10px;">
                            提交
                        </van-button>
                        <van-button round block type="default" class="cancel-btn" @click="show = false">
                            取消
                        </van-button>
                    </div>
                </van-form>
            </div>
        </Overlay>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NavBar, Divider, CellGroup, showConfirmDialog, Overlay, Button } from 'vant';
import { listOprator, deleteOperator, updateOperator } from '../request/operator';
import { useRouter } from 'vue-router';

const onClickLeft = () => history.back();
const router = useRouter();

const list = ref([]);

const showPassword = ref(true);

const popItem = ref({})


onMounted(async () => {
    const result = await listOprator();
    if (result.success) {
        list.value = result.data;
    }
})

const show = ref(false);
const showPopup = () => {
    show.value = true;
};

const handleClick = async (item) => {
    popItem.value = item;
    console.log(popItem.value);
    showPopup();


}

const onSubmit = async (values) => {
    // if (JSON.stringify(popItem.value) !== JSON.stringify(item)) {
    // 内容有修改，更新
    console.log(values);
    await updateOperator(popItem.value);
    list.value = list.value.map((x) => {
        if (x.operatorid == popItem.value.operatorid) {
            return popItem.value;
        }
        return x;
    });
    // }

    show.value = false;
}

const handleDelete = (item) => {
    showConfirmDialog({
        title: '提示',
        message: '确认删除该操作员吗？',
    }).then(async () => {
        // on confirm 提交修改
        await deleteOperator(item.operatorid);
        list.value = list.value.filter((x) => x.operatorid != item.operatorid);
        console.log('confirm');
    }).catch(() => {
        // on cancel
        console.log('cancel');
    });
    console.log(item);
}

const addOperator = async () => {
    await router.push('/registry')
}
</script>

<style lang="scss" scoped>
.operator-list {
    margin-top: 0px;

    .add-btn {
        display: flex;
        justify-content: center;
    }

    .pop-form {
        margin-top: 20px;
    }

    .list {


        .list-content {
            display: flex;
            padding: 0 10px;
            justify-content: space-between;
            align-items: center;

            .right {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .van-button {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
