<template>
  <div class="freezerdetails" ref="rootRefs">
    <div class="load" v-if="loadFlag">
      <img src="../assets/loading@3x.png" alt="">
    </div>
    <div class="content">
      <div class="title">
        0120340-快客便利店
      </div>
      <div class="address">
        <img src="../assets/ic_location@3x.png" alt="">
        <span>上海市徐汇区肇嘉浜路789号</span>
      </div>
      <div class="time">
        2017-08-29  13:25
      </div>
    </div>
    <div class="interval"></div>
    <div class="display-analysis">
      <div class="title">
        陈列分析
      </div>
      <div class="allDetail">
        <div class="detail">
          <span class="span1">纯净度:</span>
          <span class="span2">65.9%</span>
          <img :src="ic_upUrl" alt="">
          <span class="span3">+10.56%</span>
        </div>
        <div class="lineAll">
          <div class="lineBottom"></div>
          <div class="line"></div>
        </div>
      </div>
      <div class="allDetail">
        <div class="detail">
          <span class="span1">利用率:</span>
          <span class="span2">65.9%</span>
          <img src="../assets/ic_up@3x.png" alt="">
          <span class="span3">+10.56%</span>
        </div>
        <div class="lineAll">
          <div class="lineBottom"></div>
          <div class="line bgColorBlur"></div>
        </div>
      </div>
      <div class="allDetail">
        <div class="detail">
          <span class="span1">空缺率:</span>
          <span class="span2">65.9%</span>
          <span class="span4">空缺数:</span><span class="span5">99</span>
          <img :src="ic_upUrl" alt="">
          <span class="span3">+10.56%</span>
        </div>
        <div class="lineAll">
          <div class="lineBottom"></div>
          <div class="line bgColorRed"></div>
        </div>
      </div>
    </div>
    <div class="Skunum">
      <div class="title">
        SKU数量
      </div>
    </div>
    <div class="tree">
      <div class="treeLi" v-for="(v,index) in dataList">
        <div class="li" @click="liClick(v)">
          <img src="../assets/ic_unfold@3x.png"  :class="[v.childShow?'imgTranform':'','imgList']" alt=""><span>{{v.title}}</span>
        </div>
        <div v-if="v.childShow"  v-for="(vC,indexC) in v.childrenList">
          <div @click="childClick(vC)" :class="[vC.colorChange?'bgBlue':'','li mgLeft10']" >
            <img src="../assets/ic_unfold@3x.png"  :class="[vC.childrenShow?'imgTranform':'','imgList']" alt="">
            <span>{{vC.children1}}</span>
          </div>
          <div :class="[vC.colorChange?'bgBlue':'','li mgLeft20']" @click="getGoods(vCC)" v-for="(vCC,indexCC) in vC.childrenHave"  v-if="vC.childrenShow">
            <span>{{vCC.title}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="Skunum">
      <div class="title floatLeft">
        识别图片
      </div>
      <div class="floatRight">
        <img :src="iconFlag?ic_upChoutUrl:ic_upChoutAUrl" @click="changeImg" alt=""><span>显示所有</span>
      </div>
    </div>
    <div  class="imgMain">
      <canvas id="bgCanvas"></canvas>
      <canvas id="imgCanvas">您的浏览器不支持canvas标签，请您更换浏览器！！  </canvas>
    </div>
    <div class="Skunum marginTop">
      <div class="title">
        原图(6张)
      </div>
    </div>
    <div class="imgStyle">
      <div class="imgBottom" v-for="v in imgListB">
        <img src="../assets/ic_scene_hotsale@3x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import ic_up from '@/assets/ic_up@3x.png'
import ic_upChout from '@/assets/checkbox normal@3x.png'
import ic_upChoutA from '@/assets/checkbox selected@3x.png'
import viewIcon from '@/assets/view.jpeg'
export default {
  name: 'Freezerdetails',
  data () {
    return {
      imgListB:[{},{},{},{},{},{}],
      scale:100,
      viewUrl:viewIcon,
      iconFlag:true,
      ic_upChoutUrl:ic_upChout,
      ic_upChoutAUrl:ic_upChoutA,
      ic_upUrl:ic_up,
      loadFlag:true,
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
      },{
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
    setTimeout(()=>{
      this.loadFlag = false
      this.$refs.rootRefs.style.overflow = 'scroll'
    },200)
  },
  methods:{
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
      console.log(v)
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
  height:100%;
  width:100%;
  overflow: hidden;
  position:relative;
  .bgBlue{
    background:#fff;
  }
  .load{
    z-index: 5;
    position:relative;
    height:100%;
    width:100%;
    background: #fff;
    @keyframes rotateImg {
      0% {transform : rotate(0deg);}
      100% {transform : rotate(360deg);}
    }
    img{
      top:50%;
      left:50%;
      margin-left: -5vw;
      margin-top: -5vw;
      position: absolute;
      width:10vw;
      height:10vw;
      animation:rotateImg 1s linear infinite;
    }
  }
  .content{
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.12);
    background:#fff;
    overflow: hidden;
    padding:4.4vw 0 0 4.4vw;
    .title{
      margin-bottom: 2.2vw;
      font-family: 'Roboto-Medium';
      font-size: 18px;
      line-height: 27px;
      font-weight: bold;
    }
    .address{
      font-family: 'NotoSansCJKsc-Regular';
      font-size: 14px;
      color: rgba(0,0,0,0.54);
      margin-bottom: 2.2vw;
      img{
        width:5.6vw;
        vertical-align: middle;
        height:5.6vw;
      }
    }
    .time{
      font-family: 'Roboto-Regular';
      font-size: 14px;
      color: rgba(0,0,0,0.54);
      margin-bottom:4.4vw;
    }
  }
  .interval{
    height:2.2vw;
    background: #F5F5F5;
  }
  .display-analysis{
    padding: 4.4vw 0 0 4.4vw;
    .title{
      font-family: 'NotoSansCJKsc-Regular';
      font-size: 24px;
      color: rgba(0,0,0,0.87);
      font-weight:bold;
      margin-bottom:6.7vw;
    }
    .allDetail{
      overflow: hidden;
      margin-bottom:6.6vw;
      .detail{
        overflow: hidden;
        .span1{
          font-family: 'NotoSansCJKsc-Regular';
          font-size: 14px;
          color: #333333;
          font-weight:bold;
        }
        .span2{
          font-family: 'Roboto-Bold';
          font-size: 24px;
          color: #333333;
          font-weight:bold;
          vertical-align: sub;
        }
        .span3{
          float: right;
          font-family: 'Roboto-Regular';
          font-size: 14px;
          color: #333333;
          font-weight:bold;
          margin-right: 1.6vw;
          height: 7.7vw;
          line-height: 8.7vw;
        }
        .span4{
          font-family:' NotoSansCJKsc-Regular';
          font-size: 14px;
          color: #333333;
          font-weight:bold;
          margin-left:2vw;
        }
        .span5{
          font-family: 'Roboto-Bold';
          vertical-align: sub;
          font-weight:bold;
          font-size: 24px;
          color: #333333;
        }
        img{
          width:4.4vw;
          height:4.4vw;
          float: right;
          margin-right: 4.4vw;
          margin-top: 1.9vw;
        }
        margin-bottom:2.2vw;
      }
      .lineAll{
        position:relative;
        height:2.2vw;
        .lineBottom{
          position:absolute;
          top:0;
          left:0;
          height:2.2vw;
          width:91.1vw;
          background:#EEEEEE;
        }
        .line{
          position:absolute;
          top:0;
          left:0;
          height:2.2vw;
          width:60vw;
          background:#50B7EB;
        }
        .bgColorBlur{
          background:#54D17D;
        }
        .bgColorRed{
          background:#D61E2A;
        }
      }
    }
  }
  .Skunum{
    overflow: hidden;
    padding:11.1vw 4.4vw 0  4.4vw;
    .title{
      font-family: 'NotoSansCJKsc-Regular';
      font-size: 24px;
      color: rgba(0,0,0,0.87);
      font-weight:bold;
      margin-bottom:4.4vw;
    }
    .floatLeft{
      float:left;
    }
    .floatRight{
      float:right;
      img{
        width:6.7vw;
        height:6.7vw;
        vertical-align: middle;
      }
      span{
        margin-left:1.1vw;
        font-family: 'NotoSansCJKsc-Regular';
        font-size: 16px;
        color: rgba(0,0,0,0.54);
      }
    }
  }
  .marginTop{
    margin-top:2.2vw;
    overflow: hidden;
  }
  .imgStyle{
    overflow: hidden;
    margin-left:2.2vw;
    .imgBottom{
      float: left;
      margin-left:2.2vw;
      img{
        width:21.1vw;
        height:21.1vw;
      }
    }
  }
  .tree{
    overflow: hidden;
    width:95.6vw;
    margin:0 auto;
    margin-bottom:2.2vw;
    border: 2px solid #F5F5F5;
    border-radius: 4px;
    background:#F5F5F5;
    .treeLi{
      font-family:'NotoSansCJKsc-Medium';
      font-size: 16px;
      font-weight:bold;
      color: rgba(0,0,0,0.87);
      .mgLeft10{
        padding-left:10vw;
      }
      .mgLeft20{
        padding-left:16.6vw;
        font-size:14px;
      }
    }
    img{
      vertical-align: middle;
    }
    .li{
      cursor:pointer;
      height:11.1vw;
      line-height:11.1vw;
      font-family: 'NotoSansCJKsc-Regular';
      font-size: 16px;
      color: rgba(0,0,0,0.87);
      border-bottom: 1px solid #F5F5F5;
      .imgList{
        width:6.7vw;
        height:6.7vw;
        margin-left:4.4vw;
        transform:rotate(270deg);
      }
      .imgTranform{
        transform:rotate(360deg);
      }
    }
  }
  .imgMain{
    width:91.1vw;
    height:161.1vw;
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
</style>
