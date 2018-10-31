<template>
  <div id="app">
    <img data-v-943796a6="" :src="parentValue">
    <div class="canvasBox">
      <vue-screenshot 
        v-model="parentValue"
        :width="500"
        :height="500"
        :value = 'imgvalue'
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
      imgvalue : '',
      parentValue : '123',
    }
  },
  watch : {
    'parentValue': function(val, oldval) {
    },
  },
  methods: {
    pasEnd(val) {
      console.log(val);  //得到密码 可能会进行一些加密动作
      setTimeout(() => { // 模拟请求接口验证密码中 .. 
        if (val === '111111') {
          this.$refs.pay.$payStatus(true) // 传递给子组件
        } else {
          this.$refs.pay.$payStatus(false)
        }
      }, 1000)
    },
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