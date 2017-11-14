<template>
  <div class="addSKU">
    <div style="font-size: 18px;color: #000000;font-weight: bold;margin-top: 24px;margin-left: 30px;margin-bottom: 20px;">
      添加必备SKU类
    </div>
    <div class="copy">
      快速复制<img :src="howIMG" alt="">
    </div>
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
      <span class="save save1">保存</span>
      <span class="save save1">取消</span>
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

export default {
  name: 'AddSKU',
  data () {
    return {
      nameQuestion:'',
      nameGetColor:false,
      cleanIMG:hookicon,
      selectIMG:hookicon1,
      howIMG:hookicon2,
      seachIMG:hookicon3,
      offIMG:hookicon4,
      onIMG:hookicon5,
      tagList:[],
      skuList:[{name:'大型商超1',show:true},{name:'大型商超2',show:true},{name:'大型商超3',show:true},{name:'大型商超4',show:true},{name:'大型商超5',show:true},{name:'大型商超6',show:true},{name:'大型商超7',show:true},{name:'大型商超8',show:true},{name:'大型商超9',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true},{name:'大型商超',show:true}],
      selectList:[{show:false,name:'可口可乐罐装300ml1'},{show:false,name:'可口可乐罐装300ml2'},{show:false,name:'可口可乐罐装300ml3'},{show:false,name:'可口可乐罐装300ml4'},{show:false,name:'可口可乐罐装300ml5'},{show:false,name:'可口可乐罐装300ml6'},{show:false,name:'可口可乐罐装300ml7'}],
      seachShow:false,
      seachShow1:false
    }
  },
  mounted(){
  },
  watch:{
  },
  methods:{
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
      width:652px;
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
