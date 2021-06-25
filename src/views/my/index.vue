<template>
    <div class="my-container">
        <!-- <div class="user-info"> -->
        <!-- <div class="base-info"></div>
            <div class="data-info"></div> -->

        <van-cell-group class="my-info" v-if="user">
            <van-cell center class="base-info" :border="false">
                <van-image
                    class="avater"
                    slot="icon"
                    round
                    fit="cover"
                    :src="CurrentUser.photo"
                />
                <div slot="title" class="name">{{ CurrentUser.name }}</div>
                <van-button
                    size="small"
                    round
                    class="update-btn"
                    to="/user/profile"
                >
                    编辑资料
                </van-button>
            </van-cell>

            <van-grid :border="false" class="data-info">
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <div class="count">{{ CurrentUser.art_count }}</div>
                        <div class="text">头条</div>
                    </div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <div class="count">{{ CurrentUser.follow_count }}</div>
                        <div class="text">关注</div>
                    </div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <div class="count">{{ CurrentUser.fans_count }}</div>
                        <div class="text">粉丝</div>
                    </div>
                </van-grid-item>
                <van-grid-item class="data-info-item">
                    <div slot="text" class="text-wrap">
                        <div class="count">{{ CurrentUser.like_count }}</div>
                        <div class="text">获赞</div>
                    </div>
                </van-grid-item>
            </van-grid>
        </van-cell-group>

        <div class="not-login" v-else>
            <div @click="$router.push('/login')">
                <img src="./mobile.png" alt="" class="mobile" />
            </div>
            <div class="text" @click="$router.push('/login')">
                登录 / 注册
            </div>
        </div>
        <van-grid :column-num="2" class="nav-grid  mb-4">
            <van-grid-item
                icon-prefix="icon"
                icon="shoucang"
                text="收藏"
                class="nav-grid-item"
            />
            <van-grid-item
                icon-prefix="icon"
                icon="lishi"
                text="历史"
                class="nav-grid-item"
            />
        </van-grid>
        <van-cell title="消息通知" is-link to="" />
        <van-cell title="小智同学" class="mb-4" is-link to="/user/chat" />
        <van-cell
            title="退出登录"
            class="logout-cell"
            v-if="user"
            @click="onlogout"
        />
    </div>
    <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from "../../api/user";
export default {
    created() {
        this.loadCurrentUser();
    },
    props: {},
    data() {
        return {
            CurrentUser: {},
        };
    },
    methods: {
        onlogout() {
            this.$dialog
                .confirm({
                    title: "退出提示",
                    message: "是否确认退出此用户",
                })
                .then(() => {
                    this.$store.commit("setUser", null);
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
        },
        async loadCurrentUser() {
            const { data } = await getCurrentUser();
            console.log(data);
            this.CurrentUser = data.data;
        },
    },
    computed: {
        ...mapState(["user"]),
    },
    components: {},
};
</script>

<style scoped lang="less">
.my-container {
    .my-info {
        background: url(./banner.png) no-repeat;
        background-size: cover;
        .base-info {
            box-sizing: border-box;
            height: 115px;
            background-color: unset;
            // padding: 38px 0 11px;
            padding-top: 38px;
            padding-bottom: 11px;
            .avater {
                box-sizing: border-box;
                width: 66px;
                height: 66px;
                border: 1px solid #fff;
                margin-right: 11px;
            }
            .name {
                color: white;
                font-size: 15px;
            }
            .update-btn {
                // width: 58px;
                height: 16px;
                font-size: 10px;
                color: #666666;
            }
        }
        .data-info {
            // height: 65px;
            .data-info-item {
                height: 65px;
                color: #fff;
                .text-wrap {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .count {
                        font-size: 18px;
                    }
                    .text {
                        font-size: 11px;
                    }
                }
            }
        }

        /deep/ .van-grid-item__content {
            background-color: unset;
        }
    }
    .not-login {
        height: 180px;
        background: url(./banner.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .mobile {
            width: 66px;
            height: 66px;
        }
        .text {
            color: #fff;
            font-size: 14px;
        }
    }
    .nav-grid {
        .nav-grid-item {
            height: 70px;
            /deep/ .icon {
                font-size: 22px;
            }
            /deep/ .icon-shoucang {
                color: #eb5253;
            }
            /deep/ .icon-lishi {
                color: #ff9d1d;
            }
            .van-grid-item__text {
                font-size: 14px;
                color: #333333;
            }
        }
    }
    .logout-cell {
        text-align: center;
        color: #d86262;
    }
    .mb-4 {
        margin-bottom: 4px;
    }
}
</style>
