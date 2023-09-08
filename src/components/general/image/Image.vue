<template>
  <div class="image">
    <img class="previewPic" v-lazy="url" @click.stop="handlePreview"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, defineProps} from "vue";
import {v3ImgPreviewFn} from "v3-img-preview";

const props = defineProps({
  url: String,
  size: String,
  width: String,
  height: String,
  radius: String,
  imgArray: Array,
});

const boxWidth = ref(props.size || props.width || "0px");
const boxHeight = ref(props.size || props.height || "0px");
const imgWidth = ref(boxWidth.value);
const imgHeight = ref(boxHeight.value);
const imgTransformX = ref("0px");
const imgTransformY = ref("0px");
const sources = props.imgArray || [props.url];

function getSize() {
  const image = new Image();
  image.src = props.url!;
  image.onload = () => {
    const boxWidthNum = Number(boxWidth.value.replace("px", ""));
    const boxHeightNum = Number(boxHeight.value.replace("px", ""));
    if (image.width / image.height > boxWidthNum / boxHeightNum) {
      imgHeight.value = boxHeight.value;
      const widthNum = image.width * (boxHeightNum / image.height);
      imgWidth.value = widthNum + "px";
      imgTransformX.value = (boxWidthNum - widthNum) / 2 + "px";
      imgTransformY.value = "0px";
    } else {
      imgWidth.value = boxWidth.value;
      const heightNum = image.height * (boxWidthNum / image.width);
      imgHeight.value = heightNum + "px";
      imgTransformX.value = "0px";
      imgTransformY.value = (boxHeightNum - heightNum) / 2 + "px";
    }
  };
}

const handlePreview = () => {
  v3ImgPreviewFn({
    images: sources as string[],
    index: sources.indexOf(props.url)
  });
};

onMounted(() => {
  getSize();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

.image {
  width: v-bind(boxWidth);
  height: v-bind(boxHeight);
  border-radius: v-bind(radius);
  overflow: hidden;
  cursor: pointer;

  .previewPic {
    display: block;
    width: v-bind(imgWidth);
    height: v-bind(imgHeight);
    transform: translateX(v-bind(imgTransformX)) translateY(v-bind(imgTransformY));
    z-index: 8888;
  }
}

.completePic {
  display: block;
  width: 100%;
}
</style>