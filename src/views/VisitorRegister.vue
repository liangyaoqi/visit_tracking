<template>
    <div class="register">
        <NavBar title="访客登记" left-text="返回" left-arrow @click-left="onClickLeft" />

        <div class="notice-bar">
            <NoticeBar left-icon="volume-o" :text="notice" />
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
                        <van-button round block type="primary" class="auto-input" @click="onAutoInput">
                            自动录入
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
import { getAnnounce } from '../request/announce'
import { addVisitor, todayVisitor, getEcharsData } from '../request/visitor';
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
const notice = ref('')

// 初始化获取数据
onMounted(async () => {
    // 获取数据总人数
    const todayCount = await todayVisitor()
    total.value = todayCount.data;
    console.log(total.value);

    //获取公告
    const result = await getAnnounce();
    if (result.success) {
        notice.value = result.data.content
    }

    // 获取echarts数据
    const echarsData = await getEcharsData();
    console.log(echarsData);
    option.value.series[0].data = echarsData

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
                if (result.data.filter(item => item.idcar == form.idcard).length > 0) {
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
                return
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
        data: []
    }]
});


const onClickLeft = () => history.back();

const onAutoInput = () => {
    form.name = getUserName();
    form.idcard = generateIdCard();
    form.temperature = "36.5";
    form.vehicleid = "粤A12345";
    form.companyname = "深圳市腾讯计算机系统有限公司";
    form.reason = "上班";
    form.isepidemicarea = false;
    form.enter = "A";
}

function generateIdCard() {
    const addressCode = ["11", "12", "13", "14", "15", "21", "22", "23", "31", "32", "33", "34", "35", "36", "37", "41", "42", "43", "44", "45", "46", "50", "51", "52", "53", "54", "61", "62", "63", "64", "65", "71", "81", "82", "91"];
    const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCode = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    const addressCodeIndex = Math.floor(Math.random() * addressCode.length);
    const address = addressCode[addressCodeIndex];
    const birthday = new Date(Math.floor(Math.random() * (new Date().getTime() - new Date("1900-01-01").getTime())) + new Date("1900-01-01").getTime());
    const year = birthday.getFullYear().toString().substring(2);
    const month = (birthday.getMonth() + 1).toString().padStart(2, "0");
    const day = birthday.getDate().toString().padStart(2, "0");
    let randomCode = "";
    for (let i = 0; i < 3; i++) {
        randomCode += Math.floor(Math.random() * 10);
    }
    let idCard = `${address}${year}${month}${day}${randomCode}`;
    let sum = 0;
    for (let i = 0; i < idCard.length; i++) {
        sum += parseInt(idCard[i]) * weightFactors[i];
    }
    let checkCodeIndex = sum % 11;
    idCard += checkCode[checkCodeIndex];
    return idCard;
}

function getUserName() {
    //百家姓 
    var familyNames = new Array("赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹");
    //名称 
    var givenNames = new Array("星辰", "美丽", "翔", "淑华", "晶莹", "云浩", "正气", "雨涵", "嘉怡", "佳毅", "皓月", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", "子璇", "淼", "国栋", "夫子", "悦心", "甜", "敏", "尚", "国贤", "贺祥", "越峰", "昊轩", "启悦", "皓然", "建国", "益冉", "瑾春", "月仙", "雅芬", "章章", "文昊", "大东", "雄霖", "浩晨", "熙涵", "切瑞", "枫叶", "欣欣", "宜豪", "欣慧", "建业", "建林", "亦菲", "皓轩", "冰洁", "佳欣", "涵涵", "月辰", "淳美", "恩铭", "伟洋", "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌", "佳怡", "欧莱", "晨茜", "晨璐", "运昊", "梦欣", "淑君", "晶滢", "润莎", "榕汕", "乐毅", "佳玉", "晓庆", "一鸣", "语晨", "添池", "田心", "雨泽", "雅晗", "雅涵", "美欣", "树佳", "文轩", "檀丽", "欣源", "梦雅", "榕润", "欣汝", "慧嘉", "建新",);
    var i = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
    var j = parseInt(10 * Math.random()) * 10 + parseInt(10 * Math.random());
    return familyNames[i] + givenNames[j];
}

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

        .auto-input {
            margin-top: 10px;
        }
    }
}
</style>
