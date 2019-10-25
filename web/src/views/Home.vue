<template>
  <div>
    <swiper :options="swiperOption"  ref="mySwiper">
      <swiper-slide>
         <img src="../assets/images/9a5d96079d9e6300cf51787c8b859e0f.jpeg" alt class="w-100" />    
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/3e0dce2246ebf4cdd0b2f7bbd82715d6.jpeg" alt class="w-100" />
      </swiper-slide>
      <swiper-slide>
         <img src="../assets/images/31d9f9e4b92e6a56332eb30d9bf7bf62.jpeg" alt class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-2"></i>
          <div class="py-2">故事站</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-3"></i>
          <div class="py-2">周边商城</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-4"></i>
          <div class="py-2">体验服</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-5"></i>
          <div class="py-2">新人专区</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-6"></i>
          <div class="py-2">荣耀传承</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-7"></i>
          <div class="py-2">同人社区</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-8"></i>
          <div class="py-2">王者营地</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-9"></i>
          <div class="py-2">公众号</div>
        </div>
          <div class="nav-item mb-3">
          <i class="sprite sprite-10"></i>
          <div class="py-2">版本介绍</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link tag="div" :to="`/articles/${news._id}`" v-for="(news,i) in category.newsList" :key="i" class="py-2 fs-lg d-flex">
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-1">{{ news.title }}</span>

          <span class="text-grey fs-sm">{{  news.createdAt | date}}</span>
       </router-link>
      </template>
    </m-list-card>
    
    <m-list-card icon="superhero-" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin:0  -0.5rem">
        <router-link tag="div" :to="`/heroes/${hero._id}`"
         v-for="(hero,i) in category.heroList" :key="i" class="p-2 text-center" style="width:20%">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{ hero.name }}</div>
         </router-link>
        </div>

      </template>
    </m-list-card>
    <m-list-card  icon="menu" title="精彩视频 "></m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {

  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: true,
        speed:500,

      },
      newsCats: [],
      heroCats: [],
    };
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  computed: {
       swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  mounted () {
    
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
