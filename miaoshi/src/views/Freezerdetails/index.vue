<template>
  <div class="freezerdetails">
    <div class="content">
      <div class="top">
        <span class="title">场景名称（5505032）</span>
        <span class="pre">下一个</span>
        <span class="pre">上一个</span>
        <div class="tip">
          123422／105／2017-11-18／1222222售点名称
        </div>
      </div>
      <div class="center">
        <div class="left">
          <div class="titl">场景数据</div>
          <div class="cycly">
            <svg>
              <circle cx="52" cy="52" r="50" fill="none" stroke="#50B7EB" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo1"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              21.7%
            </div>
            <div class="describe">
              纯净度
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#54D17D" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo2"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              21.7%
            </div>
            <div class="describe">
              饱和度
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#E7414C" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo3"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              21.7%
            </div>
            <div class="describe">
              空缺率
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo4"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              99.0%
            </div>
            <div class="describe">
              空缺数
            </div>
          </div>
        </div>
        <div class="right">
          <div class="titl">所属售点</div>
          <div class="box">
            <div class="ttdetail">
              <span>快客徐汇店 000222888</span><span class="detail">详情></span>
            </div>
            <p><span>售点sku数：23；</span><span>必备sku数：15/16；</span><span>重点sku数：9/12</span></p>
          </div>
        </div>
      </div>
      <div class="picture">
        <div class="title">
          <span>识别产品（共27，top8，重点1）</span>
          <div class="img">
            <img :src="iconFlag?iconUrlA:iconUrl" @click="changeImg" alt="">
          </div>
          <span>显示全部</span>
        </div>
        <div class="tree">
          <div class="left">
            <div class="treeLi" v-for="(v,index) in dataList">
              <div class="li" @click="liClick(v)">
                <img :src="iconFoldURl"  :class="v.childShow?'imgTranform':''" alt=""><span>{{v.title}}</span>
              </div>
              <div v-if="v.childShow"  v-for="(vC,indexC) in v.childrenList">
                <div @click="childClick(vC)" :class="[vC.colorChange?'bgBlue':'','li mgLeft10']" >
                  <img :src="iconFoldURl"  :class="vC.childrenShow?'imgTranform':''" alt="">
                  <span>{{vC.children1}}</span>
                </div>
                <div :class="[vC.colorChange?'bgBlue':'','li mgLeft20']" @click="getGoods(vCC)" v-for="(vCC,indexCC) in vC.childrenHave"  v-if="vC.childrenShow">
                  <span>{{vCC.title}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <img class="img1"  @click="scaleImg(0)" :src="iconNarrowUrl" alt="">
            <img class="img2"  @click="scaleImg(1)" :src="iconEnlargeUrl" alt="">
            <div  class="imgMain">
              <canvas id="bgCanvas"></canvas>
              <canvas id="imgCanvas">您的浏览器不支持canvas标签，请您更换浏览器！！  </canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">原图（6）</div>
        <div class="img" v-for="v in imgList">
          <img :src="vueUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hookiconA from '@/assets/ic_selected@1x.png'
import hookicon from '@/assets/ic_not selected@1x.png'
import iconFold from '@/assets/ic_fold@1x.png'
import iconEnlarge from '@/assets/ic_bigger_normal@1x.png'
import iconNarrow from '@/assets/ic_smaller_normal@1x.png'
import iconVue from '@/assets/vue.png'
import viewIcon from '@/assets/view.jpeg'

export default {
  name: 'Freezerdetails',
  data () {
    return {
      showAllMark: true,
      scale: 100,
      bboxes: [],
      viewUrl:viewIcon,
      imgList:[{},{},{},{},{}],
      iconUrlA:hookiconA,
      iconUrl:hookicon,
      iconFlag:false,
      iconFoldURl:iconFold,
      iconEnlargeUrl:iconEnlarge,
      iconNarrowUrl:iconNarrow,
      vueUrl:iconVue,
      dataList:[{
        title:'美汁源',
        childShow:false,
        childrenList:[{
          colorChange:false,
          children1:'果粒奶优300ml',
          childrenShow:false,
          childrenHave:[{title:'热带水果300ml'},{title:'热带水果500ml'}]
        },{
          colorChange:false,
          children1:'果粒奶优300ml',
          childrenShow:false,
          childrenHave:[{title:'热带水果300ml'},{title:'热带水果500ml'}]
        }]
      }]
    }
  },
  mounted(){
    this.circleSet(21.7, document.querySelector("#J_demo1"))
    this.circleSet(21.7, document.querySelector("#J_demo2"))
    this.circleSet(21.7, document.querySelector("#J_demo3"))
    this.circleSet(99, document.querySelector("#J_demo4"))
    this.initCanvas()
  },
  methods:{
    scaleImg: function (state) {
      if (state) {
          if (this.scale >= 200) {
              return;
          }
          this.scale += 10;
          this.initCanvas();
      } else {
          if (this.scale <= 50) {
              return;
          }
          this.scale -= 10;
          this.initCanvas();
      }
    },
    initCanvas(){
      var that = this;
      var canvas = document.getElementById("bgCanvas");
      var canvas1 = document.getElementById("imgCanvas");
      var context = canvas.getContext("2d");
      var image = new Image();
      image.src = this.viewUrl;
      image.onload = function () {
          canvas.width = image.width * that.scale / 100;
          canvas.height = image.height * that.scale / 100;
          canvas1.width = canvas.width;
          canvas1.height = canvas.height;
          context.fillStyle = "black";
          context.fillRect(0, 0, canvas.width, canvas.height);
          var x = canvas.width / 2; //画布宽度的一半
          var y = canvas.height / 2;//画布高度的一半
          context.translate(x, y);//将绘图原点移到画布中点
          context.rotate((Math.PI / 180) * (-that.rotated_degree));//旋转角度
          context.drawImage(image, -x, -y, canvas.width, canvas.height);
          context.restore();//绘制图片
      };
      setTimeout(function () {
          if(!that.showAllMark){
              that.showAllMark = true;
          }
          that.showAll();
      }, 100);
    },
    showAll: function () {
        this.bboxes = [{x1:200,y1:200,x2:300,y2:300,truncated:false,color:'red'}]
        if (!(this.bboxes.length)) {
            return;
        }
        var that = this;
        var canvas = document.getElementById("imgCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(function () {
            for (var i = 0; i < that.bboxes.length; i++) {
                that.draw_annotation(that.bboxes[i].x1, that.bboxes[i].y1, that.bboxes[i].x2, that.bboxes[i].y2, that.bboxes[i].truncated,that.bboxes[i].color);
            }
        }, 200);
    },
    draw_annotation: function (x1, y1, x2, y2, truncated,color) {
        var that = this;
        var canvas = document.getElementById("imgCanvas");
        var context = canvas.getContext("2d");
        context.beginPath();
        if (truncated) {
            context.setLineDash([4, 4]);
        }else{
            context.setLineDash([0,0]);
        }
        context.strokeStyle = color;
        context.strokeRect(x1 * that.scale / 100, y1 * that.scale / 100, (x2 - x1) * that.scale / 100, (y2 - y1) * that.scale / 100);
        context.closePath();
    },
    getGoods(v){
      console.log(v)
    },
    colorChangeList(){
      for(var i=0;i<this.dataList.length;i++){
        for(var j=0;j<this.dataList[i].childrenList.length;j++){
          this.dataList[i].childrenList[j].colorChange = false
          this.dataList[i].childrenList[j].childrenShow = false
        }
      }
    },
    childClick(v){
      this.colorChangeList()
      v.colorChange = true
      v.childrenShow = true
      this.iconFlag = false
    },
    liClick(v){
      v.childShow = !v.childShow
      this.iconFlag = false
    },
    changeImg(){
      if(!this.iconFlag){
        this.colorChangeList()
      }
      this.iconFlag = !this.iconFlag
    },
    circleSet(num,dom){
      var circleLength = Math.floor(2 * Math.PI * dom.getAttribute("r"));
      dom.setAttribute("stroke-dasharray","" + circleLength*num/ 100 + ",10000");
      dom.style.transform = 'rotate(-'+90+'deg)'
    }
  }
}
</script>

<style lang="scss">
  .freezerdetails{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .bgBlue{
      background:#D0E4F2;
    }
    .content{
      padding:30px 30px 0 30px;
      .top{
        margin-bottom: 40px;
        .title{
          font-size: 20px;
          color: #000000;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .pre{
          background: #F5F5F5;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          display: inline-block;
          width:60px;
          height:24px;
          font-size: 14px;
          color: #333333;
          text-align: center;
          line-height: 24px;
          float: right;
          margin-left: 8px;
        }
        .tip{
          margin-top: 8px;
          font-size: 14px;
          color: #333333;
        }
      }
      .center{
        overflow: hidden;
        .left{
          overflow: hidden;
          float: left;
          .cycly{
            position: relative;
            height:108px;
            width:108px;
            float:left;
            margin-right:32px;
            .percentage{
              position:absolute;
              top:24px;
              left:20px;
              font-family:'Avenir-Black';
              font-size: 24px;
              color: #333333;
            }
            .describe{
              position:absolute;
              top:57px;
              left:28px;
              font-size: 14px;
              color: #333333;
            }
            .demo2{
              transform-origin: center;
              transition: stroke-dasharray .3s ease-in;
            }
          }
          .titl{
            font-family:'PingFangSC-Medium';
            font-size:16px;
            color:#000000;
            margin-bottom: 16px;
            font-weight: bold;
          }
        }
        .right{
          float: right;
          .titl{
            font-family:'PingFangSC-Medium';
            font-size:16px;
            color:#000000;
            margin-bottom: 16px;
            font-weight: bold;
          }
          .box{
            width:400px;
            height:40px;
            border: 2px solid #F5F5F5;
            border-radius: 4px;
            padding:30px 20px 30px 20px;
            .ttdetail{
              span:nth-of-type(1){
                font-size: 14px;
                color: #000000;
                font-weight: bold;
              }
              .detail{
                float: right;
                font-size: 14px;
                color: #2D78B3;
              }
            }
          }
        }
      }
      .picture{
        margin-top:40px;
        .title{
          overflow: hidden;
          span:nth-of-type(1){
            font-family: 'PingFangSC-Medium';
            font-size: 16px;
            color: #000000;
            float: left;
            font-weight: bold;
          }
          .img{
            margin-left:44px;
            cursor: pointer;
            float: left;
          }
          span:nth-of-type(2){
            font-family: 'Microsoft YaHei';
            font-size: 14px;
            color: #333333;
            float: left;
            margin-top:4px;
          }
        }
        .tree{
          overflow: hidden;
          .left::-webkit-scrollbar{
            width: 4px;
            height:4px;
            background-color: #fff;
          }
          .left::-webkit-scrollbar-thumb{
            background:#ccc;
            border-radius: 3px;
          }
          .left{
            float: left;
            overflow: scroll;
            width:360px;
            height:480px;
            border: 2px solid #F5F5F5;
            border-radius: 4px;
            background:#F5F5F5;
            .treeLi{
              background:#fff;
              .mgLeft10{
                padding-left:15px;
              }
              .mgLeft20{
                padding-left:57px;
              }
            }
            img{
              vertical-align: middle;
            }
            .li{
              cursor:pointer;
              line-height:25px;
              border-bottom: 1px solid #F5F5F5;
              .imgTranform{
                transform:rotate(90deg);
              }
            }
            .el-tree-node__content{
              border-bottom:1px solid #F5F5F5;
            }
            .el-tree{
              border:none;
            }
            .el-tree-node__expand-icon{
              border-left-color: #000;
            }
            .is-leaf{
              border-left-color: #fff;
              border:none;
            }
          }
          .right{
            float: right;
            width:718px;
            height:484px;
            background: #F5F5F5;
            border-radius: 4px;
            position:relative;
            .img1{
              cursor:pointer;
              position:absolute;
              right:48px;
              top:10px;
              z-index: 55;
            }
            .img2{
              cursor:pointer;
              position:absolute;
              right:10px;
              z-index: 55;
              top:10px;
            }
            .imgMain::-webkit-scrollbar{
              width: 4px;
              height:4px;
              background-color: #fff;
            }
            .imgMain::-webkit-scrollbar-thumb{
              background:#ccc;
              border-radius: 3px;
            }
            .imgMain{
              height:100%;
              margin:0 auto;
              vertical-align: middle;
              position:relative;
              overflow: scroll;
              #bgCanvas,#imgCanvas{
                position:absolute;
                top:0;
                left:50%;
                transform: translateX(-50%);
              }
              #bgCanvas{
                z-index:3;
              }
              #imgCanvas{
                z-index:5;
              }
            }
          }
        }
      }
      .bottom{
        margin:40px 0  16px 0;
        .title{
          font-family: 'PingFangSC-Medium';
          font-size: 16px;
          color: #000000;
          font-weight: bold;
          margin-bottom:16px;
        }
        .img{
          overflow: hidden;
          float: left;
          margin-right: 8px;
          img{
            width:76px;
            height:76px;
            float:left;
          }
        }
      }
    }
  }
</style>
