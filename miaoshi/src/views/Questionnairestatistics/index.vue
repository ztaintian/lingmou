<template>
  <div class="Questionnairestatistics">
    <div class="content">
      <div class="top">
        <span class="title">{{choiceList.title}}</span>
        <div class="tip">
          <span>有效期：{{choiceList.created_at|dataFormYMD}}～{{choiceList.endtime|dataFormYMD}}</span>
          <span style="margin:auto  40px;">状态：<span v-if="(new Date()).getTime()< choiceList.endtime*1000" style="color:#3DB866;">进行中</span><span style="color:red;" v-if="(new Date()).getTime()>= choiceList.endtime*1000">已过期</span></span>
          <span>完成人数：{{choiceList.finish_n}}人</span>
        </div>
      </div>
      <div class="tab">
        <span @click="questionTab(1,$event)" :class="questionTabFlag?'borderBottom':''">问卷统计</span>
        <span  @click="questionTab(2,$event)" :class="!questionTabFlag?'borderBottom':''">答卷列表</span>
      </div>
      <div class="questionTab" v-if="questionTabFlag">
        <div v-for="(v,index) in questionsList">
          <div v-if="v.type==1">
            <div class="title">
              {{v.sort}}、{{v.content}}？（单选题）
            </div>
            <div style="margin-top:12px;margin-bottom:30px;">
              <div style="margin-top:8px;" v-if="answersList[index].option1 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option1*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option1*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option1}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option2 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option2*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option2*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option2}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option3 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option3*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option3*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option3}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option4 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option4*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option4*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option4}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option5 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option5*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option5*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option5}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option6 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option6*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option6*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option6}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option7 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option7*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option7*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option7}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option8 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option8*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option8*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option8}}</span>
              </div>
            </div>
          </div>
          <div v-if="v.type==2">
            <div class="title">
              {{v.sort}}、{{v.content}}？（多选题）
            </div>
            <div style="margin-top:12px;margin-bottom:30px;">
          <div style="margin-top:8px;" v-if="answersList[index].option1 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option1*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option1*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option1}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option2 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option2*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option2*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option2}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option3 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option3*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option3*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option3}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option4 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option4*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option4*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option4}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option5 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option5*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option5*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option5}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option6 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option6*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option6*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option6}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option7 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option7*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option7*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option7}}</span>
              </div>
              <div style="margin-top:8px;" v-if="answersList[index].option8 != 0">
                <div class="lineAll">
                  <div class="lineBottom"></div>
                  <div class="line bgColorBlur" :style="{ width: answersList[index].option8*100/choiceList.finish_n  + 'px' }" ref="lineB"></div>
                </div>
                <span style="margin-left:10px;color:#3DB866;">
                  {{Number(answersList[index].option8*100/choiceList.finish_n).toFixed(1)}}%（{{choiceList.finish_n}}）
                </span><span style="margin-left:20px;color:#707070;">{{v.option8}}</span>
              </div>
            </div>
          </div>
          <div v-if="v.type==3">
            <div class="title">
             {{v.sort}}、{{v.content}}？（填空题）
            </div>
            <div style="margin-top:16px;margin-bottom:30px;">
              <div style="margin-top:8px;" v-for="(vv,indexcc) in answersList[index].answer">
                <div style="color: #707070;">
                  填写答案{{1+indexcc}}、{{vv.answer}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="questionTabTable" v-if="!questionTabFlag">
        <div class="table">
          <div class="Theaded">
            <div class="W100 publicCss">序号</div>
            <div class="W140 publicCss">答卷编号</div>
            <div class="W200 publicCss">完成时间</div>
            <div class="W200 publicCss">售点</div>
            <div class="W140 publicCss">营业所</div>
            <div class="W120 publicCss">线路</div>
            <div class="W220 publicCss">操作</div>
          </div>
          <div  :class="[v.showBc?'tablelistBc':'','tablelist']" @mouseenter="enter(v)" @mouseleave="leave(v)" v-for="v in choiceListlist">
            <div class="W100 publicCss">{{v.id}}</div>
            <div class="W140 publicCss">{{v.questionnaier_number}}</div>
            <div class="W200 publicCss">{{v.created_at|dataForm}}</div>
            <div class="W200 publicCss">{{v.storename}}</div>
            <div class="W140 publicCss">{{v.group_number}}</div>
            <div class="W120 publicCss">{{v.line_number}}</div>
            <div class="W220 publicCss"><span style="color:#2D78B3;cursor:pointer;" @click="See(v)">查看</span></div>
          </div>
        </div>
        <Pages :totlePages.sync="totleNums" v-if="totleNums/20>1" :nowPages.sync="nowNum"></Pages>
      </div>
    </div>
  </div>
</template>

<script>
import Pages from '@/components/pages'
export default {
  name: 'Questionnairestatistics',
  components:{Pages},
  data () {
    return {
      totleNums:0,
      nowNum:'1',
      choiceList:[],
      choiceListlist:[],
      questionsList:[],
      answersList:[],
      questionTabFlag:true,
      box:[{},{},{}],
      q_id:'',
      store_id:'',
      nextId:'',
      preId:''
    }
  },
  mounted(){
    // this.q_id = this.$router.currentRoute.query.q_id
    // this.store_id = this.$router.currentRoute.query.store_id
    this.getAjaxList()
    this.getAjaxListlist()
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
        return year+ '年' + month + '月' + day+'日 ' + hour + ':' + minutes
      }
    }
  },
  watch:{
    nowNum(){
      this.getAjaxListlist()
    }
  },
  methods:{
    See(v){
      this.$router.push(`/home/questionnairedetailscopy?q_id=${v.qid}&store_id=${v.store_id}`)
    },
    enter(v){
      v.showBc = true
    },
    leave(v){
      v.showBc = false
    },
    questionTab(v,e){
      if(v===1){
        this.questionTabFlag = true
      }else{
        this.questionTabFlag = false
      }
    },
    getAjaxList(){
      var that  = this
      var id = this.$router.currentRoute.query.id
      this.Axios.post(`${this.api}/question/naire-statis`,{id:id})
      .then(function (data) {
        that.choiceList = data.data.data
        that.questionsList = data.data.data.questions
        that.answersList = data.data.data.answer
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getAjaxListlist(){
      var that  = this
      var id = this.$router.currentRoute.query.id
      this.Axios.get(`${this.api}/question/answer-list?page=${this.nowNum}&per-page=20&id=${id}`)
      .then(function (data) {
        data.data.data.forEach((val,index)=>{
          val.showBc = false
        })
        that.choiceListlist = data.data.data
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    choice(num){
      if(num === 0){
        this.nextId = ''
        console.log('下一个')
      }else{
        this.preId = ''
        console.log('上一个')
      }
    }
  }
}
</script>

<style lang="scss">
  .Questionnairestatistics{
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    overflow: hidden;
    width:100%;
    background: #FFFFFF;
    border-radius: 4px;
    font-size: 14px;
    .content{
      overflow: hidden;
      padding:30px 30px 0 30px;
      .top{
        margin-bottom: 45px;
        .title{
          font-size: 20px;
          color: #000000;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .pre{
          cursor: pointer;
          background: #F5F5F5;
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
          margin-top: 16px;
          font-size: 14px;
          color: #8C8C8C;
        }
      }
      .tab{
        overflow:hidden;
        margin-bottom:32px;
        .borderBottom{
          border-bottom: 2px solid #2D78B3;
          color: #2D78B3;
        }
        span{
          display:inline-block;
          width:130px;
          height:30px;
          line-height:30px;
          text-align: center;
          font-size: 14px;
          cursor:pointer;
        }
      }
      .questionTab{
        .title{
          color:#000;
          font-weight:bold;
        }
      .lineAll{
        position:relative;
        display:inline-block;
        height:4px;
        width:100px;
        .lineBottom{
          position:absolute;
          top: -4px;
          left:0;
          height:4px;
          width:100px;
          background:#EEEEEE;
        }
        .line{
          position:absolute;
          top: -4px;
          left:0;
          height:4px;
          width:100px;
          background:#50B7EB;
        }
        .bgColorBlur{
          background:#3DB866;
        }
        .bgColorRed{
          background:#D61E2A;
        }
      }

      }
      .questionTabTable{
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
      .blueClocor{
        color:#3DB866;
      }
      .redClocor{
        color:#D61E2A;
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
    }
    .tablelistBc{
      background: #F5F5F5;
    }
      }
    }
  }
</style>
