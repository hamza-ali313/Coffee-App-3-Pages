<script setup>
import { ref } from 'vue'
const open = ref(false)
const left = ['Home', 'Food & Drink', "What's On", 'Community']
const right = ['About Us', 'Visit Dee']
</script>
<template>
  <header class="header">
    <div class="header__utils">
      <a href="#" aria-label="Search"><i class="bi bi-search" /></a>
      <a href="#" aria-label="Account"><i class="bi bi-person-fill" /></a>
      <a href="#" aria-label="Basket"><i class="bi bi-cart-fill" /></a>
      <a href="#" aria-label="Language"><i class="bi bi-globe2" /></a>
    </div>
    <nav class="header__bar" aria-label="Main">
      <button class="header__toggle" :aria-expanded="open" aria-label="Menu" @click="open = !open"><i
          class="bi bi-list" /></button>
      <RouterLink to="/" class="header__logo" aria-label="Dee home">
        <img src="/images/deedarklogo.png" alt="Dee" />
      </RouterLink>
      <ul class="links links--left" :class="{ open }">
        <li v-for="t in left" :key="t"><a href="#">{{ t }}</a></li>
      </ul>
      <ul class="links links--right" :class="{ open }">
        <li v-for="t in right" :key="t"><a href="#">{{ t }}</a></li>
        <li class="line"></li>
        <li><a href="#" class="order">Order Ahead</a></li>
      </ul>
    </nav>
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  padding: .9rem $gutter 0;

  &__utils {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto .4rem;
    font-size: .9rem;
  }

  &__bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url(/images/nav-bg.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 110px;
    padding: 0 8px 0 2rem;
  }

  // logo: sized box only — the circle/leaves are already drawn into the PNG itself
  &__logo {
    display: none;

    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }

  &__toggle {
    display: none;
    font-size: 1.6rem;
  }
}

.links {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: .85rem;

  &--right {
    justify-content: flex-end;
  }

  a {
    @include focus-ring;

    &:hover {
      color: $c-orange;
    }
  }
}

.order {
  background: $c-olive;
  color: $c-white !important;
  padding: .55rem 1.2rem;
  border-radius: 6px;
}

@include down(lg) {
  .hero {
    padding: 80px 0px 0 20px;
  }

  .header__bar {
    background-image: none;
    padding: unset;
  }

  .header__toggle {
    display: block;
    background-color: #fff;
    padding: 5px 20px;
    border-radius: 9px;
  }

  .header__logo {
    display: block;
  }

  .links {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    background: $c-white;
    border-radius: 0 0 $radius-sm $radius-sm;

    &.open {
      display: block;
    }

    &--right.open {
      top: calc(100% + 8rem);
    }
  }
}

li.line {
  background: #56594a;
  width: 1px;
  height: 24px;
}
</style>