<template>
  <div class="freezerdetails" ref="rootRefs">
    <div class="load" v-if="loadFlag">
      <img src="../assets/loading@3x.png" alt="">
    </div>
    <div class="content">
      <div class="title">
        {{storeList.storename}} {{reportList.scene_report_number}}
      </div>
      <div class="address">
        <img src="../assets/ic_location@3x.png" alt="">
        <span>{{storeList.address}}</span>
      </div>
      <div class="time">
        {{reportList.created_at|dataFormYMD}}
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
          <span class="span2">{{Number(reportList.purity).toFixed(1)}}%</span>
          <img :src="ic_upUrl" alt="">
          <span class="span3"><span v-if="reportList.purity_change>0">+</span>{{Number(reportList.purity_change).toFixed(1)}}%</span>
        </div>
        <div class="lineAll">
          <div class="lineBottom" ref="lineAll"></div>
          <div class="line" ref="lineG"></div>
        </div>
      </div>
      <div class="allDetail">
        <div class="detail">
          <span class="span1">饱和度:</span>
          <span class="span2">{{Number(reportList.saturation).toFixed(1)}}%</span>
          <img src="../assets/ic_up@3x.png" alt="">
          <span class="span3"><span v-if="reportList.saturation_change>0">+</span>{{Number(reportList.saturation_change).toFixed(1)}}%</span>
        </div>
        <div class="lineAll">
          <div class="lineBottom"></div>
          <div class="line bgColorBlur" ref="lineB"></div>
        </div>
      </div>
      <div class="allDetail">
        <div class="detail">
          <span class="span1">空缺率:</span>
          <span class="span2">{{Number(reportList.empty_rate).toFixed(1)}}%</span>
          <span class="span4">空缺数:</span><span class="span5">{{reportList.sku_lack_num}}</span>
          <img :src="ic_upUrl" alt="">
          <span class="span3"><span v-if="reportList.saturation_change>0">+</span>{{Number(reportList.empty_rate_change).toFixed(1)}}%</span>
        </div>
        <div class="lineAll">
          <div class="lineBottom"></div>
          <div class="line bgColorRed" ref="lineR" ></div>
        </div>
      </div>
    </div>
    <div class="Skunum">
      <div class="title">
        SKU数量
      </div>
    </div>
    <div class="tree">
      <div class="treeLi" v-for="(v,index) in skuseriesList">
        <div class="li" @click="liClick(v,$event)">
          <img src="../assets/ic_unfold@3x.png"  :class="[v.childShow?'imgTranform':'','imgList']" alt=""><span>{{v.sku_name}} ({{v.length}})</span>
        </div>
        <div v-if="v.childShow"  v-for="(vC,indexC) in v.ArrObjList">
          <div @click="childClick(vC,$event)" class="li mgLeft10 queryList" >
           {{vC.name}}({{vC.num}})
          </div>
        </div>
      </div>
    </div>
    <div class="Skunum">
      <div class="title floatLeft">
        识别图片
      </div>
      <div class="floatRight">
        <img :src="iconFlag?ic_upChoutAUrl:ic_upChoutUrl" @click="changeImg"  alt=""><span>显示所有</span>
      </div>
    </div>
    <div  class="imgMain">
      <canvas id="bgCanvas"></canvas>
      <canvas id="imgCanvas">您的浏览器不支持canvas标签，请您更换浏览器！！  </canvas>
    </div>
    <div class="Skunum marginTop">
      <div class="title">
        原图({{imgList.length}}张)
      </div>
    </div>
    <div class="imgStyle">
      <div class="imgBottom" v-for="v in imgList" @click="getBigimg(v)">
        <img :src="v" alt="">
      </div>
    </div>
    <div class="Dialogue" v-if="imgFlag" @click="close">
      <img class="imgStyle" :src="vueUrl" alt="">
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
      vueUrl:'',
      bboxes:[],
      imgFlag:false,
      imgList:[],
      scale:38,
      viewUrl:'',
      iconFlag:false,
      ic_upChoutUrl:ic_upChout,
      ic_upChoutAUrl:ic_upChoutA,
      ic_upUrl:ic_up,
      loadFlag:true,
      dataList:[],
      sceneList:{},
      storeList:{},
      skuList:[],
      skuseriesList:[],
      reportList:{},
      sku_lack_num:'',
      tempList:[],
      numList:[],
      store_reportList:{},
      id:'',
      reportFristList:{},
      reportFristList1:{},
      clickId:'',
      sceneId:''
    }
  },
  mounted(){
    this.getAjaxList()
  },
  filters:{
    dataFormYMD(date){
      if(date == null || date == '' || date == 0){
        return ''
      }else{
        var d = new Date(Number(date)*1000);
        var year = d.getFullYear();
        var month = d.getMonth() + 1<10?'0' + (d.getMonth() + 1) :d.getMonth() + 1;
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours() <10 ? '0'+d.getHours(): '' + d.getHours();
        var minutes = d.getMinutes()<10?'0' + d.getMinutes() : '' + d.getMinutes();
        var seconds = d.getSeconds()<10?'0' + d.getSeconds() : '' + d.getSeconds();;
        return year+ '-' + month + '-' + day+' ' + hour + ':' + minutes
      }
    }
  },
  methods:{
    styleWidth(dom,per){
      dom.style.width = this.$refs.lineAll.clientWidth*per + 'px'
    },
    close(){
      this.imgFlag = false
    },
    getAjaxList(){
      var that  = this
      this.idPass = this.$router.currentRoute.query.report_id?this.$router.currentRoute.query.report_id:''
      this.sceneId = this.$router.currentRoute.query.scene_id?this.$router.currentRoute.query.scene_id:''
      this.Axios.post(`${this.api}/scene/getreport?report_id=${this.idPass}&scene_id=${this.sceneId}`)
      .then(function (data) {
        if(data.data.code==200){
          that.loadFlag = false
          that.$refs.rootRefs.style.overflow = 'scroll'
        }
        that.sceneList = data.data.data.scene
        that.storeList = data.data.data.store
        that.skuList = data.data.data.sku
        that.reportList = data.data.data.report
        that.store_reportList = data.data.data.store_report
        that.viewUrl = data.data.data.report.image
        data.data.data.picture.forEach((val,index)=>{
          if(val.type == 1){
            // that.viewUrl = val.url
          }else{
            that.imgList.push(val.url)
          }
        })
        that.styleWidth(that.$refs.lineG,that.reportList.purity/100)
        that.styleWidth(that.$refs.lineB,that.reportList.saturation/100)
        that.styleWidth(that.$refs.lineR,that.reportList.empty_rate/100)
        that.initCanvas()
        for(var i=0;i<data.data.data.skuseries.length;i++){
          data.data.data.skuseries[i].arr1 = []
          data.data.data.skuseries[i].arr = []
          data.data.data.skuseries[i].length = ''
          data.data.data.skuseries[i].childShow = false
          var obj = {name:'',num:0}
          that.skuList.forEach((val,index)=>{
            if(val.series_id == data.data.data.skuseries[i].series_id){
              obj.num++
              if(!obj.name){
                obj.name = val.sku_name
                obj={name:'',num:0}
              }
              data.data.data.skuseries[i].arr1.push(obj)
              data.data.data.skuseries[i].arr.push(val.sku_name)
            }
            data.data.data.skuseries[i].length = data.data.data.skuseries[i].arr.length
          })
        }
          for(var v=0;v<data.data.data.skuseries.length;v++){
            that.tempList.push(...data.data.data.skuseries[v].arr)
          }
        that.skuseriesList = data.data.data.skuseries
        Array.prototype.unique = function() {
          var n = [];
          var obj = {};
          for(var i = 0; i<this.length; i++) {
            var item = this[i];
            var key = typeof(item) + item;
              if(!obj[key]){
                n.push(this[i])
                obj[key] = true
              }
          }
          return n;
        }

        for(var k=0;k<that.skuseriesList.length;k++){
          that.skuseriesList[k].arr = that.skuseriesList[k].arr.unique()
        }

        for(var o=0;o<that.skuseriesList.length;o++){
          for(var r=0;r<that.skuseriesList[o].arr.length;r++){
            var num = 0
            for(var b=0;b<that.tempList.length;b++){
              if(that.skuseriesList[o].arr[r] == that.tempList[b]){
                num++
              }
            }
            that.numList.push(num)
          }
        }
        // console.log(that.skuseriesList)
        for(var w=0;w<that.skuseriesList.length;w++){
          that.skuseriesList[w].arr2 = that.numList.splice(0,that.skuseriesList[w].arr.length)
        }
        for(var m=0;m<that.skuseriesList.length;m++){
          that.skuseriesList[m].ArrObjList = []
          for(var z=0;z<that.skuseriesList[m].arr.length;z++){
            var ArrObj = {name:'',num:''}
            ArrObj.name = that.skuseriesList[m].arr[z]
            ArrObj.num = that.skuseriesList[m].arr2[z]
            that.$set(ArrObj, 'colorChange', false);
            that.skuseriesList[m].ArrObjList.push(ArrObj)
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getBigimg(v){
      document.body.style.overflow='hidden';
      document.body.style.height='100%';
      this.vueUrl = v
      this.imgFlag = true
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
    childClick(v,event){
      if(!event){
        return
      }
      var domList = document.querySelectorAll('.queryList')
      for(var a=0; a<domList.length;a++){
        domList[a].style.backgroundColor = '#fff'
      }
      event.target.style.backgroundColor ='#D0E4F2'
      v.colorChange = true
      this.bboxes =[]
      for(var i=0;i<this.skuList.length;i++){
        var obj = {truncated:false,color:'red'}
        if(this.skuList[i].sku_name == v.name){
          obj.x1 = this.skuList[i].x1
          obj.x2 =this.skuList[i].x2
          obj.y1 = this.skuList[i].y1
          obj.y2 = this.skuList[i].y2
          this.bboxes.push(obj)
        }
      }
      this.showAll(this.bboxes)
      this.iconFlag = false
    },
    liClick(v,event){
      event.stopPropagation();
      v.childShow = !v.childShow
      this.bboxes = []
      for(var i=0;i<this.skuList.length;i++){
        var obj = {truncated:false,color:'red'}
        if(this.skuList[i].series_id == v.series_id){
          obj.x1 = this.skuList[i].x1
          obj.x2 =this.skuList[i].x2
          obj.y1 = this.skuList[i].y1
          obj.y2 = this.skuList[i].y2
          this.bboxes.push(obj)
        }
      }
      this.showAll(this.bboxes)
      this.iconFlag = false
    },
    changeImg(){
      var domList = document.querySelectorAll('.queryList')
      for(var a=0; a<domList.length;a++){
        domList[a].style.backgroundColor = '#fff'
      }
      if(!this.iconFlag){
        for(var i=0;i<this.skuList.length;i++){
          var obj = {truncated:false,color:'red'}
          obj.x1 = this.skuList[i].x1
          obj.x2 =this.skuList[i].x2
          obj.y1 = this.skuList[i].y1
          obj.y2 = this.skuList[i].y2
          this.bboxes.push(obj)
        }
         this.showAll(this.bboxes)
      }else{
        this.bboxes = []
        this.showAll(this.bboxes)
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
  .Dialogue{
    position: fixed;
    z-index: 1000;
    width:100%;
    height:100%;
    overflow: scroll;
    top:0;
    left:0;
    background:#fff;
    .imgStyle{
      width:100%;
    }
  }
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
        height:6.7vw;
        line-height:6.7vw;
        vertical-align: top;
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
      .queryList{
        background:#fff;
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
    height:135vw;
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
