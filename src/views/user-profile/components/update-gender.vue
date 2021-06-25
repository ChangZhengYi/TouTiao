<template>
    <div class="updategender">
        <!-- <van-nav-bar
            title="修改性别"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onClickRight"
        /> -->
        <van-picker
            show-toolbar
            :columns="columns"
            @cancel="$emit('close')"
            @confirm="onConfirm"
            :default-index="defaultindex"
            @change="onchange"
        />
    </div>
</template>

<script>
import { updateUserProfile } from "../../../api/user";
export default {
    name: "UpdateGender",
    created() {},
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            columns: ["男", "女"],
            defaultindex: this.value,
            // localgender
        };
    },
    methods: {
        async onConfirm() {
            this.$toast.loading({
                message: "保存中",
                forbidClick: true,
            });

            try {
                await updateUserProfile({
                    gender: this.defaultindex,
                });
                this.$toast.success("保存成功");
                this.$emit("input", this.defaultindex);
                this.$emit("close");
            } catch (err) {
                // if (err && err.response && err.response.status === 409) {
                //     this.$toast.fail("昵称已经存在");
                // }
            }
        },
        onchange(picker, value, index) {
            this.defaultindex = index;
        },
    },
    components: {},
};
</script>

<style scoped lang="less"></style>
