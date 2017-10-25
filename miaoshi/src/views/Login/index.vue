<template>
  <div class="login">
  	<div class="top">
	  	<img :src="imgurl" alt="">
	  	<span>后台管理系统</span>
  	</div>
  	<div>
	  	<input type="" name="account"  v-model="account" class="iptAct" placeholder="请输入账号">
	  	<div ref="account"  :class="[accountFlag?'linelast':'line']"></div>
	  	<div class="error" >{{accountShow}}</div>
  	</div>
  	<div>
	  	<input type="password" name="pass"   v-model="pass" class="iptSct" placeholder="请输入密码">
	  	<div ref="pass" :class="[passFlag?'linelast':'line']"></div>
	  	<div class="error">{{passShow}}</div>
  	</div>
  	<button ref="bnt" :class="[bntIf?'bntlast':'bnt','bnt']" type="" @click="login">登录</button>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data () {
    return {
    	imgurl:logo,
    	account:'',
    	pass:'',
    	accountFlag:false,
    	passFlag:false,
    	accountShow:'',
    	passShow:'',
    	accountMessage:'账号不存在，请重新填写',
    	bntIf:false
    }
  },
  methods:{
  	ifBnt(){
  		if(this.accountFlag && this.passFlag){
  			this.bntIf = true
  		}else{
  			this.bntIf = false
  		}
  	},
  	login(){
  		if(this.accountFlag && this.passFlag){
	  		if(this.account =='ztt'){
	  			this.accountShow = ''
		  		if(this.pass =='123456'){
		  			this.passShow = ''
		  			this.$router.push('/home/focusreport')
		  		}else{
		  			this.passShow = '账号密码不匹配，请重新填写'
		  		}
	  		}else{
	  			this.accountShow = '账号不存在，请重新填写'
	  		}
  		}
  		Cookies.set('usename',this.account)
  		Cookies.set('password',this.pass)
  		console.log(Cookies.get('usename'))
  		console.log(Cookies.get('password'))
  	}
  },
  watch:{
  	account:function(val){
  		if(val==null || val==undefined || val==''){
  			this.accountFlag = false
  			this.accountShow = ''
  		}else{
  			this.accountFlag = true
  		}
  		this.ifBnt()
  	},
  	pass:function(val){
  		if(val==null || val==undefined || val==''){
  			this.passFlag = false
  			this.passShow = ''
  		}else{
  			this.passFlag = true
  		}
  		this.ifBnt()
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.login {
		font-family: 'Microsoft YaHei';
		margin: 140px auto 0;
		width:320px;
		.top{
			overflow: hidden;
			img{
				vertical-align: bottom;
				font-size: 0;
				width:103px;
				height:40px;
			}
			span{
				color:#324656;
				line-height: 45px;
				font-size: 34px;
			}
		}
		.iptAct ,.iptSct{
			width:100%;
			margin-top:100px;
			border:none;
			outline: none;
			font-size: 18px;
			padding:4px 0 ;
		}
		.line{
			width:100%;
			background: #D8D8D8;
			height:1px;
		}
		@keyframes mymove{
			from {width:0;}
			to {width:100%;}
		}
		.linelast{
			background: #324656;
			height:2px;
		}
		.iptSct{
			margin-top: 40px;
		}
		.bnt{
			margin-top: 40px;
			border: none;
    	height: 40px;
			width:100%;
			background: rgba(50,70,86,0.30);
			border-radius: 2px;
			outline: none;
			color:#FFFFFF;
			cursor:default;
		}
		.bntlast{
			background:#324656;
			cursor:pointer;
		}
		.error{
			color:#D61E2A;
			font-size:12px;
			line-height:16px;
			margin-top:4px;
			height:16px;
		}
	}
</style>