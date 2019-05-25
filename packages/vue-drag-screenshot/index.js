// 导入组件，组件必须声明 name
import vueScreenshot from './vue-screenshot.vue'

vueScreenshot.install = function (Vue) {
    // 为组件添加 install 方法，用于按需引入
    Vue.component(vueScreenshot.name, vueScreenshot)  // vuePayKeyboard.name 组件的name属性
}

export default vueScreenshot // 导出..