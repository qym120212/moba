<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black px-3 py-2 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2 fs-sm">{{ model.name }}</h2>
        <div class="fs-sm">{{ model.categories.map(v => v.name).join('/') }}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤：2&gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of tab -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex pb-2 pt-3 jc-around" style=" border-bottom:1px solid #d4d9de">
          <div class="nav-item active">
            <div class="nav-link">英雄初始</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white" style=" border-bottom:1px solid #d4d9de">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-menu"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-menu"></i>
                  一图识英雄
                </router-link>
              </div>
              <div class="skills mt-4">
                <div class="d-flex jc-around">
                  <img class="icon"
                    :src="item.icon"
                    :class="{active: currentSkillIndex === i}"
                    @click="currentSkillIndex = i"
                    v-for="(item,i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <span class="text-grey-1 ml-4">
                      (冷却值:{{ currentSkill.delay }}消耗:{{ currentSkill.cost }})
                    </span>
                  </div>
                  <p>{{ currentSkill.description }}</p>
                  <div  style="border-bottom:1px solid #d4d9de"></div>
                  <p class="text-grey-1">小提示:{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <m-card plain icon="menu" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt="" class="icon">
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
              <div  style=" border-bottom:1px solid #d4d9de" class="mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" alt="" class="icon">
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="menu" title="使用技巧">
                <p class="m-0">{{ model.usageTips }}</p>
            </m-card>
            <m-card plain icon="menu" title="对抗技巧">
                <p class="m-0">{{ model.battleTips }}</p>
            </m-card>
            <m-card plain icon="menu" title="团战思路">
                <p class="m-0">{{ model.teamTips }}</p>
            </m-card>
            <m-card plain icon="menu" title="英雄关系">
                <div class="fs-xl">最佳搭档</div>
                <div v-for="item in model.partners" :key=item.name class="d-flex pt-3">
                  <img :src="item.hero.avatar" alt="" height="50">
                  <p class="flex-1 ml-3 m-0">
                    {{ item.description }}
                  </p>
                </div>
                <div  style=" border-bottom:1px solid #d4d9de" class="mt-3"></div>
            </m-card>

          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex:0
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  computed: {
    currentSkill(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }

.skills{
  img.icon{
    width: 70px;
    height: 70px;
    border: 3px solid map-get($colors,'white');
    &.active{
    border-color:map-get($colors,'primary');
    }
    
    border-radius: 50%;
  }

}
  .hero-items{
    img.icon{
      width: 45px;
      height: 45px;
      border-radius: 50%
    }
  }
}
</style>