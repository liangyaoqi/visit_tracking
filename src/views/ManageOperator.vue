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
        <Overlay :show="show">
            <div class="pop-form">
                <van-form @submit="onSubmit">
                    <CellGroup inset>
                        <van-field v-model="popItem.operatorid" style="display: none;" />
                        <van-field v-model="popItem.name" name="姓名" label="姓名" placeholder="姓名" />
                        <van-field v-model="popItem.isadmin" type="text" name="是否为管理员" label="是否为管理员"
                            placeholder="是否为管理员" />
                        <van-field v-model="popItem.email" type="text" name="邮箱" label="邮箱" placeholder="邮箱" />
                        <van-field v-model="popItem.phonenumber" type="text" name="手机号码" label="手机号码" placeholder="手机号码" />


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
import { NavBar, Divider, CellGroup, showConfirmDialog, Overlay } from 'vant';
import { listOprator } from '../request/operator';

const onClickLeft = () => history.back();

const list = ref([]);

const popItem = ref({})

onMounted(async () => {
    const result = await listOprator();
    if (result.success) {
        console.log(result.data);
        list.value = result.data;
    }
})

const show = ref(false);
const showPopup = () => {
    show.value = true;
};

const handleClick = (item) => {
    popItem.value = item;
    showPopup();
}

const onSubmit = (values) => {
    //获取到id根据id更新管理员
    console.log(popItem.value.operatorid);
    show.value = false;
}

const handleDelete = (item) => {
    showConfirmDialog({
        title: '提示',
        message: '确认删除该操作员吗？',
    }).then(() => {
        // on confirm
        console.log('confirm');
    }).catch(() => {
        // on cancel
        console.log('cancel');
    });
    console.log(item);
}
</script>

<style lang="scss" scoped>
.operator-list {
    margin-top: 0px;

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
