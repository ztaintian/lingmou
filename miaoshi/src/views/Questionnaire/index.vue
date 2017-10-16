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
  	<div class="questionOne" v-for="(v,index) in questionList">
  		<span class="one">{{v.questionNmae}}</span>
  		<span class="ifShow">展开</span>
  		<div class="showzoun" v-show="true">
  			<div class="line"></div>
		  	<div class="zune">
			  	<span class="name title">标题</span>
			  	<div class="right">
				  	<input class="nameipt" type="" name="">
			  		<span class="count">0/35</span>
			  	</div>
		  	</div>
		  	<div class="choice">
		  		<span class="type">类型</span>
		  		<!-- <span style="bctype"><input type="radio" id="one" value="单选" name="type"></span><label>单选</label> -->
		  		<el-radio class="radio" v-model="v.radio" label="1">单选</el-radio>
		  		<el-radio class="radio" v-model="v.radio" label="2">多选</el-radio>
		  		<el-radio class="radio" v-model="v.radio" label="3">填空</el-radio>
		  		<!-- <input type="radio" id="one" value="多选" name="type"><label>多选</label>
		  		<input type="radio" id="one" value="填空" name="type"><label>填空</label> -->
		  	</div>
  		</div>
  		<div class="showzoun" v-show="true">
  			<div class="line"></div>
		  	<div class="zune">
			  	<span class="name title">标题</span>
			  	<div class="right">
				  	<input class="nameipt" type="" name="">
			  		<span class="count">0/35</span>
			  	</div>
		  	</div>
		  	<div class="choice">
		  		<span class="type">类型</span>
		  		<!-- <span style="bctype"><input type="radio" id="one" value="单选" name="type"></span><label>单选</label> -->
		  		<el-radio class="radio" v-model="v.radio" label="1">单选</el-radio>
		  		<el-radio class="radio" v-model="v.radio" label="2">多选</el-radio>
		  		<el-radio class="radio" v-model="v.radio" label="3">填空</el-radio>
		  		<!-- <input type="radio" id="one" value="多选" name="type"><label>多选</label>
		  		<input type="radio" id="one" value="填空" name="type"><label>填空</label> -->
		  	</div>
  		</div>
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
    	questionList:[{questionNmae:'问题一',radio:'radio1'},{questionNmae:'问题二',radio:'radio1'}],
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
  		this.questionList.push({questionNmae:'问题三'})
  		setTimeout(function(){
		  	document.querySelector('#left').style.height = document.querySelector('#right').offsetHeight+'px'
  		},200)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.questionnaire{
		overflow: hidden;
		padding:30px 0 0 40px;
		width:1098px;
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
			width:560px;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
		}
		.data{
			width:150px;
			height:40px;
			background: #F5F5F5;
			color: #333333;
			font-size: 14px;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			float:left;
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
			option{
				font-size: 14px;
				color: #333333;
				line-height:19px;
			}
		}
		.questionOne{
			padding:0 0 0 30px;
			width:1025px;
			background: #F5F5F5;
			border-radius: 4px;
			margin-top:12px;
			overflow: hidden;
			.one{
				font-family:'PingFangSC-Medium';
				font-size: 14px;
				line-height:52px;
				font-weight:900;
				color: #000000;
				letter-spacing: 0;
			}
			.ifShow{
				display:inline-block;
				float:right;
				font-size: 14px;
				line-height:52px;
				color: #2D78B3;
				letter-spacing: 0;
				margin-right:30px;
			}
		}
		.addquestion{
			margin-top:12px;
			margin-bottom: 30px;
			width:1053px;
			height:52px;
			border: 1px dotted #C4C4C4;
			border-radius: 4px;
			text-align: center;
			a{
				line-height:52px;
				font-size: 14px;
				color: #2D78B3;
				text-decoration: none;
			}
		}
		.showzoun{
			.line{
				background: #EBEBEB;
				margin-bottom:16px;
				width:998px;
				height:1px;
			}
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