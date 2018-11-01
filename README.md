# vue-drag-screenshot
 
A Vue component to drag-screenshot
一个图片裁剪工具
 ## demo演示
 [demo](https://wei-zhe.github.io/)
 
 ## 安装
 
 ```JS
 npm install vue-drag-screenshot -S
 ```
 
 ## 使用
 
 ```js
 // ES6
 import vuedragscreenshot from 'vue-drag-screenshot'
 
 Vue.use(vuedragscreenshot)

 <vue-screenshot 
    v-model="parentValue"
    :width="500"
    :height="500"
    :imageSrc='imageSrc'
    >
</vue-screenshot>
 ```

## v-model
实时刷新的截图

```js
    // ES6
    <img :src="parentValue"/>
 ```

### Props
 
 |    name    |    Description   |   type   |default|
 | -----------------  | ---------------- | :--------: | :----------: |
 | width    | 截图区域宽        | Number	| 500
 | height   | 截图区域高        | Number	| 500
 | imageSrc | 传入需要裁剪的图片 | String	 | ''
 
 