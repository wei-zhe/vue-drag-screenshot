<template>
    <div 
        :style="{
            'width' : width + 'px',
            'height' : height + 'px',
        }"
        class="screenshot" 
        @contextmenu="stopRightKey($event)"
        @mouseenter="onMouseLive = true;" 
        @mouseleave="onMouseLive = false;"
    >
        <input 
            id="imageScreenshotPic" 
            type="file" 
            name="files[]" 
            accept='image/jpeg, image/jpg, image/png' 
            :value="inputData"
            v-on:change="uploadImage($event)"
            style="display: none;"
        />
        <label for="imageScreenshotPic" v-if="!imgData.src">
            <div class="uploadIcon" v-if="!imgData.src">
            上传图片
            </div>
        </label>
        
        <div class="control" v-if="imgData.src && controlData.length">
            <div class="controlIcon" v-html='controlicon.htmlSvg'></div>
            <div class="controlBox">
                <div class="controlBoxList">

                    <div 
                        v-for="item in controlData"
                        v-html='item.icon.htmlSvg'
                        class="list"
                        :class="[item.class]" 
                        @click="settingFs(item.type)"
                    ></div>

                </div>
            </div>
        </div>

        <canvas 
            ref="screenshotCanvas"
            id="screenshotCanvas" 
            :width="width" 
            :height="height" 

        >
            您的浏览器不支持 HTML5 canvas 标签。
        </canvas>
        <canvas 
            ref="imgLoadScreenshotCanvas"
            id="imgLoadScreenshotCanvas" 
            :width="moveDomData.width" 
            :height="moveDomData.height" 

        >
            您的浏览器不支持 HTML5 canvas 标签。
        </canvas>

        <div 
            v-if="imgData.src"
            class="moveDom"
            @mousedown="imgMousedownFs($event)" 
            @mouseup="imgMouseupFs($event)" 
            :style="{
                'width'  : imgData.width  + 'px',
                'height' : imgData.height + 'px',
                'top'    : imgData.top    + 'px',
                'left'   : imgData.left   + 'px',
            }"
        >
        </div>
        
        <div 
            v-if="imgData.src"
            class="lineImg borderColor"
            @mousedown="
                moveDomMousedownFs($event, 8)
            " 
            @mouseup="
                moveDomMouseupFs($event, 8);
            " 
            :style="{
                'width'  : moveDomData.width  + 'px',
                'height' : moveDomData.height + 'px',
                'top'    : moveDomData.top    + 'px',
                'left'   : moveDomData.left   + 'px',
                'background' : 'rgba(238, 238, 248, 0)', 
                'z-index': 110,
            }"
        >
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 0)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 0);
                " 
                style="
                    width: 10px;
                    height: 10px;
                    top: -5px;
                    left: -5px;
                    cursor: se-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 2)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 2);
                " 
                style="
                    width: 10px;
                    height: 10px;
                    top: -5px;
                    right: -5px;
                    cursor: sw-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 3);
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 3);
                " 
                style="
                    width: 10px;
                    height: 10px;
                    bottom: -5px;
                    left: -5px;
                    cursor: ne-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 1)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 1);
                " 
                style="
                    width: 10px;
                    height: 10px;
                    bottom: -5px;
                    right: -5px;
                    cursor: nw-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 4)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 4);
                " 
                style="
                    top: -3px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    cursor: s-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 5)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 5);
                " 
                style="
                    bottom: -3px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    cursor: n-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 6)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 6);
                " 
                style="
                    bottom: 0px;
                    top: 0px;
                    left: -3px;
                    right: 0px;
                    margin: auto 0;
                    cursor: e-resize;
                "
            ></span>
            <span class="cirque"
                v-if="moveDomData.dragBoxSize"
                @mousedown="
                    stopDocument($event);
                    moveDomMousedownFs($event, 7)
                " 
                @mouseup="
                    stopDocument($event);
                    moveDomMouseupFs($event, 7);
                " 
                style="
                    bottom: 0px;
                    top: 0px;
                    right: -3px;
                    margin: auto 0;
                    cursor: w-resize;
                "
            ></span>
        </div>

        <div 
            v-if="imgData.src"
            class="lineImg"
            :style="{
                'width'  : '100%',
                'height' : (moveDomData.top > 0 ? moveDomData.top : 0) + 'px',
                'top'    : '0px',
                'left'   : '0px',
            }"
        >
        </div>

        <div 
            v-if="imgData.src"
            class="lineImg"
            :style="{
                'width'  : '100%',
                'height' : moveDomData.bottomHeight + 'px',
                'bottom' : '0px',
                'left'   : '0px',
            }"
        >
        </div>

        <div 
            v-if="imgData.src"
            class="lineImg"
            :style="{
                'width'  : (moveDomData.left > 0 ? moveDomData.left : 0) + 'px',
                'top'    : moveDomData.top    + 'px',
                'height' : moveDomData.height + 'px',
                'left'   : 0                  + 'px',
            }"
        >
        </div>

        <div  
            v-if="imgData.src"
            class="lineImg"
            :style="{
                'width'  : moveDomData.rightWidth  + 'px',
                'height' : moveDomData.height + 'px',
                'top'    : moveDomData.top    + 'px',
                'right'  : 0              + 'px',
            }"
        >
        </div>
    </div>
</template>
<script>
import screenshotIcon from './icon.js' // 导入组件

export default {
    name: 'vue-screenshot',
    props: {
        width: { 
            type: Number,
            default: 500
        }, 
        height: { 
            type: Number,
            default: 500
        }, 
        parentValue : {

        },
        imageSrc : {
            type: String,
            default: ''
        },
        control  : {
            type: Object,
            default:function () {
                return {};
            }
        }
    },
    model: {
      prop: 'value',//绑定的值，通过父组件传递
      event: 'update'//自定义时间名
    },
    data() {
        return {
            inputData : '',
            imgData : {
                src    : false,
                top    : 0,
                left   : 0,
                width  : 0,
                height : 0,
            },
            image   : '',
            file    : false,
            ctx     : '',
            imgCtx  : '',
            moveData : {
                preX : 0,
                preY : 0,
            },
            maskDomData : {
                bottomHeight : 0,
                rightWidth   : 0,
            },
            moveDomData : {
                width  : 0,
                height : 0,
                top    : 0,
                left   : 0,
                preY   : 0,
                preX   : 0,
                type   : 0,
                rightWidth    : 0,
                bottomHeight  : 0,
                mousewheel    : true,
                mousewheelImg : false,
                mousewheelBox : false,
                dragBoxSize   : true,
            },
            imgLoadCanvasData : {
                top  : 0,
                left : 0,
            },
            controlicon : '',
            controlData : [],
            onMouseLive : false,
        }
    },
    watch : {
        'imageSrc':       function(val, oldval) {
            this.newAddImage(this.imageSrc)
        },
        'imgData.height': function(val, oldval) {
            this.moveDomDataFs();
        },
        'imgData.width':  function(val, oldval) {
            this.moveDomDataFs();
        },
        'control':        function(val, oldval) {
            this.chankControl();
        },
        'control.narrow':        function(val, oldval) {
            this.chankControl();
        },
        'control.clears':        function(val, oldval) {
            this.chankControl();
        },
        'control.restore':        function(val, oldval) {
            this.chankControl();
        },
        'control.blowup':        function(val, oldval) {
            this.chankControl();
        },
        'control.wheel':        function(val, oldval) {
            this.chankControl();
        },
        'control.dragBox':        function(val, oldval) {
            this.chankControl();
        },
    },
    computed: {  
    },
    mounted () {
        this.newAddImage(this.imageSrc);
        this.chankControl();
        //在mounted()方法里监听mousewheel；
        // chrome and ie
        window.addEventListener('mousewheel',this.handleScroll,false);
        //// firefox
        window.addEventListener("DOMMouseScroll",this.handleScroll,false);

    },
    methods: {
        chankControl(){
            this.controlData = [];
            this.controlicon = screenshotIcon.setting;
            this.moveDomData.dragBoxSize = true;
            for(let key in this.control){
                switch(key){
                    case 'narrow'  :
                    case 'clears'  :
                    case 'restore' :
                    case 'blowup'  :
                        if(this.control[key]){
                            let keyData = {
                                class : key + 'Img',
                                type  : key,
                                icon  : screenshotIcon[key], 
                            }
                            this.controlData.push(keyData);
                            break;
                        }else{
                            for(let j = 0; j < this.controlData.length; j++) {
                                let thisdata = this.controlData[j];
                                if(thisdata.type == key){
                                    this.controlData.splice(j , 1);
                                    console.log(this.controlData)
                                }
                            } 
                        }
                    case 'wheel'   :
                        if(this.control[key]){
                            this.moveDomData.mousewheelImg = true;
                        }else{
                            this.moveDomData.mousewheelImg = false;
                        }
                        break;
                    case 'uniform':
                        if(this.control.wheel && this.control.uniform){
                            this.moveDomData.mousewheelImg = false;
                            this.moveDomData.mousewheelBox = true;
                        }else{
                            this.moveDomData.mousewheelImg = true;
                            this.moveDomData.mousewheelBox = false;
                        }
                        break;
                    case 'dragBox' :
                        if(this.control.dragBox){
                            this.moveDomData.dragBoxSize = false;
                            this.moveDomData.height = this.control[key].height;
                            this.moveDomData.width  = this.control[key].width;
                        }else{
                            this.moveDomData.dragBoxSize = true;
                        }
                        break;
                }
            }
        },
        uploadImage(event) {  // 素材上传图片
            this.file = event.target.files[0];
                    if (!this.file || !this.file.name) return;

                    if (!/\.(?:jpg|jpeg|JPG|png|PNG|svg|SVG)$/.test(this.file.name)) {
                alert('请上传图片文件')
                        return;
                    }
            var reader = new FileReader();

            reader.readAsDataURL(this.file);

            reader.onprogress = function(e) { //这个是定时触发的事件，文件较大的时候较明显
                var p = '已完成：' + Math.round(e.loaded / e.total * 100) + '%';
                // reader.abort()
            };

            reader.onabort = function(e) {
            };

            reader.onerror = function() {     //文件读取出错的时候触发
            };

            let _this = this;

            reader.onload = function(e) {
                _this.newAddImage(this.result)
            }

        },
        imgSizeCompute(){     // 图片最大化显示
            let action = {
                width  : 0,
                height : 0,
                sclae  : 0,
            }
            if(this.image.width > this.width){
                action.width = 1;
            }else{
                this.imgData.width = this.image.width;
            };

            if(this.image.height > this.height){
                action.height = 1;
            }else{
                this.imgData.height = this.image.height;
            };
            
            let sclae = this.image.width / this.image.height;

            if(this.image.height > this.image.width){
                action.sclae = 1;
            }
            if(action.width && action.height){
                if(action.sclae){
                    this.imgData.height = this.height;
                    this.imgData.width  = this.height * sclae;
                }else{
                    this.imgData.width = this.width;
                    this.imgData.height  = this.width / sclae;
                }
            }
            if(this.moveDomData.dragBoxSize){
                this.moveDomData.height = this.imgData.height;
                this.moveDomData.width = this.imgData.width;
            }
        },
        newAddImage(data){
            this.image    = new Image();
            if(typeof data == 'string' && data.indexOf('http') >= 0){
                this.image.setAttribute("crossOrigin",'Anonymous')
            }
            this.image.onload  = () => {
                this.imgData.src = data;

                this.imgSizeCompute();
                
                this.ctx    = this.$refs.screenshotCanvas.getContext("2d");
                this.imgCtx = this.$refs.imgLoadScreenshotCanvas.getContext("2d");
                
                this.imgPosition('center')
                this.moveDomDataFs()
                if(this.moveDomData.dragBoxSize){
                    this.moveDomData.left = this.imgData.left;
                    this.moveDomData.top  = this.imgData.top;
                }else{
                    this.moveDomData.left = (this.width - this.moveDomData.width) / 2;
                    this.moveDomData.top  = (this.height - this.moveDomData.height) / 2;
                }

                this.ctx.drawImage(
                    this.image,
                    this.imgData.left, 
                    this.imgData.top, 
                    this.imgData.width, 
                    this.imgData.height
                );

                this.imgCtx.drawImage(
                    this.image,
                    this.imgLoadCanvasData.left, 
                    this.imgLoadCanvasData.top, 
                    this.moveDomData.width, 
                    this.moveDomData.height
                );
                let timeoutid = setTimeout(() => {
                    this.newImgFill();
                    clearTimeout(timeoutid);
                }, 100);
            };
            this.image.src= data;
        },
        newFill(){            // 绘制函数

            this.ctx.clearRect(
                0, 
                0, 
                this.width,
                this.height
            );
            this.ctx.drawImage(
                this.image,
                this.imgData.left, 
                this.imgData.top, 
                this.imgData.width, 
                this.imgData.height,
            );

            this.newImgFill();

        },
        newImgFill(){            // 绘制函数
            this.imgLoadCanvasData.left = this.imgData.left - this.moveDomData.left;
            this.imgLoadCanvasData.top  = this.imgData.top  - this.moveDomData.top;

            this.imgCtx.clearRect(
                0, 
                0, 
                this.moveDomData.width, 
                this.moveDomData.height
            );
            this.imgCtx.drawImage(
                this.image,
                this.imgLoadCanvasData.left, 
                this.imgLoadCanvasData.top, 
                this.imgData.width, 
                this.imgData.height,
            );
            this.updataCanvasImg();

            if(this.control.uniform){
                
                this.imgMousemoveFs();
            }
        },
        imgPosition(type){    // 图片定位
            switch(type){
                case 'center':
                    this.imgData.top  = (this.height - this.imgData.height)/2;
                    this.imgData.left = (this.width - this.imgData.width)/2;
                    break;
            }
        },
        imgMousedownFs(e){    // 图片鼠标按下
            if(!this.imgData.src)return;
            this.moveData.preX = e.pageX;
            this.moveData.preY = e.pageY;
            document.addEventListener('mousemove', this.imgMousemoveFs);
            document.addEventListener('mouseup', this.imgMouseupFs);
        },
        imgMouseupFs(e){      // 图片鼠标弹起
            if(!this.imgData.src)return;
            this.moveData.preX = e.pageX;
            this.moveData.preY = e.pageY;
            document.removeEventListener('mousemove', this.imgMousemoveFs);
            document.removeEventListener('mouseup', this.imgMouseupFs);

        },
        imgMousemoveFs(e){    // 图片鼠标移动
            if(!this.imgData.src)return;
            if(e){
                this.imgData.left += (e.pageX - this.moveData.preX);
                this.imgData.top  += (e.pageY - this.moveData.preY);
                this.moveData.preX = e.pageX;
                this.moveData.preY = e.pageY;
                this.newFill();
            }else{
                let testPosition  ={
                    top  : (this.height - this.moveDomData.height) / 2,
                    left : (this.width - this.moveDomData.width) / 2,
                };

                let timeStep = 0,
                    heightwidth = {
                       imgDataLeft : ( ( testPosition.left + this.imgLoadCanvasData.left - this.imgData.left ) ) / 100,
                       imgDataTop  : ( ( testPosition.top  + this.imgLoadCanvasData.top - this.imgData.top ) ) / 100,
                       moveDomDataTop  : ( testPosition.top - this.moveDomData.top ) / 100,
                       moveDomDataLeft : ( testPosition.left - this.moveDomData.left ) / 100,
                    };
                
                let setTime = setInterval(() => {
                    timeStep++;
                    this.imgData.left += heightwidth.imgDataLeft;
                    this.imgData.top  += heightwidth.imgDataTop;
                    this.ctx.clearRect(
                        0, 
                        0, 
                        this.width,
                        this.height
                    );
                    this.ctx.drawImage(
                        this.image,
                        this.imgData.left, 
                        this.imgData.top, 
                        this.imgData.width, 
                        this.imgData.height,
                    );
                    this.moveDomData.top  += heightwidth.moveDomDataTop;
                    this.moveDomData.left += heightwidth.moveDomDataLeft;
                    this.moveDomDataFs();
                    if(timeStep > 100){
                        clearInterval(setTime);
                    }
                }, 3);

                // this.imgData.left = testPosition.left + this.imgLoadCanvasData.left;
                // this.imgData.top  = testPosition.top + this.imgLoadCanvasData.top;
                // this.moveDomData.top  = testPosition.top;
                // this.moveDomData.left = testPosition.left;
            }
        },
        moveDomMousedownFs(e, type){  // 截图鼠标按下
            this.moveDomData.type = type;
            this.moveDomData.preX = e.pageX;
            this.moveDomData.preY = e.pageY;
            document.addEventListener('mousemove', this.moveDomMousemoveFs);
            document.addEventListener('mouseup', this.moveDomMouseupFs);
        },
        moveDomMouseupFs(e, type){    // 截图鼠标弹起
            this.moveDomData.type = type;
            this.moveDomData.preX = e.pageX;
            this.moveDomData.preY = e.pageY;
            document.removeEventListener('mousemove', this.moveDomMousemoveFs);
            document.removeEventListener('mouseup', this.moveDomMouseupFs);
            this.newImgFill();
        },
        moveDomMousemoveFs(e){        // 截图鼠标移动
            switch(this.moveDomData.type){
                case 0:
                    this.moveDomData.left += (e.pageX - this.moveDomData.preX);
                    this.moveDomData.top  += (e.pageY - this.moveDomData.preY);
                    this.moveDomData.height -= (e.pageY - this.moveDomData.preY);
                    this.moveDomData.width  -= (e.pageX - this.moveDomData.preX);
                    break;
                case 1:
                    this.moveDomData.height += (e.pageY - this.moveDomData.preY);
                    this.moveDomData.width  += (e.pageX - this.moveDomData.preX);
                    break;
                case 2:
                    this.moveDomData.top    += (e.pageY - this.moveDomData.preY);
                    this.moveDomData.height -= (e.pageY - this.moveDomData.preY);
                    this.moveDomData.width  += (e.pageX - this.moveDomData.preX);
                    break;
                case 3:
                    this.moveDomData.left += (e.pageX - this.moveDomData.preX);
                    this.moveDomData.height += (e.pageY - this.moveDomData.preY);
                    this.moveDomData.width  -= (e.pageX - this.moveDomData.preX);
                    break;
                case 4:
                    this.moveDomData.top    += (e.pageY - this.moveDomData.preY);
                    this.moveDomData.height -= (e.pageY - this.moveDomData.preY);
                    break;
                case 5:
                    this.moveDomData.height += (e.pageY - this.moveDomData.preY);
                    break;
                case 6:
                    this.moveDomData.left += (e.pageX - this.moveDomData.preX);
                    this.moveDomData.width  -= (e.pageX - this.moveDomData.preX);
                    break;
                case 7:
                    this.moveDomData.width  += (e.pageX - this.moveDomData.preX);
                    break;
                case 8:
                    this.moveDomData.left += (e.pageX - this.moveDomData.preX);
                    this.moveDomData.top  += (e.pageY - this.moveDomData.preY);
                    break;
                case 9:
                    this.moveDomData.left -= 1;
                    this.moveDomData.top  -= 1;
                    this.moveDomData.height += 2;
                    this.moveDomData.width  += 2;
                    this.moveDomData.mousewheel = true;
                    break;
                case 10:
                    this.moveDomData.left += 1;
                    this.moveDomData.top  += 1;
                    this.moveDomData.height -= 2;
                    this.moveDomData.width  -= 2;
                    this.moveDomData.mousewheel = true;
                    break;
            }
            
            if(e){
                this.moveDomData.preX = e.pageX;
                this.moveDomData.preY = e.pageY;
            }
            this.moveDomDataFs();
        },
        moveDomDataFs(){ // 移动dom遮罩宽高计算
            let height = this.height - this.moveDomData.height - this.moveDomData.top;
            let width  = this.width - this.moveDomData.left - this.moveDomData.width; 
            this.moveDomData.bottomHeight = height > 0 ? height : 0;
            this.moveDomData.rightWidth   = width > 0 ? width : 0;
        },
        stopDocument(e){ // 防止事件冒泡
            this.stopRightKey(e)
            e.stopPropagation();
        },
        stopRightKey(e){ // 防止右键事件
            e.returnValue=false;  
            return false; 
        },
        updataCanvasImg(){  // 更新返回数据
            let imgDataProps =  this.$refs.imgLoadScreenshotCanvas.toDataURL("image/png");
            this.$emit('update', imgDataProps)
        },
        clearAllData(){ // 重置data数据/
            this.inputData = '';
            for(let key in this.imgData){
                this.imgData[key] = 0;
            }
            this.imgData.src = false;
            this.file = false;
            for(let key in this.moveDomData){
                this.moveDomData[key] = 0;
            }
            for(let key in this.moveData){
                this.moveData[key] = 0;
            }
            for(let key in this.maskDomData){
                this.maskDomData[key] = 0;
            }
            for(let key in this.imgLoadCanvasData){
                this.imgLoadCanvasData[key] = 0;
            }
        },
        sclaeFS(scaleNum){  // 放大缩小图片
            this.imgData.width  = this.imgData.width * scaleNum;
            this.imgData.height = this.imgData.height * scaleNum;
            this.imgPosition('center');
            this.newFill();
            this.newImgFill();
            this.moveDomData.mousewheel = true;
        },
        settingFs(data){    // 设置函数
            switch(data){
                case 'clears': //  清除画布
                    this.ctx.clearRect(
                        0, 
                        0, 
                        this.width,
                        this.height
                    );
                    this.imgCtx.clearRect(
                        0, 
                        0, 
                        this.moveDomData.width, 
                        this.moveDomData.height
                    );
                    this.clearAllData();
                    this.$emit('update', false);
                    break;
                case 'restore': // 居中贴合 
                    this.settingFs('clears');
                    this.newAddImage(this.image.src);
                    break;
                case 'blowup': // 居中贴合 
                    this.sclaeFS(1.05)
                    break;
                case 'narrow': // 居中贴合 
                    this.sclaeFS(0.95)
                    break;
            }
        },
        handleScroll (e) {
            let direction = e.deltaY>0?'down':'up'; // 该语句可以用来判断滚轮是向上滑动还是向下
            if(this.moveDomData.mousewheel && this.onMouseLive){
                this.moveDomData.mousewheel = false;
                
                if( this.moveDomData.mousewheelBox ){
                    if(direction == 'down'){
                        this.moveDomData.type = 9;
                        this.moveDomMousemoveFs();
                    }else if(direction == 'up'){
                        this.moveDomData.type = 10;
                        this.moveDomMousemoveFs();
                    }
                }
                if( this.moveDomData.mousewheelImg ){
                    if(direction == 'down'){
                        this.sclaeFS(1.003);
                    }else if(direction == 'up'){
                        this.sclaeFS(0.997);
                    }
                }
            }
        }
             
    }
}
</script>
<style lang="scss" scoped>
.screenshot{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    *{
        user-select: none !important;
    }
    .uploadIcon{
        width: 80px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 20;
        margin: auto;
        background: #409EFF;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: #d8dee9 0px 0px 5px 0px;
        transition: all 0.3s;
        &:hover{
            background: #66b1ff;
        }
        &:focus{
            background: #409EFF;
        }
    }
    .control{
        width: 30px;
        height: 30px;
        line-height: 20px;
        position: absolute;
        top: 5%;
        right: 5%;
        z-index: 120;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;
        .controlIcon{
            position: absolute;
            top: 2px;
            right: 2px;
            width: 24px;
            height: 24px;
            background-color: #fff;
            border-radius: 3px;
        }
        &:hover{
            height: 162px;
        }

        .controlBox{
            width: 30px;
            min-height: 45px;
            padding-top: 20px;
            position: relative;
            &:before{
                content: '';
                position: absolute;
                top: 30px;
                left: 10px;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 10px solid #000;
            }

            .controlBoxList{
                margin-top: 20px; 
                width: 24px;
                min-height: 24px;
                padding: 2px;
                border: 1px solid #000;
                border-radius: 3px;

                .list{
                    width: 24px;
                    height: 24px;
                    background-color: #fff;
                    border-radius: 3px;
                    &:hover{
                        background-color: #ddd;
                    }
                }
            }
        }
    }
    .moveDom{
        position: absolute;
        z-index: 100;
        &:hover{
            cursor: pointer
        }
    }
    .lineImg{
        position: absolute;
        z-index: 90;
        background: rgba(238, 238, 248, 0.3);

    }
    .borderColor{
        &:before{
            position: absolute;
            display: block;
            content: '';
            border: 1px solid #fff;
            height: 100%;
            width: 100%;
            margin: -1px;
            box-sizing: content-box;
            pointer-events: none;
        }
        &:after{
            position: absolute;
            display: block;
            content: '';
            border : 1px dashed #409EFF;
            height: 100%;
            width: 100%;
            margin: -1px;
            box-sizing: content-box;
            pointer-events: none;
        }
    } 
    .moveDomBox{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 25;
        overflow: hidden;
        >.maskDom{
            position: absolute;
            background: rgba(238, 238, 248, 0.3)

        }
    }
    #screenshotCanvas{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 10;
    }
    #imgLoadScreenshotCanvas{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 0;
        opacity: 0;
    }
    .cirque{
        position: absolute;
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px  #409EFF;
        margin: auto;
        transform: scale(1);
        transition: all 0.3s;

        &:hover{
            transform: scale(1.3);
            box-shadow: 0 0 0 1px  #fff;
            background: #409EFF;
        }
    }
}
</style>