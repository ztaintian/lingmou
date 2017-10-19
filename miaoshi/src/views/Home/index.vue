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
  		<div class="top">
  			<span>场景管理</span>
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
    	imgurl:logo,
    	useimg:useimg,
    	imgurlicon:[{icon:icon1,text:'概况',iconShow:false},{icon:icon2,text:'报告',iconShow:false},{icon:icon3,text:'数据',iconShow:false},{icon:icon4,text:'售点',iconShow:false},{icon:icon5,text:'场景',iconShow:true},{icon:icon6,text:'SKU',iconShow:false},{icon:icon7,text:'设置',iconShow:false}],
    }
  },
  methods:{
  	iconClikc(index){
  		for(var i=0;i<this.imgurlicon.length;i++){
  			this.imgurlicon[i].iconShow = false
  		}
  		this.imgurlicon[index].iconShow = true
  		if(index === 4){
  			this.$router.push('/home/questionnaire')
  		}else if(index === 1){
  			this.$router.push('/home/questionnaire')
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
.home{
	height: 100%;
	max-width:1336px;
	min-width:1150px;
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
		position: fixed;
		overflow: hidden;
		width:140px;
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
		margin-left:140px;
		width:89.5%;
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