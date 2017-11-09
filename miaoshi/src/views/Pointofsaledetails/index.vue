<template>
  <div class="pointofsaledetails">
    <div class="content">
      <div class="top">
        <span class="title">{{reportFristList1.storename}}（{{reportFristList1.store_number}}）</span>
        <span class="pre" @click="nextList">下一个</span>
        <span class="pre" @click="preList">上一个</span>
        <div class="tip">
          {{reportFristList1.group_number}}／{{reportFristList1.line_number}}／{{reportFristList.created_at|dataFormYMD}}
        </div>
      </div>
      <div class="center">
        <div class="left">
          <div class="titl">场景数据</div>
          <div class="cycly">
            <div class="percentage" style="color:#50B7EB;font-weight:bold;">
              {{Number(store_reportList.purity).toFixed(1)}}%
            </div>
            <div class="describe" >
              冰柜纯净度
            </div>
            <!-- <img class="Unqualified" :src="iconUnqualifiedUrl" alt=""> -->
          </div>
          <div class="cycly">
            <div class="percentage" style="color:#54D17D;font-weight:bold;">
              {{Number(store_reportList.saturation).toFixed(1)}}%
            </div>
            <div class="describe">
              冰柜饱和度
            </div>
            <!-- <img class="Unqualified" :src="iconUnqualifiedUrl" alt=""> -->
          </div>
          <div class="cycly">
            <div class="percentage" style="color:#E62E3A;font-weight:bold;">
              {{store_reportList.sku_total_num}}
            </div>
            <div class="describe">
              售点SKU数
            </div>
            <!-- <img class="Unqualified" :src="iconUnqualifiedUrl" alt=""> -->
          </div>
          <div class="cycly">
            <div class="percentage" style="color:#333333;font-weight:bold;">
             {{store_reportList.sku_necessary_num_act}}/{{store_reportList.sku_necessary_num}}
            </div>
            <div class="describe">
              必备SKU数
            </div>
            <!-- <img class="Unqualified" :src="iconUnqualifiedUrl" alt=""> -->
          </div>
          <div class="cycly">
            <div class="percentage" style="color:#333333;font-weight:bold;">
               {{store_reportList.sku_important_num_act}}/{{store_reportList.sku_important_num}}
            </div>
            <div class="describe">
              重点SKU数
            </div>
            <!-- <img class="Unqualified" :src="iconUnqualifiedUrl" alt=""> -->
          </div>
        </div>
      </div>
      <div class="sku">
        <div class="left">
          <div class="title">
            缺失必备 SKU
          </div>
          <div class="p" v-if="v.type==1" v-for="v in reportFristList.storeReportMiss">
            <span>缺失</span><span>{{v.sku_name}}</span>
          </div>
        </div>
        <div class="left right">
          <div class="title">
            缺失重点 SKU
          </div>
          <div class="p" v-if="v.type==2" v-for="v in reportFristList.storeReportMiss">
            <span>缺失</span><span>{{v.sku_name}}</span>
          </div>
          <div class="p">
            <span>缺失</span><span>美汁源果粒橙热带水果味600ml</span>
          </div>
        </div>
      </div>
      <div class="picture">
        <div class="sence">
          场景（{{navList.length}}）
        </div>
        <div class="nav">
          <div v-for="v in navList" style="width:160px;height:40px;display:inline-block;">
            <span @mouseover = "over(v)" @mouseleave = "leave(v)" @click="navClick(v)" :class="[v.navFlag?'navover':'',v.clickFlag?'navclick':'']">{{v.name}}</span>
          </div>
        </div>
        <div class="title">
          <span>识别产品（共{{skuList.length-reportList.sku_lack_num}}）</span>
          <div class="img">
            <img :src="iconFlag?iconUrlA:iconUrl" @click="changeImg" alt="">
          </div>
          <span>显示全部</span>
          <span class="">识别图片</span>
        </div>
        <div class="tree">
          <div class="left">
            <div class="treeLi" v-for="(v,index) in skuseriesList">
              <div class="li" @click.stop.prevent="liClick(v,$event)">
                <img :src="iconFoldURl"  :class="v.childShow?'imgTranform':''" alt=""><span>{{v.sku_name}} ({{v.length}})</span>
              </div>
              <div v-if="v.childShow" v-for="(vC,indexC) in v.ArrObjList"  @click.stop.prevent="childClick(vC,$event)">
                <span style="display:block" :class="[v.childShowColor?'backgroundBlur':'','li mgLeft10  queryList']" >
                  {{vC.name}}({{vC.num}})
                </span>
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
        <div class="title">原图（{{imgList.length}}）</div>
        <div class="img" v-for="v in imgList">
          <img @click="img(v)"  style="cursor:pointer;" :src="v" alt="">
        </div>
      </div>
    </div>
    <img-model  v-if="editBoxShow" :imgUrl="vueUrl" :editBoxShow.sync="editBoxShow"></img-model>
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
import ImgModel from '@/components/ImgModel'

export default {
  name: 'Pointofsaledetails',
  components:{'img-model':ImgModel},
  data () {
    return {
      showAllMark: true,
      scale: 100,
      bboxes: [],
      navList:[],
      navFlag:false,
      editBoxShow:false,
      imgList:[],
      iconUrlA:hookiconA,
      iconUrl:hookicon,
      iconUnqualifiedUrl:iconUnqualified,
      iconFlag:false,
      iconFoldURl:iconFold,
      iconEnlargeUrl:iconEnlarge,
      iconNarrowUrl:iconNarrow,
      vueUrl:iconVue,
      viewUrl:'',
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
      clickId:''
    }
  },
  mounted(){
    this.getAjaxListFirst()
  },
  methods:{
    getAjaxListFirst(){
      var that  = this
      this.id = this.$router.currentRoute.query.id
      this.Axios.post(`${this.api}/store-report/report`,{"id":this.id})
      .then(function (data) {
        that.reportFristList = data.data.data.report
        that.reportFristList1 = data.data.data.report.store
        data.data.data.scene_id.forEach((val,index)=>{
          val.navFlag = false
          val.clickFlag = false
        })
        that.navList = data.data.data.scene_id
        that.clickId = data.data.data.scene_id[0].id
        that.getAjaxList()
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    nextList(){
      this.navList.forEach((v,index)=>{
        v.navFlag = false
        v.clickFlag = false
      })
      this.clickId--
      if(this.clickId<=0){
        return
      }
      this.imgList =[]
      this.vueUrl =''
      this.viewUrl =''
      this.getAjaxList()
    },
    preList(){
      this.navList.forEach((v,index)=>{
        v.navFlag = false
        v.clickFlag = false
      })
      this.clickId++
      this.imgList =[]
      this.vueUrl =''
      this.viewUrl =''
      this.getAjaxList()
    },
    getAjaxList(){
      var that  = this
      this.Axios.post(`${this.api}/scene-report/report`,{id:that.clickId})
      .then(function (data) {
        that.sceneList = data.data.data.scene
        that.storeList = data.data.data.store
        that.skuList = data.data.data.sku
        that.reportList = data.data.data.report
        that.store_reportList = data.data.data.store_report
        that.viewUrl = data.data.data.report.image
        document.title = data.data.data.store.storename+'-'+data.data.data.store.store_number
        data.data.data.picture.forEach((val,index)=>{
          if(val.type == 1){
            // that.viewUrl = val.url
          }else{
            that.imgList.push(val.url)
          }
        })
        that.initCanvas()
        for(var i=0;i<data.data.data.skuseries.length;i++){
          data.data.data.skuseries[i].arr1 = []
          data.data.data.skuseries[i].arr = []
          data.data.data.skuseries[i].length = ''
          data.data.data.skuseries[i].childShow = false
          data.data.data.skuseries[i].childShowColor = false
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
    navClick(v){
      this.bboxes = []
      for(var i=0;i<this.navList.length;i++){
        this.navList[i].clickFlag = false
      }
      this.iconFlag =false
      v.clickFlag = true
      this.clickId = v.id
      this.imgList = []
      this.vueUrl = ''
      this.viewUrl = ''
      this.getAjaxList()
    },
    over(v){
      v.navFlag=true
    },
    leave(v){
      v.navFlag=false
    },
    img(v){
      this.editBoxShow = true
      this.vueUrl = v
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
      this.bboxes =[]
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
      for(var c=0;c<this.skuseriesList.length;c++){
        this.skuseriesList[c].childShowColor = false
      }
      v.childShowColor = true
      v.childShow = !v.childShow
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
          cursor:pointer;
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
              font-weight:bold;
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
              .backgroundBlur{
                background:#D0E4F2;
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
