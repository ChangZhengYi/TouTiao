<template>
    <div class="userprofile">
        <van-nav-bar
            title="个人信息"
            class="app-nav-bar"
            left-arrow
            @click-left="$router.back()"
        />
        <input
            type="file"
            hidden
            ref="file"
            accept="image/*"
            @change="onfilechange"
        />
        <van-cell title="头像" is-link center @click="$refs.file.click()">
            <van-image
                width="30"
                height="30"
                round
                fit="cover"
                :src="user.photo"
            />
        </van-cell>
        <van-cell
            title="昵称"
            is-link
            :value="user.name"
            @click="iseditnameshow = true"
        >
        </van-cell>
        <van-cell
            title="性别"
            is-link
            :value="user.gender === 0 ? '男' : '女'"
            @click="iseditendershow = true"
        >
        </van-cell>
        <van-cell
            title="生日"
            is-link
            :value="user.birthday"
            @click="iseditdayshow = true"
        >
        </van-cell>
        <van-popup
            v-model="iseditnameshow"
            position="bottom"
            :style="{ height: '100%' }"
        >
            <!-- :name="user.name" -->
            <!-- @update-name="(user.name = $event)" -->
            <update-name
                @close="iseditnameshow = false"
                v-if="iseditnameshow"
                v-model="user.name"
            ></update-name>
        </van-popup>
        <van-popup v-model="iseditendershow" position="bottom">
            <update-gender
                @close="iseditendershow = false"
                v-model="user.gender"
            ></update-gender
        ></van-popup>

        <van-popup v-model="iseditdayshow" position="bottom">
            <update-birthday
                v-if="iseditdayshow"
                v-model="user.birthday"
                @close="iseditdayshow = false"
            ></update-birthday>
        </van-popup>

        <van-popup
            class="photoxg"
            v-model="iseditphotoshow"
            position="bottom"
            style="height:100%"
        >
            <update-photo
                v-if="iseditphotoshow"
                :file="previewimg"
                @close="iseditphotoshow = false"
                @update-photo="user.photo = $event"
            ></update-photo>
        </van-popup>
    </div>
</template>

<script>
import { getUserProfile } from "../../api/user";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateName from "./components/update-name.vue";
import UpdatePhoto from "./components/update-photo.vue";
export default {
    name: "UserProfile",
    created() {
        this.loadUserProfile();
    },
    props: {},
    data() {
        return {
            user: {},
            iseditnameshow: false,
            iseditendershow: false,
            iseditdayshow: false,
            iseditphotoshow: false,
            previewimg: null,
        };
    },
    methods: {
        async loadUserProfile() {
            const { data } = await getUserProfile();
            this.user = data.data;
        },
        onfilechange() {
            this.iseditphotoshow = true;
            // const blob = window.URL.createObjectURL(this.$refs.file.files[0]);
            const file = this.$refs.file.files[0];
            this.previewimg = file;
            this.$refs.file.value = "";
        },
    },
    components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
};
</script>

<style scoped lang="less">
.van-popup {
    background-color: #f5f7f9;
}
.photoxg {
    background-color: #000;
}
</style>
