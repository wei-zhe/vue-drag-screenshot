<template>
    <div class="screenshot" @contextmenu="stopRightKey($event)">
        <input 
            id="imageScreenshotPic" 
            type="file" 
            name="files[]" 
            accept='image/jpeg, image/jpg, image/png' 
            v-on:change="uploadImage($event)"
            style="display: none;"
        />
        <label for="imageScreenshotPic" v-if="!imgData.src">
            <div class="uploadIcon" v-if="!imgData.src">
            上传图片
            </div>
        </label>
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
        <div class="canvasMask">
        </div>
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
            class="lineImg"
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
                'border' : '1px solid #409EFF',
                'background' : 'rgba(238, 238, 248, 0)', 
                'z-index': 110,
            }"
        >
            <span class="cirque"
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
let timer = null;
export default {
    name: 'vue-screenshot',
    props: {
        width: { // 密码位数
            type: Number,
            default: 500
        }, 
        height: { // 密码位数
            type: Number,
            default: 500
        }, 
        parentValue : {},
        value : {},
    },
    model: {
      prop: 'value',//绑定的值，通过父组件传递
      event: 'update'//自定义时间名
    },
    data() {
        return {
            imgData : {
                src    : false,
                top    : 0,
                left   : 0,
                scale  : 1,
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
                rightWidth   : 0,
                bottomHeight : 0,
            },
            imgLoadCanvasData : {
                top  : 0,
                left : 0,
            },
        }
    },
    watch : {
        'value': function(val, oldval) {
        },
        'imgData.top': function(val, oldval) {
        },
        'imgData.left': function(val, oldval) {
        },
        'imgData.height': function(val, oldval) {
            this.moveDomData.height = this.imgData.height;
            this.moveDomDataFs();
        },
        'imgData.width': function(val, oldval) {
            this.moveDomData.width = this.imgData.width;
            this.moveDomDataFs();
        },
    },
    computed: {
        
    },
    mounted () {
    },
    methods: {
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
                _this.image    = new Image();
                _this.image.onload  = () => {
                    _this.imgData.src = this.result;

                    _this.imgSizeCompute();

                    _this.ctx    = _this.$refs.screenshotCanvas.getContext("2d");
                    _this.imgCtx = _this.$refs.imgLoadScreenshotCanvas.getContext("2d");
                    
                    _this.imgPosition('center')
                    _this.moveDomDataFs()

                    _this.ctx.drawImage(
                        _this.image,
                        _this.imgData.left, 
                        _this.imgData.top, 
                        _this.imgData.width, 
                        _this.imgData.height
                    );

                    _this.imgCtx.drawImage(
                        _this.image,
                        _this.imgLoadCanvasData.left, 
                        _this.imgLoadCanvasData.top, 
                        _this.moveDomData.width, 
                        _this.moveDomData.height
                    );
                    let timeoutid = setTimeout(() => {
                        _this.newImgFill();
                        clearTimeout(timeoutid);
                    }, 100);
                };
                _this.image.src= this.result;
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
        },
        imgPosition(type){    // 图片定位
            switch(type){
                case 'center':
                    this.imgData.top  = (this.height - this.imgData.height)/2;
                    this.imgData.left = (this.width - this.imgData.width)/2;
                    this.moveDomData.left += this.imgData.left;
                    this.moveDomData.top  += this.imgData.top;
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
            this.imgData.left += (e.pageX - this.moveData.preX);
            this.imgData.top  += (e.pageY - this.moveData.preY);
            this.moveData.preX = e.pageX;
            this.moveData.preY = e.pageY;
            this.newFill();
        },
        moveDomMousedownFs(e, type){  // 图片鼠标按下
            this.moveDomData.type = type;
            this.moveDomData.preX = e.pageX;
            this.moveDomData.preY = e.pageY;
            document.addEventListener('mousemove', this.moveDomMousemoveFs);
            document.addEventListener('mouseup', this.moveDomMouseupFs);
        },
        moveDomMouseupFs(e, type){    // 图片鼠标弹起
            this.moveDomData.type = type;
            this.moveDomData.preX = e.pageX;
            this.moveDomData.preY = e.pageY;
            document.removeEventListener('mousemove', this.moveDomMousemoveFs);
            document.removeEventListener('mouseup', this.moveDomMouseupFs);
            this.newImgFill();
        },
        moveDomMousemoveFs(e){        // 图片鼠标移动
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
            }
            
            this.moveDomData.preX = e.pageX;
            this.moveDomData.preY = e.pageY;
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
        updataCanvasImg(){
            let imgDataProps =  this.$refs.imgLoadScreenshotCanvas.toDataURL("image/png");
            this.$emit('update', imgDataProps)
        },
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
        background: rgba(238, 238, 248, 0.3) 
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
    .canvasMask{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background: #fff;
        z-index: 5;
    }
    #imgLoadScreenshotCanvas{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 0;
    }
    .cirque{
        position: absolute;
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px  #409EFF;
        margin: auto;
        transition: all 0.3s;

        &:hover{
            box-shadow: 0 0 0 1px  #fff;
            background: #409EFF;
        }
    }
}
</style>