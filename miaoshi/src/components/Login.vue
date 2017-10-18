<template>
  <div>
		<img  :src="aa?src:srcA"   alt="" @click="cm(1)"><span class="radioText">单选</span>
		<img  :src="bb?src:srcA"  alt="" @click="cm(2)"><span class="radioText">多选</span>
		<img  :src="cc?src:srcA" alt="" @click="cm(3)"><span class="radioText">填空</span>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    	aa:false,
    	bb:false,
    	cc:false
    }
  },
  props: ['src','srcA'],
  methods:{
  	cm(num){

  		if(num === 1){
  			this.aa = true
  			this.bb = false
  			this.cc = false
  		}else if(num === 2){
  			this.aa = false
  			this.bb = true
  			this.cc = false
  		}else{
  			this.aa = false
  			this.bb = false
  			this.cc = true
  		}
  		this.$emit('update:aa', this.aa)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	img{
		vertical-align: middle;
	}
</style>
