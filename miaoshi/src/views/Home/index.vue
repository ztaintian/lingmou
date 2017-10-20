<template>
  <div class="home">
  	<div class="left" id="left">
  		<div class="imglogo">
  			<img :src="imgurl" alt="">
  		</div>
  		<div class="nav">
	  		<div :class="[v.iconShow?'navlibc':'','navli']" @click="iconClikc(index)" v-for="(v,index) in imgurlicon">
  				<a href="javascript:;">
	  				<img :src="v.icon" alt="">
	  				<span>{{v.text}}</span>
  				</a>
	  		</div>
  		</div>
  	</div>
  	<div class="right" id="right">
  		<div class="top" v-if="type==4">
  			<span>场景管理</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>123456</span>
  			</div>
  		</div>
  		<div class="top" v-else-if="type==1">
  			<span :class="[activeF?'bgActive':'','forcereport']" @click="fouceRepeot">焦点报告</span>
  			<span :class="[activeC?'bgActive':'','forcereport','tv']" @click="cenen">场景报告</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>123456</span>
  			</div>
  		</div>
  		<div class="top" v-else-if="type==5">
  			<span :class="[activeR?'bgActive':'','forcereport']" @click="Sku(1)">可识别sku</span>
  			<span :class="[activeM?'bgActive':'','forcereport','tv']" @click="Sku(2)">必备sku</span>
  			<span :class="[activeI?'bgActive':'','forcereport','tv']" @click="Sku(3)">重点sku</span>
  			<div class="use">
  				<img :src="useimg" alt="">
  				<span>123456</span>
  			</div>
  		</div>
  		<div class="centerLine"></div>
  		<div class="routerchild">
	  		<router-view/>
  		</div>
  	</div>
  </div>
</template>

<script>
import logo from '@/assets/logo@1x.png'
import useimg from '@/assets/vue.png'
import icon1 from '@/assets/ic_overview@1x.png'
import icon2 from '@/assets/ic_report@1x.png'
import icon3 from '@/assets/ic_data@1x.png'
import icon4 from '@/assets/ic_store@1x.png'
import icon5 from '@/assets/ic_scene@1x.png'
import icon6 from '@/assets/ic_SKU@1x.png'
import icon7 from '@/assets/ic_set@1x.png'
export default {
  name: 'Home',
  data () {
    return {
    	type:1,
    	activeF:true,
    	activeC:false,
    	activeR:true,
    	activeM:false,
    	activeI:false,
    	imgurl:logo,
    	topStatus:Number,
    	useimg:useimg,
    	imgurlicon:[{icon:icon1,text:'概况',iconShow:false},{icon:icon2,text:'报告',iconShow:true},{icon:icon3,text:'数据',iconShow:false},{icon:icon4,text:'售点',iconShow:false},{icon:icon5,text:'场景',iconShow:false},{icon:icon6,text:'SKU',iconShow:false},{icon:icon7,text:'设置',iconShow:false}],
    }
  },
  mounted(){
  	this.nowRoute()
  },
  methods:{
  	nowRoute(){
  		console.log(this.$router.currentRoute)
	  	switch (this.$router.currentRoute.path){
	  		case '/home/focusrepor':
	  		this.type = 1
	  		this.iconShow()
	  		break;
	  		case '/home/questionnaire':
	  		this.type = 4
	  		this.iconShow()
	  		break;
	  		case '/home/distinguishsku':
	  		this.type = 5
	  		this.iconShow()
	  		this.skuStatus(1)
	  		break;
	  		case '/home/mustsku':
	  		this.type = 5
	  		this.iconShow()
	  		this.skuStatus(2)
	  		break;
	  		default:
	  		break;
	  	}
  	},
  	skuStatus(num){
  		this.topStatus = num
			if(num === 1){
					this.activeR = true
					this.activeM = false
					this.activeI = false
					this.$router.push('/home/distinguishsku')
			}else if(num === 2){
					this.activeR = false
					this.activeM = true
					this.activeI = false
					this.$router.push('/home/mustsku')
			}else{
					this.activeR = false
					this.activeM = false
					this.activeI = true
			}
  	},
  	Sku(num){
  		this.skuStatus(num)
  	},
  	fouceRepeot(){
  		this.activeF = true
  		this.activeC = false
  	},
  	cenen(){
  		this.activeF = false
  		this.activeC = true
  	},
  	iconShow(){
  		for(var i=0;i<this.imgurlicon.length;i++){
  			this.imgurlicon[i].iconShow = false
  		}
  		this.imgurlicon[this.type].iconShow = true
  	},
  	iconClikc(index){
  		this.type = index
  		if(index === 4){
  			this.$router.push('/home/questionnaire')
  		}else if(index === 1){
  			this.$router.push('/home/focusreport')
  		}else if(index === 5){
  			this.$router.push('/home/distinguishsku')
  			this.skuStatus(1)
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
.home{
	height: 100%;
	width:1336px;
	margin:0 auto;
	display:flex;
	.centerLine{
		height:24px;
		margin-top:60px;
		width:87%;
		z-index: 9999;
		position: fixed;
		background:#F0F0F0;
	}
	.left{
		z-index: 999;
		float:left;
		height:100%;
		position: fixed;
		overflow: hidden;
		width:120px;
		.imglogo{
			background: #D61E2A;
			height:60px;
    	text-align: center;
			img{
				margin-top: 16px;
			}
		}
		.nav{
			background: #3D454D;
			padding:20px 0 0 0;
			height: 100%;
			.navli{
				height:40px;
				a{
					display: flex;
					align-items: center;
					justify-content: center;
					img{
						height:24px;
						margin-right: 2px;
					}
					span{
						opacity: 0.7;
						line-height: 40px;
						color:#FFFFFF ;
						font-size: 14px;
					}
				}
			}
			.navlibc{
				background:rgba(255,255,255,0.10);
			}
		}
	}
	.right{
		overflow: hidden;
		float:left;
		margin-left:120px;
		width:91%;
		.routerchild{
			margin-top:60px;
			overflow: hidden;
			background: #F0F0F0;
			padding:24px;
		}
		.top{
			z-index:9999;
			position: fixed;
			background:#fff;
			min-width: 600px;
			width:89.5%;
		  height:60px;
			font-size: 14px;
			line-height:60px;
			.forcereport{
				display:inline-block;
				width:110px;
				height:60px;
				line-height:60px;
				margin-left: 24px;
				text-align: center;
				cursor: pointer;
				float: left;
			}
			.tv{
				margin-left:0;
				float: left;
			}
			.bgActive{
				color:#2D78B3;
				background: #F5F5F5;
			}
			span{
				margin-left: 37px;
				font-family: 'Microsoft YaHei';
				color: #333333;
			}
			@media only screen and (min-width:1000px) {
				.use{
					margin-right:50px;
				}
			}
			@media only screen and (min-width:800px) and (max-width: 1000px) {
				.use{
					margin-right:10%;
				}
			}
			@media only screen and (max-width: 800px) {
				.use{
					margin-right:12.5%;
				}
			}
			.use{
				float:right;
				img{
					width:30px;
					vertical-align: middle;
					height:30px;
					border-radius: 50%;
				}
				span{
					margin-left:10px;
					color:#4D4D4D;
					font-size:14px;
				}
			}
		}
	}
}
</style>