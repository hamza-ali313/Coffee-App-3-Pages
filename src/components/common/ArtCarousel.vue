<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css/navigation";

defineProps({
  items: { type: Array, required: true },
  keyField: { type: String, default: "id" },
});
const uid = `c${Math.random().toString(36).slice(2, 8)}`;
</script>
<template>
  <div class="carousel">
    <button :class="['nav nav--prev', `${uid}-prev`]" aria-label="Previous">
      <img src="/images/arrleft.png" alt="">
    </button>
    <Swiper :modules="[Navigation, A11y]" :space-between="24" :slides-per-view="1"
      :navigation="{ prevEl: `.${uid}-prev`, nextEl: `.${uid}-next` }" :breakpoints="{
        640: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }">
      <SwiperSlide v-for="item in items" :key="item[keyField]">
        <slot :item="item" />
      </SwiperSlide>
    </Swiper>
    <button :class="['nav nav--next', `${uid}-next`]" aria-label="Next">
      <img src="/images/arrright.png" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
.carousel {
  position: relative;
  padding: 0.5rem 0 1rem;
}

.nav {
  position: absolute;
  top: 40%;
  z-index: 2;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url('/images/nav_bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  @include flex-center;
  @include focus-ring;

  img {
    width: 17px;
  }

  &--prev {
    left: -100px;
  }

  &--next {
    right: -100px;
  }

  &.swiper-button-disabled {
    opacity: 0.4;
    cursor: default;
  }

  @include down(xl) {
    &--prev {
      left: -0.4rem;
    }

    &--next {
      right: -0.4rem;
    }
  }
}
</style>
