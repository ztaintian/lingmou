<template>
  <div class="scenemanagement">
    <div class="top">
      <span class="tit">陈列场景</span><span class="tip">以下为默认添加场景，不可编辑</span>
    </div>
    <div class="center">
      <img :src="freezerUrl" alt="">
      <div class="right">
        <span class="freezer">冰柜场景</span><div>业代可添加该场景，完成冰柜稽查任务</div>
      </div>
      <div class="rightLast">
        已启用
      </div>
    </div>
    <div class="center">
      <img :src="shelveUrl" alt="">
      <div class="right">
        <span class="freezer">货架场景</span><div>业代可添加该场景，完成货架稽查任务，为保证识别正确率，需拍摄分开拍摄多张图片用于拼接</div>
      </div>
      <div class="rightLast">
        已启用
      </div>
    </div>
    <div class="center">
      <img :src="hotsaleUrl" alt="">
      <div class="right">
        <span class="freezer">堆头场景</span><div>业代可添加该场景，完成堆头稽查任务，为保证识别正确率，需45度对角分两次拍摄统一堆头</div>
      </div>
      <div class="rightLast">
        已启用
      </div>
    </div>
    <div class="top">
      <span class="tit">问卷场景</span><span class="tip">业代可添加进行中的问卷</span>
      <span class="newQ" @click="newQuestion">新建问卷</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W584 txl publicCss">问卷名称</div>
        <div class="W120 publicCss">完成数量</div>
        <div class="W120 publicCss">进行中</div>
        <div class="W280 publicCss"></div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W584 txl publicCss">{{v.title}}</div>
        <div class="W120 publicCss">{{v.finish_n}}</div>
        <div class="W120 publicCss">{{new Date().getTime()>(v.endtime*1000)?'过期':'进行中'}}</div>
        <div class="W280 publicCss" style="text-align:right;"><!-- <span style="cursor: pointer;color:#2D78B3;margin-right:30px;" @click="questionnairedetails(v)">详情</span> --><span style="cursor: pointer;color:#2D78B3;margin-right:16px;" @click="del(v)">删除</span></div>
      </div>
    </div>
    <Pages  v-if="totleNums/20>1"  :totlePages.sync="totleNums" :nowPages.sync="nowNum"></Pages>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import freezerIcon from '@/assets/ic_scene_freezer@1x.png'
import hotsaleIcon from '@/assets/ic_scene_hotsale@1x.png'
import shelveIcon from '@/assets/ic_scene_shelve@1x.png'
import Pages from '@/components/pages'

export default {
  name: 'Scenemanagement',
  components:{Pages},
  data () {
    return {
      totleNums:0,
      nowNum:'1',
      freezerUrl:freezerIcon,
      hotsaleUrl:hotsaleIcon,
      shelveUrl:shelveIcon,
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
    del(v){
      var that = this
      this.Axios.post(`/api/y2/frontend/web/index.php?r=question/delnaire`,{id:v.id})
      .then(function (data) {
        console.log(data)
         that.getAjaxList()
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    getAjaxList(){
      var that = this
      this.Axios.get(`/api/y2/frontend/web/index.php?r=question/naire&page=${this.nowNum}&per-page=20`)
      .then(function (data) {
        that.tableList = data.data.data;
        that.totleNums = data.data.pagelist.count
        that.nowNum = data.data.pagelist.page
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    newQuestion(){
      this.$router.push('/home/questionnaire')
    }
  }
}
</script>

<style lang="scss">
  .scenemanagement{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .top{
      width:1120px;
      margin:30px auto 16px;
      height:28px;
      .tit{
        font-size: 20px;
        color: #000000;
        margin-left: 6px;
        margin-right: 10px;
      }
      .newQ{
        float:right;
        width:100px;
        height:30px;
        line-height:30px;
        text-align: center;
        background: #2D78B3;
        font-size: 14px;
        color: #FFFFFF;
        border-radius: 4px;
        cursor:pointer;
      }
      .tip{
        font-size: 14px;
        color: #B3B3B3;
        line-height: 28px;
      }
    }
    .center{
      width:1088px;
      border-radius: 4px;
      margin:0 auto;
      background: #F5F5F5;
      padding:16px;
      overflow:hidden;
      margin-bottom: 8px;
      height:50px;
      .rightLast{
        float:right;
        height:50px;
        line-height:50px;
        font-size: 14px;
        color: #8C8C8C;
      }
      img{
        float:left;
      }
      .right{
        height:50px;
        margin-left:16px;
        float: left;
        overflow:hidden;
        .freezer{
          font-size: 16px;
          color: #000000;
          font-weight: bold;
        }
        div{
          margin-top:14px;
          font-size: 14px;
          color: #333333;
          height:19px;
        }
      }
    }
    .table{
      margin:16px auto 0;
      width:1120px;
      padding-bottom: 30px;
      box-sizing:border-box;
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
      .txl{
        text-align: left;
        padding-left: 16px;
      }
    }
    .tablelist{
      overflow: hidden;
      border-bottom: 1px solid #E0E0E0;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
        background:red;
      }
    }
  }
</style>
