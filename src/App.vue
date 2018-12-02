<template>
  <div id="app">
    <img data-v-943796a6="" :src="parentValue">
    <span class="setcontrol" @click="setcontrol()"> setdata</span>
    <div class="canvasBox">
      <vue-screenshot 
        v-model   = "parentValue"
        :width    = "500"
        :height   = "500"
        :imageSrc = 'imgvalue'
        :control  = 'control'
      >
      </vue-screenshot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      imgvalue : 'https://wei-zhe.github.io/img/logo.b8a1e139.png',
      parentValue : '123',
      control  : {
        narrow   : true,  // 缩小
        clears   : true,  // 清除
        restore  : true,  // 还原
        blowup   : true,  // 放大
        wheel    : true,  // 滚轮缩放 ** 新增
        uniform  : true,  // uniform状态，图片不可拖动 ** 新增
        dragBox  : {      // 新增拖拽盒子固定尺寸 ** 新增
          width   : 160,
          height  : 90,
        }
      }
    }
  },
  watch : {
    'parentValue': function(val, oldval) {
    },
    'control.restore': function(val, oldval) {
      console.log('sadgasdhk', this.control)
    },
  },
  methods: {
    setcontrol(){
      this.control.dragBox = false;
    }
  }
}
</script>

<style lang="scss">
.canvasBox {
  height: 500px;
  width:  500px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
</style>