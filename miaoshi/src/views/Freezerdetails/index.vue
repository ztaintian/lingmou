<template>
  <div class="freezerdetails">
    <div class="content">
      <div class="top">
        <span class="title">{{sceneList.name}}（{{reportList.scene_report_number}}）</span>
        <span class="pre" @click="nextList">下一个</span>
        <span class="pre"  @click="preList">上一个</span>
        <div class="tip">
          {{storeList.group_number}}／{{storeList.line_number}}／2017-11-18／{{storeList.storename}}
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
              {{reportList.purity*100}}%
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
              {{reportList.saturation*100}}%
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
              {{reportList.sku_lack_num/reportList.sku_total_num*100}}%
            </div>
            <div class="describe">
              空缺率
            </div>
          </div>
          <div class="cycly">
            <svg >
              <circle cx="52" cy="52" r="50" fill="none" stroke="#EBEEF0" stroke-width="3" stroke-linecap="round"/>
              <circle class="demo2" cx="52" cy="52" id="J_demo4"  r="50" fill="none" stroke="#EBEEF0" stroke-width="4" stroke-dasharray="0,10000"/>
            </svg>
            <div class="percentage">
              {{reportList.sku_lack_num}}
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
              <span>{{storeList.storename}}</span><span class="detail" @click="pointofsaledetails(store_reportList.id)" >详情></span>
            </div>
            <p><span>售点sku数：{{store_reportList.sku_total_num}}；</span><span>必备sku数：{{store_reportList.sku_necessary_num}}；</span><span>重点sku数：{{store_reportList.sku_important_num}}</span></p>
          </div>
        </div>
      </div>
      <div class="picture">
        <div class="title">
          <span>识别产品（共{{reportList.sku_total_num}}，top{{reportList.sku_necessary_num_act}}，重点{{reportList.sku_important_num_act}}）</span>
          <div class="img">
            <img :src="iconFlag?iconUrlA:iconUrl" @click="changeImg" alt="">
          </div>
          <span>显示全部</span>
        </div>
        <div class="tree">
          <div class="left">
            <div class="treeLi" v-for="(v,index) in skuseriesList">
              <div class="li" @click.stop.prevent="liClick(v,$event)">
                <img :src="iconFoldURl"  :class="v.childShow?'imgTranform':''" alt=""><span>{{v.sku_name}} ({{v.length}})</span>
              </div>
              <div v-if="v.childShow" v-for="(vC,indexC) in v.ArrObjList"  @click.stop.prevent="childClick(vC,$event)">
                <span style="display:block" :class="[vC.colorChange?'bgBlue':'','li mgLeft10  queryList']" >
                  {{vC.name}}({{vC.num}})
                </span>
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
        <div class="img" @click="img(v)" v-for="v in imgList">
          <img :src="v" alt="">
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
import viewIcon from '@/assets/view.jpeg'

export default {
  name: 'Freezerdetails',
  data () {
    return {
      editBoxShow:false,
      showAllMark: true,
      scale: 100,
      bboxes: [],
      viewUrl:'',
      imgList:[],
      iconUrlA:hookiconA,
      iconUrl:hookicon,
      iconFlag:false,
      iconFoldURl:iconFold,
      iconEnlargeUrl:iconEnlarge,
      iconNarrowUrl:iconNarrow,
      vueUrl:iconVue,
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
      id:''
    }
  },
  mounted(){
    this.getAjaxList()
  },
  methods:{
    pointofsaledetails(v){
      this.$router.push(`/home/pointofsaledetails?id=${v}`)
    },
    nextList(){
      console.log(this.id)
      this.id--
      if(this.id<=0){
        return
      }
      this.imgList =[]
      this.getAjaxList()
    },
    preList(){
      this.id++
      this.imgList =[]
      this.getAjaxList()
    },
    getAjaxList(){
      var that  = this
      this.id = this.$router.currentRoute.query.id
      this.Axios.post(`${this.api}/scene-report/report`,{id:this.id})
      .then(function (data) {
        that.sceneList = data.data.data.scene
        that.storeList = data.data.data.store
        that.skuList = data.data.data.sku
        that.reportList = data.data.data.report
        that.store_reportList = data.data.data.store_report
        data.data.data.picture.forEach((val,index)=>{
          if(val.type == 1){
            that.viewUrl = val.url
          }else{
            that.imgList.push(val.url)
          }
        })
        that.initCanvas()
        that.circleSet(100-data.data.data.report.purity*100, document.querySelector("#J_demo1"))
        that.circleSet(100-data.data.data.report.purity*100, document.querySelector("#J_demo2"))
        that.circleSet(100-(that.reportList.sku_lack_num/that.reportList.sku_total_num)*100, document.querySelector("#J_demo3"))

        // for(var i=0;i<data.data.data.skuseries.length;i++){
        //   data.data.data.skuseries[i].arr = []
        //   data.data.data.skuseries[i].length = ''
        //   data.data.data.skuseries[i].childShow = false
        //   that.skuList.forEach((val,index)=>{
        //     if(val.series_id == data.data.data.skuseries[i].series_id){
        //       data.data.data.skuseries[i].arr.push(val.sku_name)
        //     }
        //     data.data.data.skuseries[i].length = data.data.data.skuseries[i].arr.length
        //   })
        // }
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
            // console.log(data.data.data.skuseries[v].arr)
            that.tempList.push(...data.data.data.skuseries[v].arr)
          }
          // that.tempList = data.data.data.skuseries
          // console.log(that.tempList)
          // console.log(data.data.data.skuseries[1].arr1)
        // console.log(data.data.data.skuseries[0].arr)
        // for(var t=0;t<data.data.data.skuseries.length;t++){
        //   for(var g=0;g<data.data.data.skuseries[t].arr.length;g++){
        //     that.skuList.forEach((val,index)=>{
        //       if(data.data.data.skuseries[t].arr[g] == val.sku_name ){
        //         console.log(val)
        //       }
        //     })
        //   }
        // }
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
        // console.log(that.tempList[0].arr)
        // console.log(that.skuseriesList)
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
            console.log(that.skuseriesList)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    img(v){
      this.editBoxShow = true
      this.vueUrl = v
    },
    cancle(){
      this.editBoxShow = false
       document.body.style.overflow='scroll';
       document.body.style.height='100%';
    },
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
      var domList = document.querySelectorAll('.queryList')
      for(var a=0; a<domList.length;a++){
        domList[a].style.backgroundColor = '#fff'
      }
      v.childShow = !v.childShow
      this.iconFlag = false
    },
    changeImg(){
      if(!this.iconFlag){
        // this.colorChangeList()
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
        console.log(5)
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
      position: fixed;
      top:0;
      left:0;
      height:100%;
      z-index: 9999;
      background: rgba(0,0,0,0.40);
      width:100%;
      .messagecont{
        position:absolute;
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
          cursor:pointer;
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
              width:100px;
              text-align: center;
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
                cursor:pointer;
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
