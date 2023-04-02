<template>
    <!-- top bar -->
    <div class="top-bar">
        <NavBar title="标题">
            <template #left>
                <div v-if="!user.operatorid">
                    <Popover v-model:show="showPopover" :actions="actions2" @select="onSelect" placement="bottom-start">
                        <template #reference>
                            <me theme="outline" size="35" fill="#333" />
                        </template>
                    </Popover>
                </div>
                <div v-else class="avatar">
                    <Popover v-model:show="showPopover" :actions="actions" @select="onSelect" placement="bottom-start">
                        <template #reference>
                            <Image round width="40px" height="40px"
                                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                        </template>
                    </Popover>

                </div>
            </template>
        </NavBar>
    </div>
    <div class="home">

        <div class="admin">
            <router-link to="/admin">
                <Avatar theme="outline" size="120" fill="#333" />
            </router-link>
            <p class="front"> 管理员</p>
        </div>
        <div class="oprator">
            <p class="front">操作员</p>
            <router-link to="/user">
                <setting-two theme="outline" size="120" fill="#333" />
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SettingTwo, Avatar, Me } from '@icon-park/vue-next';
import { NavBar, Image, Popover } from 'vant';
import { useStore } from 'vuex';
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const showPopover = ref(false);

const user = computed(() => store.state.user)

const actions = [
    { text: 'LogOut' },
];
const actions2 = [
    { text: 'LogIn' },
];
const onSelect = (action) => {

    console.log(action.text);
    if (action.text === 'LogOut') {
        localStorage.removeItem('token')
        store.commit('clearUser')
    } else if (action.text === 'LogIn') {

        router.push('/login')
    }

}
    ;

</script>

<style lang="scss" scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;

    .admin {
        margin: 0 auto;
        display: flex;

        .front {
            font-size: 20px;
            font-weight: 600;
            color: black;
            line-height: 80px;
        }
    }

    .oprator {
        margin-top: 50px;
        display: flex;

        .front {
            font-size: 20px;
            font-weight: 600;
            color: black;
            line-height: 80px;
        }
    }
}

.top-bar {
    .avatar {
        padding-top: 5px;
    }
}
</style>
