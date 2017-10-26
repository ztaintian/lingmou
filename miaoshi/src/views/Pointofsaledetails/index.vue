<template>
  <div class="pointofsaledetails">
    <div class="content">
      <div class="top">
        <span class="title">快客便利店徐汇店（5505032）</span>
        <span class="pre">下一个</span>
        <span class="pre">上一个</span>
        <div class="tip">
          123422／105／2017-11-18
        </div>
      </div>
      <div class="center">
        <div class="left">
          <div class="titl">场景数据</div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
          <div class="cycly">
            <div class="percentage">
              65.9%
            </div>
            <div class="describe">
              冰柜纯净度
            </div>
            <img class="Unqualified" :src="iconUnqualifiedUrl" alt="">
          </div>
        </div>
      </div>
      <div class="sku">
        <div class="left">
          <div class="title">
            缺失必备 SKU
          </div>
          <div class="p">
            <span>缺失</span><span>可口可乐罐装300ml</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
          </div>
        </div>
        <div class="left right">
          <div class="title">
            缺失重点 SKU
          </div>
          <div class="p">
            <span>缺失</span><span>可口可乐罐装300ml</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
          </div>
        </div>
      </div>
      <div class="picture">
        <div class="sence">
          场景（5）
        </div>
        <div class="nav">
          <div v-for="v in navList" style="width:160px;height:40px;display:inline-block;">
            <span @mouseover = "over(v)" @mouseleave = "leave(v)" @click="navClick(v)" :class="[v.navFlag?'navover':'',v.clickFlag?'navclick':'']">选中</span>
          </div>
        </div>
        <div class="title">
          <span>识别产品（共27，top8，重点1）</span>
          <div class="img">
            <img :src="iconFlag?iconUrlA:iconUrl" @click="changeImg" alt="">
          </div>
          <span>显示全部</span>
          <span class="">识别图片</span>
        </div>
        <div class="tree">
          <div class="left">
            <div class="treeLi" v-for="(v,index) in dataList">
              <div class="li" @click="liClick(v)">
                <img :src="iconFoldURl"  :class="v.childShow?'imgTranform':''" alt=""><span>{{v.title}}</span>
              </div>
              <div v-if="v.childShow"  v-for="(vC,indexC) in v.childrenList">
                <div @click="childClick(vC)" :class="[vC.colorChange?'bgBlue':'','li mgLeft10']"  >
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
            <img class="img1" :src="iconNarrowUrl"  @click="scaleImg(0)" alt="">
            <img class="img2" :src="iconEnlargeUrl" @click="scaleImg(1)" alt="">
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
          <img @click="img(v)"  style="cursor:pointer;" :src="vueUrl" alt="">
        </div>
      </div>
    </div>
    <div class="messagebox" v-if="editBoxShow">
      <div class="messagecont">
         <img  style="height:500px;width:200px;" :src="vueUrl" alt="">
        <div style="cursor:pointer;margin-left:94px;font-size:20px;color:#000;" @click="cancle">
          X
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
import iconUnqualified from '@/assets/ic_unqualified@2x.png'
import viewIcon from '@/assets/view.jpeg'

export default {
  name: 'Pointofsaledetails',
  data () {
    return {
      showAllMark: true,
      scale: 100,
      bboxes: [],
      navList:[{navFlag:false,clickFlag:true},{navFlag:false,clickFlag:false},{navFlag:false,clickFlag:false},{navFlag:false,clickFlag:false},{navFlag:false,clickFlag:false},{navFlag:false,clickFlag:false}],
      navFlag:false,
      editBoxShow:false,
      imgList:[{},{},{},{},{}],
      iconUrlA:hookiconA,
      iconUrl:hookicon,
      iconUnqualifiedUrl:iconUnqualified,
      iconFlag:false,
      iconFoldURl:iconFold,
      iconEnlargeUrl:iconEnlarge,
      iconNarrowUrl:iconNarrow,
      vueUrl:iconVue,
      viewUrl:viewIcon,
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
    navClick(v){
      for(var i=0;i<this.navList.length;i++){
        this.navList[i].clickFlag = false
      }
      v.clickFlag = true
    },
    over(v){
      v.navFlag=true
    },
    leave(v){
      v.navFlag=false
    },
    img(v){
      this.editBoxShow = true
       document.body.style.overflow='hidden';
       document.body.style.height='100%';
    },
    cancle(){
      this.editBoxShow = false
       document.body.style.overflow='scroll';
       document.body.style.height='100%';
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
      this.colorChangeList()
      this.iconFlag = !this.iconFlag
    }
  }
}
</script>

<style lang="scss">
  .pointofsaledetails{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .bgBlue{
      background:#D0E4F2;
    }
    .messagebox{
      position: absolute;
      top:0;
      left:0;
      height:100%;
      z-index: 9999;
      background: rgba(0,0,0,0.40);
      width:100%;
      .messagecont{
        position:absolute;
        top:50%;
        left:50%;
        margin-left:-100px;
        .bntlast{
          background:#324656;
          cursor:pointer;
        }
        height:254px;
        width:520px;
      }
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
          float: left;
          .cycly{
            position: relative;
            height:90px;
            width:120px;
            float:left;
            margin-right:6px;
            background: #F5F5F5;
            border-radius: 4px;
            vertical-align: middle;
            text-align: center;
            .Unqualified{
              position:absolute;
              z-index: 999;
              width:50px;
              heiight:50px;
              right:-30px;
              top:-10px;
            }
            .percentage{
              font-family:'Avenir-Black';
              font-size: 24px;
              color: #50B7EB;
              margin-top:15px;
            }
            .describe{
              margin-top:6px;
              font-size: 14px;
              color: #000000;
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
      .sku{
        overflow: hidden;
        margin-top:40px;
        .left{
          float:left;
          .p{
            margin-bottom:8px;
            span:nth-of-type(1){
              font-size: 14px;
              color: #D61E2A;
              margin-right:20px;
            }
            span:nth-of-type(2){
              font-size: 14px;
              color: #333333;
            }
          }
          .title{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #000000;
            font-weight:bold;
            margin-bottom:16px;
          }
        }
        .right{
          margin-left:170px;
        }
      }
      .picture{
        margin-top:40px;
        .nav{
          margin:16px 0  30px 0;
          background: #F5F5F5;
          border-radius: 4px;
          line-height:40px;
          height: 40px;
          div{
            text-align: center;
            cursor:pointer;
          }
          .navover{
            background: #FAFAFA;
            border: 2px solid #F5F5F5;
            border-radius: 4px;
          }
          .navclick{
             background: #fff;
             color:#000;
             font-weight:bold;
          }
          span{
            display:inline-block;
            height:36px;
            width:156px;
            line-height:36px;
            text-align: center;
          }
        }
        .sence{
          font-size: 16px;
          color: #000000;
          font-weight:bold;
        }
        .title{
          overflow: hidden;
          margin-left:30px;
          span:nth-of-type(1){
            font-family: 'PingFangSC-Medium';
            font-size: 14px;
            color: #000000;
            float: left;
            font-weight: bold;
          }
          span:nth-of-type(3){
            font-family: 'PingFangSC-Medium';
            font-size: 16px;
            color: #000000;
            float: right;
            font-weight: bold;
            margin-right: 608px;
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
            height:5px;
            background-color: #fff;
          }
          .left::-webkit-scrollbar-thumb{
            background:#ccc;
            border-radius: 3px;
          }
          .left{
            float: left;
            margin-left:30px;
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
            width:670px;
            height:484px;
            background: #F5F5F5;
            border-radius: 4px;
            position:relative;
            .img1{
              cursor:pointer;
              position:absolute;
              right:48px;
              top:10px;
              z-index: 99;
            }
            .img2{
              cursor:pointer;
              position:absolute;
              right:10px;
              top:10px;
              z-index: 99;
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
