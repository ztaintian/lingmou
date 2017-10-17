<template>
  <div class="questionnaire">
  	<div class="zune">
	  	<span class="name">问卷名称</span>
	  	<div class="right">
		  	<input class="nameipt" type="" name="">
	  		<span class="count">0/35</span>
	  	</div>
  	</div>
  	<div class="zune datetime">
	  	<span class="name">截止时间</span>
	  	<div class="right">
		  	<el-date-picker
		      v-model="value1"
		      type="date"
		      placeholder="选择日期"
		      class="data"
		     >
    		</el-date-picker>
    		<div class="szune">
	    		<select class="selecttime" name="" :style="bacStyles">
	    			<option v-for="v in timeDate" value="">{{v}}时</option>
	    		</select>
    		</div>
	  	</div>
  	</div>
  	<div class="line linetop"></div>
  	<div class="questionOne" v-for="(v,indexQ) in questionList">
  		<span class="one">{{indexQ|questionToString}}</span>
  		<span class="ifShow" @click="show(v)">{{v.show?'收起':'展开'}}</span>
  		<span class="ifShow del" v-show="v.delShow" @click="delQuestion(indexQ)">删除问题</span>
  		<div class="showzoun" v-show="v.show">
		  	<div class="zune">
			  	<span class="name title">标题</span>
			  	<div class="right">
				  	<input class="nameipt" type="" name="">
			  		<span class="count">0/35</span>
			  	</div>
		  	</div>
		  	<div class="choice">
		  		<span class="type">类型</span>
		  		<el-radio class="radio" v-model="v.radio" label="1">单选</el-radio>
		  		<el-radio class="radio" v-model="v.radio" label="2">多选</el-radio>
		  		<el-radio class="radio" v-model="v.radio" label="3">填空</el-radio>
		  	</div>
		  	<div class="zune choiceOne" v-for="(v,indexC) in v.choiceList">
			  	<span class="name">选项{{indexC+1}}</span>
			  	<div class="right">
				  	<input class="nameipt" type="" name="">
			  		<span class="count">0/35</span>
			  	</div>
			  	<span class="delchoice" @click="delChoice(indexC,indexQ)" v-if="v.delCe">删除选项</span>
		  	</div>
		  	<div class="addchoice">
		  		<a href="javascript:;" @click="addChoice(indexQ)">＋添加选项</a>
		  	</div>
  		</div>
  		<div class="line"></div>
  	</div>
  	<div class="addquestion">
  		<a href="javascript:;" @click="addQuestion">＋添加问题</a>
  	</div>
  </div>
</template>

<script>
import icon from '@/assets/ic_V@1x.png'
import iconcycle from '@/assets/ic_not selected@1x.png'
export default {
  name: 'Questionnaire',
  data () {
    return {
    	value1: '',
    	imgUrl:icon,
    	timeDate:[],
    	radio:false,
    	questionList:[{show:true,questionNmae:'问题一',radio:'radio1',choiceList:[{delCe:false}],delShow:false}],
    	bacStyles:'background:  #F5F5F5 url('+icon+')  no-repeat;background-position:95% 40%;'
    }
  },
  mounted:function(){
  	document.querySelector('#left').style.height = document.querySelector('#right').offsetHeight+'px'
  	for(var i=0;i<24;i++){
  		if(i>9){
  			this.timeDate.push(i)
  		}else{
  			this.timeDate.push('0'+i)
  		}
  	}
  },
  methods:{
  	addQuestion(){
  		this.questionList.push({show:true,radio:'radio'+this.questionList.length,choiceList:[{delCe:false}],delShow:false})
  		if(this.questionList.length > 1){
  			this.questionList[this.questionList.length-2].delShow = false;
  			this.questionList[this.questionList.length-1].delShow = true;
  		}
  	},
  	addChoice:function(index){
  		this.questionList[index].choiceList.push({delCe:false})
  		if(this.questionList[index].choiceList.length > 1){
  			this.questionList[index].choiceList[this.questionList[index].choiceList.length-2].delCe = false;
  			this.questionList[index].choiceList[this.questionList[index].choiceList.length-1].delCe = true;
  		}
  	},
  	delChoice:function(indexC,indexQ){
  		this.questionList[indexQ].choiceList.splice(indexC,1)
  	},
  	show:function(v){
  		v.show = !v.show
  	},
  	delQuestion:function(index){
  		this.questionList.splice(index,1)
  		if(this.questionList.length > 1){
  			this.questionList[this.questionList.length-2].delShow = false;
  			this.questionList[this.questionList.length-1].delShow = true;
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.questionnaire{
		font-family: 微软雅黑,'Avenir', Helvetica, Arial, sans-serif;
		overflow: hidden;
		padding:30px 0 0 40px;
		width:96.6%;
		background: #FFFFFF;
		.zune{
			overflow: hidden;
		}
		input{
			border: none;
			background:#F5F5F5;
		}
		.right{
			float:left;
			position: relative;
			.count{
				position: absolute;
				right:10px;
				top:15px;
				font-size: 14px;
				color: #C4C4C4;
			}
		}
		.name{
			display: inline-block;
			float: left;
			line-height: 40px;
			margin-right: 20px;
			font-family: 'PingFangSC-Medium';
			font-size: 14px;
			color: #000000;
			font-weight: 900;
		}
		.nameipt{
			height:40px;
			width:600px;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
		}
		.data{
			width:150px;
			height:40px;
			background: #F5F5F5;
			color: #333333;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			float:left;
			.el-input__inner{
				font-size: 14px;
				font-weight:bold;
			}
		}
		.datetime{
			margin-top: 16px;
			margin-bottom:30px;
		}
		.szune{
			float:left;
			background:url('');
		}
		.selecttime{
			appearance: none;
			margin-left: 10px;
			padding:0 0 0 16px;
			outline: none;
			height:40px;
			width:134px;
			background: #F5F5F5;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			color: #333333;
			font-size: 14px;
			font-weight:bold;
			option{
				font-weight:bold;
				font-size: 14px;
				color: #333333;
				line-height:19px;
			}
		}
		.questionOne{
			padding:0 0 0 76px;
			width:89.5%;
			border-radius: 4px;
			overflow: hidden;
			.one{
				font-size: 14px;
				line-height:52px;
				font-weight:900;
				color: #000000;
			}
			.ifShow{
				display:inline-block;
				float:right;
				cursor: pointer;
				font-size: 14px;
				line-height:52px;
				color: #2D78B3;
				letter-spacing: 0;
			}
			.del{
				margin-right:30px;
			}
			.delchoice{
				margin-left:20px;
				float:left;
				cursor: pointer;
				font-size: 14px;
				line-height:40px;
				color: #2D78B3;
			}
			.choiceOne{
				margin:16px 0 0 48px;
				font-weight: normal;
				margin-bottom: 8px;
			}
			.addchoice{
				border: 1px  dotted #C4C4C4;
				border-radius: 4px;
				width:600px;
				height:40px;
				text-align: center;
				margin-left:104px;
				margin-bottom: 21px;
				a{
					line-height:40px;
					font-size: 14px;
					color: #2D78B3;
					text-decoration: none;
				}
			}
		}
		.addquestion{
			margin: 12px 0 163px 76px;
			width:89.5%;
			height:40px;
			border: 1px dotted #C4C4C4;
			border-radius: 4px;
			a{
				line-height:40px;
				font-size: 14px;
				color: #2D78B3;
				text-decoration: none;
			}
		}
		.line{
			background: #EBEBEB;
			width:100%;
			height:1px;
		}
		.linetop{
			margin-left:72px;
			width: 90%;
		}
		.showzoun{
			width:97%;
			.title{
				font-size: 14px;
				color: #333333;
				font-weight: normal;
				margin-right:18px;
			}
			overflow: hidden;
		}
		.choice{
			overflow: hidden;
			margin-top:19px;
			input[type="radio"] {
       	opacity: 0;
      }
			.type{
				font-size: 14px;
				color: #333333;
				margin-right:18px;
			}
		}
	}
</style>