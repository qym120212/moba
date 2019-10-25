<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-1" style="border-bottom:1px solid #d4d9de">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2">{{model.title}}</strong>
      <div class="text-grey fs-xs">
        2019-06-19
      </div>
    </div>
    <div v-html="model.body" class="px-3 body" fs-lg></div>
    <div class="px-3 py-2" style="border-top:1px solid #d4d9de">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link class="py-1 mt-2" :to="`/articles/${item._id}`"  tag="div" v-for="item in model.related" :key="item._id">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    id:{required:true}
  },
  methods: {
    async fetch(){
      const res =await this.$http.get(`articles/${this.id}`)
      this.model = res.data
      
    }
  },
  watch: {
    id(){
      this.fetch()
    }
  },
  created() {
    this.fetch() 
  },
  data() {
    return {
      model:null
    }
  },
}
</script>
<style lang="scss">
.page-article{
  .body{
    img{
      max-width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
    }
  }
}
</style>