<template>
  <div class="sellpoint">
    <div class="export" @click="exportFile">
      <img :src="exportUrl" alt="">
      <span>导入并更新所有售点</span>
    </div>
    <div class="table">
      <div class="Theaded">
        <div class="W100 publicCss">营业所编号</div>
        <div class="W100 publicCss">拜访线路</div>
        <div class="W100 publicCss">售点编号</div>
        <div class="W222 publicCss">名称</div>
        <div class="W178 publicCss">地址</div>
        <div class="W100 publicCss">联系人</div>
        <div class="W120 publicCss">手机号</div>
        <div class="W100 publicCss">拜访频率</div>
        <div class="W100 publicCss">星期几</div>
      </div>
      <div v-for="(v,index) in tableList" class="tablelist">
        <div class="W100 publicCss">123444</div>
        <div class="W100 publicCss">101</div>
        <div class="W100 publicCss">92019203</div>
        <div class="W222 publicCss">全家便利店（徐汇店）</div>
        <div class="W178 publicCss">上海市徐汇区肇嘉浜路7…</div>
        <div class="W100 publicCss">林田田</div>
        <div class="W120 publicCss ">13800138000</div>
        <div class="W100 publicCss ">一周一访</div>
        <div class="W100 publicCss ">周二／周五</div>
      </div>
    </div>
    <div class="pagination">
      <span class="totle">共190条，每页20条</span>
      <img class="img" :src="pnextUrl" alt=""><span class="num">2/20</span>
      <img class="img" :src="nextUrl" alt="">
      <input type="" name="">
      <span class="jump">跳转</span>
    </div>
    <div class="messagebox" v-if="boxShow">
      <div class="messagecont">
        <div class="addGY">
          上传文件
        </div>
        <div class="upFile">
          <a style="text-align: center;display: inline-block;width:100%;height:100%;position: relative;">
            <input type="file" name="" style="position: absolute;width:100%;height:100%;opacity: 0;" placeholder="用户名"><span style="line-height:30px;display:inline-block;height:30px;color: #2D78B3;">选择文件</span>
          </a>
        </div>
        <div class="tip">
          最大支持 1 MB CSV的文件。
        </div>
        <div class="p">导入的文件数据需要同模板文件保持一致。<span>下载模版</span></div>
        <div class="p">导入后将会覆盖原先的售点数据。售点数据全部来源于新文件。</div>
        <div class="p">导入售点后需要一段时间同步售点信息，之后才会出现，请耐心等待。</div>
       <!--  <el-upload
          class="upload-demo upFile"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
        <div @click="addsuccess" :class="[bntIf?'bntlast':'bnt','addPublic']">
          确定上传
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import ic_nextActive from '@/assets/ic_next_pressed@1x.png'
import ic_next from '@/assets/ic_next_normal@1x.png'
import pic_next from '@/assets/ic_pre_normal@1x.png'
import pic_nextActive from '@/assets/ic_pre_pressed@1x.png'
import exporticon from '@/assets/ic_import@1x.png'

export default {
  name: 'Sellpoint',
  data () {
    return {
      bntIf:false,
      boxShow:false,
      nextUrl:ic_next,
      nextUrlA:ic_nextActive,
      pnextUrl:pic_next,
      pnextUrlA:pic_nextActive,
      hookUrl:hookicon,
      exportUrl:exporticon,
      tableList:[{showBc:false},{showBc:false},{showBc:false}]
    }
  },
  methods:{
    exportFile(){
      this.boxShow = true
       document.body.style.overflow='hidden';
       document.body.style.height='100%';
    },
    addsuccess(){
      this.boxShow = false
      document.body.style.overflow='scroll';
    }
  }
}
</script>

<style lang="scss">
  .sellpoint{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .messagebox{
      position: absolute;
      top:0;
      left:0;
      height:100%;
      z-index: 9999;
      background: rgba(0,0,0,0.40);
      width:100%;
      .messagecont{
        overflow:hidden;
        position:absolute;
        top:50%;
        margin-top:-162px;
        left:50%;
        margin-left: -260px;
        .p{
          height:20px;
          line-height:20px;
          font-size: 14px;
          color: #333333;
          margin-left: 40px;
          margin-bottom: 4px;
          span{
            color: #2D78B3;
            cursor:pointer;
          }
        }
        .tip{
          font-size: 14px;
          color: #8C8C8C;
          margin:10px 0 20px 40px;
        }
        .addGY{
          font-family: MicrosoftYaHei;
          margin:0 auto;
          width:102px;
          height:26px;
          line-height:26px;
          margin-top:26px;
          margin-bottom:30px;
          font-size: 20px;
          color: #000000;
          font-weight:bold;
        }
        .addPublic{
          background: #C1C7CC;
          border-radius: 4px;
          width:100px;
          height:30px;
          margin:0 auto;
          margin-top:30px;
          text-align: center;
          line-height:30px;
          color:#FFFFFF;
        }
        .bntlast{
          background:#324656;
          cursor:pointer;
        }
        .upFile{
          margin:0 auto;
          width:440px;
          height:30px;
          border: 1px dotted #C4C4C4;
          border-radius: 4px;
          input{
            width:100%;
            height:100%;
          }
        }
        background:#fff;
        border-radius: 4px;
        height:324px;
        width:520px;
      }
    }
    .export{
      cursor: pointer;
      margin:24px 0 20px 30px;
      height:24px;
      img{
        vertical-align: bottom;
        font-size: 0;
      }
      span{
        line-height: 24px;
        margin-left:0;
        color:#2D78B3 ;
      }
      font-size: 14px;
      color: #2D78B3;
    }
    .table{
      margin:30px auto 0;
      width:1120px;
      padding-bottom: 200px;
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
