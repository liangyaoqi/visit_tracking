<template>
    <div class="search">
        <NavBar title="访客记录检索" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="search-input">
        <van-field class="left-icon" v-model="state.name" label="检索" left-icon="smile-o" placeholder="输入访客名称">
            <template #button>
                <van-button icon="search" size="small" type="primary" :loading="state.loading"
                    @click="onSearch">搜索</van-button>
            </template>
        </van-field>
        <div class="select-wrapper">
            <label for="select-box">
                <Icon name="location-o" />入口
            </label>
            <select id="select-box" v-model="state.enter" class="select">
                <option v-for="(option, index) in enters" :key="index" :value="option">{{ option }}
                </option>
            </select>
            <Divider />
        </div>
        <div class="date-picker">
            <van-field v-model="state.visittime" label="日期" readonly @click="state.showPicker = true"
                left-icon="calendar-o" />
            <van-popup v-model:show="state.showPicker" round position="bottom">
                <DatePicker v-model="currentDate" title="选择日期" @confirm="onConfirm" @cancel="state.showPicker = false" />
            </van-popup>
        </div>
    </div>
    <div class="search-list">
        <ul>
            <Collapse v-model="activeNames">
                <li v-for="(item, index) in list">
                    <div class="list-content">
                        <div class="line-one">
                            <p>来访人:{{ item.name }}</p>
                            <p>体温: {{ item.temperature }}</p>
                            <p>是否来自疫区: {{ item.isepidemicarea ? '是' : '否' }}</p>
                        </div>
                        <div class="line-two">
                            <p>来访时间：{{ item.visittime }}</p>
                        </div>
                    </div>
                    <CollapseItem class="more" title="查看详情" :name="index">
                        <p>单位名称:{{ item.companyname }}</p>
                        <p>来访入口: {{ item.enter }}</p>
                        <p>身份证号码：{{ item.idcard }}</p>
                        <p>车牌号：{{ item.vehicleid }}</p>
                    </CollapseItem>
                    <Divider class="list-divider" />
                </li>
            </Collapse>
        </ul>
    </div>
</template>

<script setup>
import { NavBar, Icon, Divider, showFailToast, showSuccessToast, DatePicker, Collapse, CollapseItem } from 'vant';
import { reactive, ref } from 'vue';
import { getVisitorByName } from '../request/visitor'

const state = reactive({
    loading: false,
    name: '',
    enter: '',
    showPicker: false,
    visittime: ''
})

const activeNames = ref(['1']);

const list = ref([])

const date = new Date();
// const currentDate = ref([date.getFullYear.toString, date.getMonth.toString, date.getDay.toString]);
const currentDate = ref(['2023', '04', '02']);

const enters = ref(['A', 'B', 'C', 'D'])

const onClickLeft = () => history.back();


const onSearch = async () => {
    console.log(state.input)
    state.loading = true
    const result = await getVisitorByName(state)
    console.log(result);
    if (result.success) {
        list.value = result.data
        console.log(list.value);
        showSuccessToast(result.message)
        state.loading = false
    } else {
        showFailToast(result.message)
        state.loading = false
    }
}

//日期选择
const onConfirm = ({ selectedOptions }) => {
    state.showPicker = false;
    state.visittime = selectedOptions[0].text + "-" + selectedOptions[1].text + "-" + selectedOptions[2].text;
};
</script>

<style lang="scss" scoped>
.search-input {
    margin: 10px 0;

    .left-icon {
        line-height: 22px;
    }

    .select-wrapper {
        margin-top: 15px;
        margin-left: 20px;
        font-size: 14px;
        margin-bottom: 10px;

        .select {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-left: 10px;
        }
    }
}

.search-list {
    font-size: 14px;
    color: #908c8c;

    .more {
        background-color: #a6a1a1;
    }

    .list-content {
        // .line-one {}

        .line-two {
            display: flex;
            justify-content: end;


        }
    }

    .list-divider {
        margin: 0;
        padding: 0;
    }

    .warning {
        background-color: rgb(219, 85, 85);
    }
}
</style>
