<template>
  <div class="distinguishsku">
    <div class="table">
      <div class="Theaded">
        <div class="W200 publicCss">编号</div>
        <div class="W120 publicCss">图片</div>
        <div class="W360 publicCss">sku名</div>
        <div class="W200 publicCss">父品牌</div>
        <div class="W120 publicCss">必备</div>
        <div class="W120 publicCss">重点</div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W200 publicCss">{{v.id}}</div>
        <div class="W120 publicCss"><img  class="img" :src="v.picture" alt=""></div>
        <div class="W360 publicCss">{{v.sku_name}}</div>
        <div class="W200 publicCss">可口可乐</div>
        <div class="W120 publicCss"><img v-if="v.is_b == 1" class="imgHook" :src="hookUrl" alt=""></div>
        <div class="W120 publicCss"><img  v-if="v.is_z == 1" class="imgHook" :src="hookUrl" alt=""></div>
      </div>
    </div>
    <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1" :bntShowPage.sync="bntShow"  :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import Pages from '@/components/pages'

export default {
  name: 'Distinguishsku',
  components:{Pages},
  data () {
    return {
      bntShow:true,
      totleNums:0,
      nowNum:1,
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
    getAjaxList(){
      var that  = this
      this.Axios.get(`${this.api}/sku/index?page=${this.nowNum}&per-page=20`)
      .then(function (data) {
        if(data.data.code == 200){
          setTimeout(function(){
            that.bntShow = true
          },2000)
          that.tableList = data.data.data
          that.totleNums = data.data.pagelist.count
          that.nowNum = Number(data.data.pagelist.page)
        }else{
          that.bntShow = false
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss">
  .distinguishsku{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .table{
      margin:30px auto 0;
      width:1120px;
      padding-bottom: 30px;
      box-sizing:border-box;
      .W360{
        width:360px;
      }
      .W200{
        width:200px;
      }
      .W120{
        width:120px;
      }
      .Theaded{
        overflow:hidden;
        color: #000000;
        font-weight:bold;
        border-radius: 4px;
        background: #F5F5F5;
      }
      overflow:hidden;
      vertical-align: middle;
      line-height:40px;
      .publicCss{
        display:inline-block;
        float: left;
        height:40px;
        text-align: center;
        vertical-align: middle;
        color: #000000;
      }
    }
    .tablelist{
      overflow: hidden;
      border-bottom: 1px solid #E0E0E0;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
      }
      .imgHook{
        vertical-align: middle;
        width:24px;
        height:24px;
      }
    }
    .tablelistBc{
      background: #F5F5F5;
    }
    .pagination{
      float: right;
      margin-bottom: 30px;
      margin-right: 60px;
      .totle{
        font-size: 14px;
        color: #8C8C8C;
        margin-right: 20px;
      }
      .img{
        vertical-align: middle;
        cursor: pointer;
      }
      .num{
        margin:0 5px 0 8px;
      }
      input{
        background: #F5F5F5;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        width:56px;
        height:20px;
        margin-right: 8px;
      }
      .jump{
        font-size: 14px;
        color: #333333;
        background: #F5F5F5;
        display: inline-block;
        width:40px;
        height:24px;
        line-height: 24px;
        border-radius: 4px;
        text-align: center;
        cursor:pointer;
        font-size: 14px;
        color:#333;
      }
    }
  }
</style>
