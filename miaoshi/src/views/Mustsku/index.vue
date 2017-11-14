<template>
  <div class="mustsku">
    <div style="overflow:hidden;">
      <div style="float: left;margin-top: 30px; margin-left:30px; ">
        渠道：
      </div>
      <div class="dataImg" style="float: left;margin-top: 27px;">
        <img  :src="yestoday?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(1)"><span class="radioText">全部</span>
        <img :src="lastSeven?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(2)"><span class="radioText">大型商超</span>
        <img :src="lastMounth?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(3)"><span class="radioText">便利店</span>
        <img :src="lastLast?radioaimgUrl:radioimgUrl" alt="" @click="choiceData(4)"><span class="radioText">烟酒行</span>
      </div>
    </div>
    <div style="font-size: 18px;color: #000000;margin-left:28px;margin-top: 30px;">
      <span>必备SKU</span><span style="float: right;margin-right:22px;height:30px;line-height: 30px;text-align: center;display:inline-block;background:#4285BA;width:100px;border-radius: 4px;color:#fff;font-size:14px;" >添加</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W100 publicCss">序号</div>
        <div class="W120 publicCss">类名</div>
        <div class="W360 publicCss">适用渠道</div>
        <div class="W300 publicCss">包含SKU</div>
        <div class="W140 publicCss">创建时间</div>
        <div class="W100 publicCss">操作</div>
      </div>
      <div class="imgMain" style="height:354px;overflow-y:scroll;overflow-x: hidden;border-bottom:1px solid #eee;">
        <div v-for="(v,index) in tableList" class="tablelist">
          <div class="W100" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.id}}</div>
          <div class="W120" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">CAN可乐</div>
          <div class="W360 publicCss title">可口可乐罐装300ml、可口可乐罐装300ml可口可乐罐装300ml、装300ml</div>
          <div class="W300" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">可口可乐罐装300ml、可口可乐罐装300ml</div>
          <div class="W140" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">2019-12-12 23:45</div>
          <div class="W100 publicCss"><span style="display:inline-block;width:50px;text-align: center;color:#2D78B3;cursor: pointer;">修改</span><span style="width:50px;text-align: center;display:inline-block;color:#D61E2A ;cursor: pointer;" @click="del(v)">删除</span>
           <div v-if="v.openShow" class="messageBox">
              <img class="img1" :src="sanjiaoUrl" alt="">
              <div class="count">
                确认删除”{{v.username}}”？
              </div>
              <div class="decrite">
                删除该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
              </div>
              <div @click="confimOpen(v)" class="btnAA btnAAS">
                 确定
              </div>
              <div @click="canlve(v)" class="btnAA btnAAC">
                 取消
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="font-size: 18px;color: #000000;margin-left:28px;margin-top: 30px;">
      <span>重点SKU类</span><span style="float: right;margin-right:22px;height:30px;line-height: 30px;text-align: center;display:inline-block;background:#4285BA;width:100px;border-radius: 4px;color:#fff;font-size:14px; cursor:pointer;" @click="addSKU(1)">添加</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W100 publicCss">序号</div>
        <div class="W120 publicCss">类名</div>
        <div class="W360 publicCss">适用渠道</div>
        <div class="W300 publicCss">包含SKU</div>
        <div class="W140 publicCss">创建时间</div>
        <div class="W100 publicCss">操作</div>
      </div>
      <div class="imgMain" style="height:354px;overflow-y:scroll;overflow-x: hidden;border-bottom:1px solid #eee;">
        <div v-for="(v,index) in tableList" class="tablelist">
          <div class="W100" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">{{v.id}}</div>
          <div class="W120" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">CAN可乐</div>
          <div class="W360 publicCss title">可口可乐罐装300ml、可口可乐罐装300ml可口可乐罐装300ml、装300ml</div>
          <div class="W300" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">可口可乐罐装300ml、可口可乐罐装300ml</div>
          <div class="W140" style="height:100%;float: left;text-align:center;vertical-align:middle;justify-content:center;">2019-12-12 23:45</div>
          <div class="W100 publicCss"><span style="display:inline-block;width:50px;text-align: center;color:#2D78B3;cursor: pointer;">修改</span><span style="width:50px;text-align: center;display:inline-block;color:#D61E2A ;cursor: pointer;" @click="del(v)">删除</span>
           <div v-if="v.openShow" class="messageBox">
              <img class="img1" :src="sanjiaoUrl" alt="">
              <div class="count">
                确认删除”{{v.username}}”？
              </div>
              <div class="decrite">
                删除该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
              </div>
              <div @click="confimOpen(v)" class="btnAA btnAAS">
                 确定
              </div>
              <div @click="canlve(v)" class="btnAA btnAAC">
                 取消
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1"  :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import Pages from '@/components/pages'
import iconradio from '@/assets/ic_not selected@1x.png'
import iconradioActive from '@/assets/ic_selected@1x.png'
import sanjiao from '@/assets/sj@1x.png'
export default {
  name: 'Mustsku',
  components:{Pages},
  data () {
    return {
      sanjiaoUrl:sanjiao,
      yestoday:true,
      lastSeven:false,
      lastMounth:false,
      lastLast:false,
      radioimgUrl:iconradio,
      radioaimgUrl:iconradioActive,
      totleNums:0,
      nowNum:'1',
      hookUrl:hookicon,
      tableList:[]
    }
  },
  mounted(){
    this.getAjaxList()
  },
  watch:{
    nowNum(){
      this.getAjaxList()
    }
  },
  methods:{
    addSKU(num){
      this.$router.push('/home/addSKU')
      console.log(num)
    },
    confimOpen(v){

    },
    allHidden(){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].tipShow = false
        this.tableList[i].openShow = false
      }
    },
    canlve(v){
      v.openShow = false
    },
    del(v){
      this.allHidden()
      v.openShow = true
    },
    choiceData(num){
      if(num === 1){
        this.yestoday = true
        this.lastSeven = false
        this.lastMounth = false
         this.lastLast = false
        // this.getDate(num)
      }else if(num === 2){
        this.yestoday = false
        this.lastSeven = true
        this.lastMounth = false
         this.lastLast = false
        // this.getDate(7)
      }else if(num === 3){
        this.yestoday = false
        this.lastSeven = false
        this.lastMounth = true
         this.lastLast = false
        // this.getDate(30)
      }else{
        this.yestoday = false
        this.lastSeven = false
        this.lastMounth = false
        this.lastLast = true
      }
    },
    getAjaxList(){
      var that  = this
      this.Axios.get(`${this.api}/sku/index?page=${this.nowNum}&per-page=20&type=1`)
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.openShow = false
        })
        that.tableList = data.data.data
        that.totleNums = data.data.pagelist.count
        that.nowNum = data.data.pagelist.page
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss">
  .mustsku{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .dataImg{
      display: inline-block;
      margin-left: 10px;
      img{
        vertical-align: middle;
        cursor:pointer;
      }
      .radioText{
        margin-right: 20px;
      }
    }
    .table{
      border:1px solid #eee;
      margin:16px auto 0;
      width:1122px;
      border-radius: 4px;
      margin-bottom: 30px;
      border-bottom: 0;
      box-sizing:border-box;
      
      min-height:40px;
      .Theaded{
        overflow:hidden;
        color: #000000;
        font-weight:bold;
        border-radius: 4px;
        background: #F5F5F5;
        line-height:40px;
      }
      overflow:hidden;
      vertical-align: middle;
      .publicCss{
        display:inline-block;
        float: left;
        min-height:40px;
        line-height:40px;
        text-align: center;
        vertical-align: middle;
        color: #000000;
      }
      .title{
        line-height:25px;
      }
      .blueClocor{
        color:#3DB866;
      }
      .redClocor{
        color:#D61E2A;
      }
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
    .tablelist{
      position:relative;
      .messageBox{
        position:absolute;
        z-index:777;
        width:360px;
        height:190px;
        background:#000;
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
        border-radius: 4px;
        top:52px;
        right:2px;
        text-align: center;
      }


        .secrit{
          display:inline-block;
          cursor: pointer;
          color:#2D78B3;
          margin-right: 22px;
        }
        .count{
          font-family: "Microsoft YaHei";
          font-size: 16px;
          color: #000000;
          font-weight:bold;
          margin:20px 0 15px 0;
          line-height:20px;
        }
        .decrite{
          font-weight:bold;
          width:288px;
          margin:0 auto;
          line-height:20px;
          font-size: 14px;
          color: #000000;
        }
        .btnAA{
          float: left;
          width:80px;
          height:30px;
          text-align: center;
          line-height: 30px;
          margin-top:10px;
          cursor:pointer;
        }
        .btnAAS{
          background: #2D78B3;
          border-radius: 4px;
          margin-right:10px;
          margin-left:90px;
          border: 1px solid #E0E0E0;
          font-size: 14px;
          color: #FFFFFF;
        }
        .btnAAC{
          background: #F5F5F5;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          font-size: 14px;
          color: #333333;
        }
        .tipBox{
          position: absolute;
          color: #000000;
          top:0;
          left:0;
          width:280px;
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
          border-radius: 4px;
          height:145px;
          z-index: 99999;
        }
      .img1{
        position:absolute;
        top:-9px;
        right:30px;
      }
      display:flex;
      width:1122px;
      align-items:center;
      min-height:40px;
      border-bottom: 1px solid #E0E0E0;
    }
  }
</style>
