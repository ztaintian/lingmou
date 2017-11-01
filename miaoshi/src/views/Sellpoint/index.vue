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
      <div v-for="(v,index) in tableList"  @mouseenter="enter(v,index)" @mouseleave="leave(v,index)" :class="[v.showBc?'tablelistBc':'','tablelist']" @click="pointofsaledetails(v)">
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
    <Pages :totlePages.sync="totleNums" :nowPages.sync="nowNum"></Pages>
    <div class="messagebox" v-if="boxShow" @click="boxShow=false">
    </div>
    <div class="messagecont" v-if="boxShow">
      <iframe id="hiddenIframe" style="border-width:0;width:0;height:0;" name="posthere"></iframe>
      <form target="posthere" action="/api/y2/frontend/web/index.php?r=store/upload" method="post" enctype="multipart/form-data">
        <div class="addGY">
          上传文件
        </div>
        <div class="upFile">
          <a style="text-align: center;display: inline-block;width:100%;height:100%;position: relative;">
              <input type="file"  @change="getFile" name="UploadForm[file]" id="mydata" accept="application/vnd.ms-excel" style="left: 0;position: absolute;width:100%;height:100%;opacity: 0; cursor:pointer;" placeholder="用户名"><span v-if="haveFails" style="font-family: 'Microsoft YaHei';font-size: 14px;color: #333333;float:left;line-height:30px;margin-left: 12px;">{{fileName}}</span><span style="line-height:30px;display:inline-block;height:30px;color: #2D78B3;" v-if="!haveFails">选择文件</span><span style="font-family: 'Microsoft YaHei';font-size:13px;color: #2D78B3;float:right;margin-right:12px;line-height:30px;" v-if="haveFails">重新上传</span>
          </a>
        </div>
        <div class="tip">
          最大支持 3 MB XLS的文件。<span  class="errorShow">{{errorMes}}</span>
        </div>
        <div class="p">导入的文件数据需要同模板文件保持一致。<span>下载模版</span></div>
        <div class="p">导入后将会覆盖原先的售点数据。售点数据全部来源于新文件。</div>
        <div class="p">导入售点后需要一段时间同步售点信息，之后才会出现，请耐心等待。</div>
        <button type="submit" @click="submit" :class="[bntIf?'bntlast':'bnt','addPublic']">
          确定上传
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/ic_yes@1x.png'
import exporticon from '@/assets/ic_import@1x.png'
import Pages from '@/components/pages'

export default {
  name: 'Sellpoint',
  components:{Pages},
  data () {
    return {
      totleNums:50,
      nowNum:1,
      errorMes:'',
      errorFlag:false,
      haveFails:false,
      bntIf:false,
      boxShow:false,
      hookUrl:hookicon,
      exportUrl:exporticon,
      tableList:[{showBc:false},{showBc:false},{showBc:false}],
      fileName:''
    }
  },
  mounted(){
  },
  methods:{
    pointofsaledetails(v){
      var aa =11
      // this.$router.push(`/home/pointofsaledetails?aa=${aa}`)
    },
    enter(v,index){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].showBc = false
      }
      v.showBc = true
    },
    leave(v,index){
      for(var i=0;i<this.tableList.length;i++){
        this.tableList[i].showBc = false
      }
    },
    submit(){
      var that =this
      if(!this.bntIf){
        return
      }
     var iframe = document.getElementById("hiddenIframe");
     function iframeOnload(){
         var html = "",json = null;
         try{
             var el = (iframe.contentWindow || iframe.contentDocument.parentWindow).document.body;
             while(el &&  el.nodeType !== 3){
                 el = el.firstChild;
             }
             html = el.nodeValue ;
             json = html ? eval("(" + html + ")") : false;
             console.log(json)
             if(json.code === 401){
              that.errorMes = json.msg
             }else if(json.code === 400){
              that.errorMes = json.msg
             }else if(json.code === 402){
              that.errorMes = json.msg
             }else if(json.code === 200){
              // that.boxShow =false
              that.errorMes = json.msg
             }
         }catch(e){}
         if(json){
             if(json.data && json.data){
                 // alert(json.data);
             }else if (json.error){
                 // alert(json.error || "上传失败。");
             }
         }
     }

     if(iframe.attachEvent){
         iframe.attachEvent("onload",iframeOnload);
     }else{
         iframe.onload = iframeOnload;
     }
     //处理页面编码问题
     if(navigator.userAgent.indexOf("MSIE") !== -1){
         form.onsubmit = function(e){
             document.charset='GBK';
         }
         window.onbeforeunload = function(){
              document.charset='UTF-8';
         }
     }
    },
    getFile(e){
    var files =  e.target.files[0]
      if(files){
        if(files.size/(1024*1024)>3){
          this.errorMes = '文件大于3M'
          return
        }else{
          this.errorMes = ''
          this.haveFails = true
          this.fileName =files.name+'('+(files.size/(1024*1024)).toFixed(2)+'M)'
          this.bntIf = true
        }
      }
    },
    exportFile(){
      this.bntIf =false
      this.errorMes=''
      this.haveFails = false
      this.boxShow = true
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
      position: fixed;
      top:0;
      left:0;
      height:100%;
      z-index: 3333;
      background: rgba(0,0,0,0.40);
      width:100%;
    }
    .messagecont{
      overflow:hidden;
      position:fixed;
      top:50%;
      z-index: 5555;
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
        .errorShow{
          font-family:'PingFang SC-Regular';
          font-size: 13px;
          color: #D61E2A;
          float: right;
          margin-right:40px;
        }
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
        display: inline-block;
        border:none;
        outline: none;
        background: #C1C7CC;
        border-radius: 4px;
        width:100px;
        height:30px;
        margin:0 auto;
        margin-top:30px;
        text-align: center;
        line-height:30px;
        color:#FFFFFF;
        margin-left: 210px;
        font-family:'PingFangSC-Regular';
        font-size: 14px;
        color: #FFFFFF;
      }
      .bntlast{
        background:#2D78B3;
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
    .export{
      cursor: pointer;
      margin:24px 0 20px 30px;
      height:24px;
      width:160px;
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
    }
    .tablelist{
      overflow: hidden;
      cursor:pointer;
      border-bottom: 1px solid #E0E0E0;
      .img{
        width:36px;
        height:36px;
        vertical-align: middle;
        background:red;
      }
    }
    .tablelistBc{
      background: #F5F5F5;
    }
  }
</style>
