<template>
    <div class="userchat">
        <van-nav-bar
            title="小智同学"
            class="app-nav-bar"
            left-arrow
            @click-left="$router.back()"
        />

        <van-cell-group class="messagelist">
            <van-cell
                :title="item.msg"
                v-for="(item, index) in messages"
                :key="index"
            />
            <!-- <van-cell title="单元格" /> -->
        </van-cell-group>
        <van-cell-group class="sendmessage">
            <van-field
                v-model="message"
                placeholder="请输入消息内容"
                :border="false"
            />
            <van-button
                size="small"
                type="primary"
                class="van-btn"
                @click="onSend"
                >发送</van-button
            >
        </van-cell-group>
    </div>
</template>

<script>
// ES6 import or TypeScript
import { io } from "socket.io-client";
// CommonJS

export default {
    name: "UserChat",
    created() {},
    props: {},
    data() {
        return {
            message: "",
            socket: null,
            messages: [],
        };
    },
    methods: {
        onSend() {
            const data = {
                msg: this.messaage,
                timestamp: Date.now(),
            };
            this.socket.emit("message", data);
            this.messages.push(data);
        },
    },
    components: {},
    created() {
        const socket = io("http://ttapi.research.itcast.cn");
        this.socket = socket;
        socket.on("connect", function() {
            console.log("成功");
        });
        socket.on("disconnect", function() {});
        socket.on("message", function(data) {
            // console.log(data);
            this.messages.push(data);
        });
    },
};
</script>

<style scoped lang="less">
.sendmessage {
    display: flex;
    padding: 0 14px;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
}
.van-btn {
    width: 60px;
}
.messagelist {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
}
</style>
