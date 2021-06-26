<template>
    <div class="login_container">
        <van-nav-bar
            title="登录 / 注册"
            class="app-nav-bar"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 登录表单 -->
        <van-form
            @submit="onLogin"
            :show-error="false"
            :validate-first="true"
            :show-error-message="false"
            ref="login_form"
            @failed="onfailed"
        >
            <van-field
                v-model="user.mobile"
                icon-prefix="icon"
                left-icon="shouji"
                name="mobile"
                center
                placeholder="请输入手机号"
                :rules="formrules.mobile"
            />
            <van-field
                v-model="user.code"
                clearable
                icon-prefix="icon"
                name="code"
                slot=""
                left-icon="yanzhengma"
                center
                placeholder="请输入验证码"
                :rules="formrules.code"
            >
                <template #button>
                    <van-count-down
                        :time="1000 * 60"
                        format=" ss s"
                        v-if="isshow"
                        @finish="isshow = false"
                    />
                    <van-button
                        v-else
                        size="small"
                        round
                        class="sand-btn"
                        @click.prevent="onSendSms"
                        :loading="isloding"
                        >发送验证码</van-button
                    >
                </template></van-field
            >
            <div class="login-btn-web">
                <van-button
                    class="login-btn"
                    type="info"
                    size="large"
                    @click="onLogin"
                    >登录</van-button
                >
            </div>
        </van-form>
    </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
import { Toast } from "vant";

export default {
    name: "login",
    created() {},
    props: {},
    data() {
        return {
            user: {
                mobile: "13911111111", //手机号
                code: "246810", //验证码
            },
            formrules: {
                mobile: [
                    { required: true, message: "请填写手机号" },
                    {
                        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                        message: "手机号格式错误",
                    },
                ],
                code: [
                    { required: true, message: "请填写验证码" },
                    {
                        pattern: /^\d{6}$/,
                        message: "验证码错误",
                    },
                ],
            },
            //控制倒计时和发送按钮的显示与隐藏
            isshow: false,
            isloding: false,
        };
    },
    methods: {
        async onLogin() {
            Toast.loading({
                message: "登录中...",
                forbidClick: true, //禁止背景点击
                duration: 0,
            });
            try {
                if (this.user.mobile == "" || this.user.code == "") {
                    return;
                }
                const { data } = await login(this.user);
                Toast.success("登录成功");
                this.$store.commit("setUser", data.data);
                this.$store.commit("removeCachePage", "layout");
                //登录成功跳转回原来界面
                this.$router.back();
                // this.$router.push(this.$router.query.redirect || "/");
            } catch (err) {
                console.log(err);
                // Toast.fail("登录失败，手机号或验证码错误");
            }
        },
        onfailed(error) {
            console.log("验证失败", error);
            if (error.errors[0]) {
                this.$toast({
                    message: error.errors[0].message,
                    position: "top",
                });
            }
        },
        async onSendSms() {
            // validate

            try {
                await this.$refs["login_form"].validate("mobile");
                this.isloding = true;
                const res = await sendSms(this.user.mobile);
                console.log(res);
                this.isshow = true;
            } catch (err) {
                // console.log(err);
                let message = "";
                if (err && err.response && err.response.status === 429) {
                    //短信发送失败的错误提示
                    message = "发送太频繁了，请稍后重试";
                } else if (err.name === "mobile") {
                    //表单验证失败的错误提示
                    message = err.message;
                } else {
                    //未知的错误
                    message = "发送失败，请稍后重试";
                }

                this.$toast({
                    message: err.message,
                    position: "top",
                });
            }
            this.isloding = false;
        },
    },
    components: {},
};
</script>

<style scoped lang="less">
.login-btn-web {
    padding: 26px 16px;
    .login-btn {
        background-color: #3296fa;
        border: none;
        .van-button__text {
            font-size: 15px;
        }
    }
}
.sand-btn {
    width: 79px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
        font-size: 11px;
        color: #666666;
    }
}
</style>
