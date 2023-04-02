<template>
    <div class="register">
        <NavBar title="访客登记" left-text="返回" left-arrow @click-left="onClickLeft" />

        <div class="notice-bar">
            <NoticeBar left-icon="volume-o" text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。" />
        </div>
        <div class="chart-box">
            <v-chart class="chart" :option="option" autoresize />
        </div>
        <div class="total-visitor">今日到访总人数:{{ total }}</div>
        <div class="register-box" @click="show = true">
            <edit theme="outline" size="100" fill="#333" />
            <p class="front"> 访客登记</p>
        </div>
        <!-- 弹出层 -->
        <Overlay :show="show">
            <div class="prop-form">
                <van-form @submit="onSubmit">
                    <CellGroup inset>
                        <van-field v-model="form.name" name="姓名" label="姓名" placeholder="姓名"
                            :rules="[{ required: true, message: '请填写姓名' }]" />
                        <van-field v-model="form.idcard" type="text" name="身份证号码" label="身份证号码" placeholder="身份证号码"
                            :rules="[{ required: true, message: '请填写身份证号码' }]" />
                        <van-field v-model="form.temperature" type="text" name="体温" label="体温" placeholder="体温"
                            :rules="[{ required: true, message: '请填写体温' }]" />
                        <van-field v-model="form.vehicleid" type="text" name="车牌号" label="车牌号" placeholder="车牌号"
                            :rules="[{ required: false, message: '请填写车牌号' }]" />
                        <van-field v-model="form.companyname" type="text" name="访客单位" label="访客单位" placeholder="访客单位"
                            :rules="[{ required: true, message: '请填写访客单位' }]" />
                        <van-field v-model="form.reason" type="text" name="来访事由" label="来访事由" placeholder="来访事由"
                            :rules="[{ required: true, message: '请填写来访事由' }]" />
                        <Checkbox v-model="form.isepidemicarea" icon-size="20px" class="checkbox">是否来自疫区</Checkbox>
                        <Divider :style="{ padding: '0 16px' }"></Divider>
                        <div class="select-wrapper">
                            <label for="select-box">
                                <Icon name="location-o" />入口
                            </label>
                            <select id="select-box" v-model="form.enter" class="select">
                                <option v-for="(option, index) in enters" :key="index" :value="option">{{ option }}
                                </option>
                            </select>
                        </div>

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
            </div>
        </Overlay>
    </div>
</template>

<script setup>
import { NavBar, NoticeBar, Overlay, Checkbox, showToast, CellGroup, Icon, Divider, showFailToast, showSuccessToast } from 'vant';
import { Edit } from '@icon-park/vue-next';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { ref, reactive, onMounted } from 'vue';
import { addVisitor } from '../request/visitor';
import { getBlacklist } from '../request/blacklist';

const total = ref(0);
const show = ref(false);
const form = reactive({
    name: "",
    idcard: "",
    temperature: "",
    vehicleid: "",
    companyname: "",
    reason: "",
    isepidemicarea: false,
    enter: "A"
});

// 初始化获取数据
onMounted(() => {
    // 获取数据
    // axios.get('/api/visitor/total').then(res => {
    //     total.value = res.data;
    // })
    // axios.get('/api/visitor/flow').then(res => {
    //     option.value.xAxis.data = res.data.time;
    //     option.value.series[0].data = res.data.flow;
    // })
    console.log('mounted');
})

const enters = ref([
    'A',
    'B',
    'C',
    'D',
])

const onSubmit = async () => {
    if (form.name == "" || form.idcard == "" || form.temperature == "" || form.companyname == "" || form.reason == "") {
        showFailToast({
            message: '请填写完整信息',
            duration: 2000,
            forbidClick: true,
        });
        return;
    } else {
        if (form.temperature > 37.3) {
            showFailToast({
                message: '体温异常',
                duration: 2000,
                forbidClick: true,
            });
            return;
        } else if (form.name) {
            form.isepidemicarea ? form.isepidemicarea = 1 : form.isepidemicarea = 0;
            const result = await addVisitor(form);
            if (result.success) {
                //查看是否是黑名单中的人
                const result = await getBlacklist(form.idcard);
                if (result.data) {
                    showFailToast({
                        message: '黑名单中的人员',
                        duration: 2000,
                        forbidClick: true,
                    });
                    return;
                }
                showSuccessToast({
                    message: '登记成功',
                    duration: 2000,
                    forbidClick: true,
                });
            } else {
                showFailToast({
                    message: '登记失败',
                    duration: 2000,
                    forbidClick: true,
                });
            }
            show.value = false;
        }
    }
    total.value += 1;
    show.value = false;
}

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    GridComponent
]);

// echars数据
const option = ref({
    title: {
        text: '访客流量统计',
        left: 'center',
    },
    tooltip: {
        formatter: function (params) {
            return '时间：' + params.name + '<br/>' +
                '人流量：' + params.value;
        }
    },
    xAxis: {
        data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    },
    yAxis: {},
    series: [{
        name: '人流量',
        type: 'line',
        data: [50, 60, 70, 80, 90, 100, 120, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750]
    }]
});


const onClickLeft = () => history.back();


</script>

<style lang="scss" scoped>
.register {
    .register-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        // height: 100vh;
        justify-content: space-around;
        border: 1px solid #333;

        .front {
            font-size: 20px;
            font-weight: 600;
            color: black;
            text-align: center;
        }
    }

    .chart-box {

        .echarts-title {
            text-align: center;
        }
    }

    .chart {
        width: 100vw;
        height: 50vh;
    }

    .total-visitor {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: black;
        text-align: center;
        margin-bottom: 10vh;
    }

    .prop-form {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .checkbox {
            padding-left: 20px;
            margin: 10px 0;
            font-size: 14px;
        }

        .select-wrapper {
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


        .cancel-btn {
            margin-top: 10px;
        }
    }
}
</style>
