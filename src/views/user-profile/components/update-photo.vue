<template>
    <div class="updatephoto">
        <img :src="image" alt="" ref="image" class="image" />

        <van-nav-bar
            class="toolbar"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onClickRight"
        />
    </div>
</template>

<script>
import { updateUserPhoto } from "../../../api/user";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
    name: "UpdatePhoto",
    created() {},
    props: {
        file: {
            // type: Object,
            required: true,
        },
    },
    data() {
        return {
            image: window.URL.createObjectURL(this.file),
            Cropper: null,
        };
    },
    methods: {
        getCroppedCanvas() {
            return new Promise((resolve) => {
                this.Cropper.getCroppedCanvas().toBlob((blob) => {
                    resolve(blob);
                });
            });
        },
        async onClickRight() {
            this.$toast.loading({
                message: "保存中",
                forbidClick: true,
                duration: 0,
            });

            const file = await this.getCroppedCanvas();
            const fd = new FormData();
            fd.append("photo", file);
            // const fd = new FormData();
            // fd.append("photo", this.file);
            await updateUserPhoto(fd);
            this.$toast.success("保存成功");
            this.$emit("update-photo", window.URL.createObjectURL(file));
            this.$emit("close");
        },
    },
    components: {},
    mounted() {
        const image = this.$refs.image;
        this.Cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: "move",
            aspectRatio: 1,
            // autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true,
        });
        console.log(Cropper);
    },
};
</script>

<style scoped lang="less">
.toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
}
.image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
}
</style>
