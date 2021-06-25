<template>
    <div class="updatename">
        <van-nav-bar
            title="修改昵称"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onClickRight"
        />

        <div class="name-field-warp">
            <van-field
                v-model="localname"
                rows="2"
                autosize
                type="textarea"
                maxlength="7"
                placeholder="请输入昵称"
                show-word-limit
            />
        </div>
    </div>
</template>

<script>
import { updateUserProfile } from "../../../api/user";
export default {
    name: "UpdateName",
    created() {},
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            localname: this.value,
        };
    },
    methods: {
        async onClickRight() {
            this.$toast.loading({   
                message: "保存中",
                forbidClick: true,
            });

            try {
                await updateUserProfile({
                    name: this.localname,
                });
                this.$toast.success("保存成功");
                this.$emit("input", this.localname);
                this.$emit("close");
            } catch (err) {
                if (err && err.response && err.response.status === 409) {
                    this.$toast.fail("昵称已经存在");
                }
            }
        },
    },
    components: {},
};
</script>

<style scoped lang="less">
.name-field-warp {
    padding: 10px;
}
</style>
