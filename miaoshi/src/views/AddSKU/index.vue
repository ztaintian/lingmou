<template>
  <div class="addSKU">
    <div style="font-size: 18px;color: #000000;font-weight: bold;margin-top: 24px;margin-left: 30px;margin-bottom: 20px;">
      添加必备SKU类
    </div>
    <div class="copy" >
      <span @click="quickCopy">快速复制</span><img @click="quickCopyIMg" :src="howIMG" alt="">
    </div>
    <div class="messagebox" v-if="copyBoxShow"></div>
    <div class="messagecont1" v-if="copyBoxShow">
      <img :src="seachIMG" class="seachIMg" alt=""><input type="" placeholder="搜索已有可识别SKU" class="inputSeach" name="">
      <div class="lineLine"></div>
      <div class="selectContent">
        <div style="padding:5px 0 5px 12px;" :class="[v.colrBack?'backMouse':'']" @mouseenter="enter(v)" @mouseleave="leave(v)" @click="selectConfimShow(v)" v-for="v in selectListShow">
          <span  style="vertical-align: middle;font-size: 14px;color: #333333;">{{v.name}}</span><img :src="v.show?yesIMG:''"  style="vertical-align:middle;cursor:pointer;float: right;margin-right:8px;" alt="">
        </div>
      </div>
    </div>
    <div class="messagebox" v-if="editBoxShow"></div>
    <div class="messagecont" v-if="editBoxShow">
      <div class="addGY">
        快速复制sku类说明
      </div>
      <div class="use">
       使用相同的sku类名，可用来稽查同一sku类需铺货多个的情况；例如：存在两个相同的类名为美汁源其他非橙口味，则系统默认先匹配美汁源其他非橙口味第1个，再匹配美汁源其他非橙口味第2个。
      </div>
      <div style="color:#D61E2A;width:434px;margin:15px auto;">
        提示：系统将先匹配必备SKU类，再匹配重点SKU类
      </div>
    </div>
    <img  class="imgCa"  v-if="editBoxShow" :src="canceIMG" @click="imgC" style="" alt="">
    <div style="margin-left: 30px;">
      <div style="margin-bottom: 20px;">
        <span style="width:70px;text-align: right;display: inline-block;font-weight: bold;">类名：</span><input :class="[nameGetColor?'fontColor':'','nameipt']" @focus="nameGetFocus" @blur="nameGetblur" v-model="nameQuestion" type="" name="">
      </div>
      <div style="margin-bottom: 20px;">
        <span style="width:70px;text-align: right;display: inline-block;height:42px;line-height: 42px;float: left;font-weight: bold;">适用渠道：</span>
        <div ref="seacrhTilt" class="nameipt1 minHEight" style="display: inline-block;" type="" name="">  <span v-for="v in tagList" class="tag" v-if="v.show">{{v.name}}<img :src="cleanIMG" alt="" class="img" @click="imgClenn(v)"></span><img class="img1" :src="selectIMG" @click="showSearch()" alt="">
      </div>
      <div style="position:relative;">
        <div class="modelSeach"  v-if="seachShow">
          <img :src="seachIMG" class="seachIMg" alt=""><input type="" placeholder="搜索已有可识别SKU" class="inputSeach" name="">
          <div class="lineLine"></div>
          <div class="selectContent">
            <div style="margin-top:11px;margin-left:12px;" v-for="v in selectList">
              <img :src="v.show?onIMG:offIMG" @click="selectConfim(v)" style="vertical-align:middle;cursor:pointer;" alt=""><span style="vertical-align: middle;font-size: 14px;color: #333333;">{{v.name}}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div>
        <span style="width:72px;text-align: right;display: inline-block;height:42px;line-height: 42px;float: left;font-weight: bold;">包含SKU：</span><div class="nameipt1 minHEight" style="display: inline-block;" type="" name=""><span v-for="v in skuList" class="tag" v-if="v.show">{{v.name}}<img :src="cleanIMG" alt="" class="img" @click="imgClenn(v)"></span><img class="img1" :src="selectIMG" @click="showSearch1" alt=""></div>
      </div>
      <div style="position:relative;">
        <div class="modelSeach"  v-if="seachShow1">
          <img :src="seachIMG" class="seachIMg" alt=""><input type="" placeholder="搜索已有可识别SKU" class="inputSeach" name="">
          <div class="lineLine"></div>
          <div class="selectContent">
            <div style="margin-top:11px;margin-left:12px;" v-for="v in selectList">
              <img :src="v.show?onIMG:offIMG" @click="selectConfim(v)" style="vertical-align:middle;cursor:pointer;" alt=""><span style="vertical-align: middle;font-size: 14px;color: #333333;">{{v.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span class="save">保存并继续添加</span>
      <span class="save save1" @click="saveShow">保存</span>
      <span class="save save1">取消</span>
    </div>
    <div class="messagebox" v-if="saveBoxShow"></div>
    <div class="messagecont" v-if="saveBoxShow">
      <div class="addGY">
        保存提示
      </div>
      <div class="use">
       新增该必备/重点SKU后，之后的售点报告将立即按新的标准执行，在此之前已生成的售点报告仍沿用之前的标准不受影响。
      </div>
      <div style="margin-top:30px;">
        <span class="confim ml150" @click="confimAdd">确认</span><span class="confim ml20" @click="canverAdd">取消</span>
      </div>

    </div>
  </div>
</template>

<script>
import hookicon from '@/assets/Clean@1x.png'
import hookicon1 from '@/assets/ic_unfold@1x.png'
import hookicon2 from '@/assets/ic__@1x.png'
import hookicon3 from '@/assets/search grey@2x.png'
import hookicon4 from '@/assets/check off@1x.png'
import hookicon5 from '@/assets/check on@1x.png'
import hookicon6 from '@/assets/ic_cancel@1x.png'
import hookicon7 from '@/assets/ic_yes@11x.png'

export default {
  name: 'AddSKU',
  data () {
    return {
      copyBoxShow:false,
      saveBoxShow:false,
      editBoxShow:false,
      nameQuestion:'',
      nameGetColor:false,
      cleanIMG:hookicon,
      selectIMG:hookicon1,
      howIMG:hookicon2,
      seachIMG:hookicon3,
      offIMG:hookicon4,
      onIMG:hookicon5,
      canceIMG:hookicon6,
      yesIMG:hookicon7,
      tagList:[],
      skuList:[{name:'大型商超1',show:true},{name:'大型商超2',show:true},{name:'大型商超3',show:true},{name:'大型商超4',show:true},{name:'大型商超5',show:true},{name:'大型商超6',show:true},{name:'大型商超7',show:true},{name:'大型商超8',show:true},{name:'大型商超9',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true}],
      selectList:[{show:false,name:'可口可乐罐装300ml1'},{show:false,name:'可口可乐罐装300ml2'},{show:false,name:'可口可乐罐装300ml3'},{show:false,name:'可口可乐罐装300ml4'},{show:false,name:'可口可乐罐装300ml5'},{show:false,name:'可口可乐罐装300ml6'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'},{show:false,name:'可口可乐罐装300ml7'}],
      selectListShow:[{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false},{show:false,name:'可口可乐罐装300ml1',colrBack:false}],
      seachShow:false,
      seachShow1:false
    }
  },
  mounted(){
  },
  watch:{
  },
  methods:{
    enter(v){
      v.colrBack=true
    },
    leave(v){
      v.colrBack=false
    },
    confimAdd(){

    },
    canverAdd(){
      this.saveBoxShow = false
    },
    saveShow(){
      this.saveBoxShow = true
    },
    imgC(){
      this.editBoxShow = false
    },
    quickCopy(){
      this.copyBoxShow = true
    },
    quickCopyIMg(){
      this.editBoxShow = true
    },
    selectConfimShow(v){
      v.show = !v.show
    },
    selectConfim(v){
      v.show = !v.show
      if(v.show){
        this.tagList.push({name:v.name,show:true})
      }else{
        for(var i=0;i<this.tagList.length;i++){
          if(v.name == this.tagList[i].name ){
            this.tagList[i].show = false
          }

        }
      }

    },
    showSearch1(){
      this.seachShow = false
      this.seachShow1 = !this.seachShow1
    },
    showSearch(){
      var that = this
      this.seachShow1 = false
      this.seachShow = !this.seachShow
    },
    imgClenn(v){
      v.show = false
    },
    nameGetFocus(){//名称得到焦点
      this.nameGetColor = true
    },
    nameGetblur(){//名称失去焦点
      this.nameGetColor = false
    }
  }
}
</script>

<style lang="scss">
  .addSKU{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    font-size: 14px;
    padding-bottom: 100px;
    .messagebox{
      position: fixed;
      top:0;
      left:0;
      height:100%;
      z-index: 3333;
      background: rgba(0,0,0,0.4);
      width:100%;
    }
    .imgCa{
      position:fixed;
      width:24px;
      height:24px;
      left:50%;
      z-index:9999;
      top:70%;
      margin-left:-12px;
      margin-top:-12px;
      cursor:pointer;
    }
    .messagecont{
        overflow:hidden;
        position:fixed;
        top:50%;
        margin-top:-127px;
        left:50%;
        z-index: 5555;
        margin-left: -260px;
        .addGY{
          font-family: MicrosoftYaHei;
          margin:30px 0 25px 0;
          font-size: 20px;
          color: #000000;
          text-align: center;
          letter-spacing: 0;
          font-weight:bold;
        }
        .addPublic{
          background: #C1C7CC;
          border-radius: 4px;
          width:100px;
          height:30px;
          margin:0 auto;
          margin-top:20px;
          text-align: center;
          line-height:30px;
          color:#FFFFFF;
        }
        .bntlast{
          background:#324656;
          cursor:pointer;
        }
        .use{
          width:434px;
          margin:0 auto;
          line-height:25px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
        }
        .confim{
          text-align: center;
          line-height:30px;
          font-family: PingFangSC-Regular;
          color: #FFFFFF;
          background: #2D78B3;
          border-radius: 4px;
          display:inline-block;
          width:100px;
          height:30px;
          cursor:pointer;
        }
        .ml150{
          margin-left:150px;
        }
        .ml20{
          margin-left:20px;
        }
        background:#fff;
        border-radius: 4px;
        height:211px;
        width:520px;
    }
    .messagecont1{
      position:fixed;
      z-index: 5555;
      top:50%;
      left:50%;
      margin-left:-300px;
      margin-top:-150px;
      background: #FFFFFF;
      box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
      border-radius: 4px;
      width:600px;
      height:300px;
      .seachIMg{
        float: left;
        display:inline-block;
        width:24px;
        height:24px;
        margin-top:5px;
        margin-left:12px;
      }
      .inputSeach{
        border:none;
        padding:8px;
        width:520px;
      }
      .lineLine{
        background: #CCCCCC;
        height:1px;
        width:578px;
        margin-left:12px;
      }
      .backMouse{
        background:#F5F5F5;
      }
      .selectContent{
        overflow-y: scroll;
        height:255px;
      }
      .selectContent::-webkit-scrollbar{
        width: 4px;
        height:4px;
        background-color: #fff;
      }
      .selectContent::-webkit-scrollbar-thumb{
        background:#ccc;
        border-radius: 3px;
      }

    }
    .bottom{
      margin-top:20px;
      padding-bottom: 100px;
      float: right;
      margin-right: 450px;
      .save{
        cursor:pointer;
        margin-right:10px;
        background: #4285BA;
        border: 1px solid #2D78B3;
        border-radius: 4px;
        width:138px;
        height:30px;
        display:inline-block;
        text-align: center;
        line-height:30px;
        color: #FFFFFF;
      }
      .save1{
        width:68px;
        color:#333333;
        border: 1px solid #D6D6D6;
        background: #F5F5F5;
      }
    }
    .nameipt{
      height:40px;
      width:600px;
      border-radius: 4px;
      border: none;
      border: 1px solid #E0E0E0;
    }
    .copy{
      height:20px;
      margin-bottom:20px;
      width:710px;
      color:#2D78B3;
      text-decoration: underline;
      text-align: right;
      cursor: pointer;
      img{
        vertical-align:middle;
        margin-left:5px;
      }
    }
    .nameipt1{
      min-height:40px;
      width:600px;
      border-radius: 4px;
      border: none;
      position: relative;
      border: 1px solid #E0E0E0;
      .img1{
        position:absolute;
        right:0;
        top:3px;
        cursor:pointer;
      }
    }
    .fontColor{
      border:2px solid #77B5E5;
    }
  .tag{
    height:30px;
    line-height: 30px;
    display:inline-block;
    padding:2px 10px;
    margin:2px;
    background: #F5F5F5;
    border-radius: 3px;
    .img{
      vertical-align: text-bottom;
      margin-left: 4px;
    }
  }
  .modelSeach{
    padding:0 2px 0 0 ;
    width:600px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);
    border-radius: 4px;
    height:220px;
    position:absolute;
    top:0px;
    left:70px;
    z-index: 999;
    .seachIMg{
      float: left;
      display:inline-block;
      width:24px;
      height:24px;
      margin-top:5px;
      margin-left:12px;
    }
    .selectContent{
      height:188px;
    }
    .inputSeach{
      border:none;
      padding:8px;
      width:520px;
    }
    .lineLine{
      background: #CCCCCC;
      height:1px;
      width:578px;
      margin-left:12px;
    }
    .selectContent{
      overflow-y: scroll;
    }
    .selectContent::-webkit-scrollbar{
      width: 4px;
      height:4px;
      background-color: #fff;
    }
    .selectContent::-webkit-scrollbar-thumb{
      background:#ccc;
      border-radius: 3px;
    }

  }
  }
</style>
