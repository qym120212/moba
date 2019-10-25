<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{active:active === i}" v-for="(category,i) in categories" :key="i" @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex" :options="{autoHeight:true}">
        <swiper-slide v-for="(category,i) in categories" :key="i">
        
          <!-- <div v-for="n in 5" :key="n" class="py-2">
              
          </div> -->
          <slot name="items" :category="category"></slot>  
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array }
  },
  data() {
      return {
          active:0
      }
  },
};
</script>

<style>
</style>
