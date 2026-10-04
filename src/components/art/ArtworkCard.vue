<script setup>
import StatusBadge from '@/components/common/StatusBadge.vue'
import { useArtStore } from '@/stores/artStore'
import { computed } from 'vue'

const props = defineProps({ artwork: { type: Object, required: true }, variant: { type: String, default: 'exhibition' } }) // 'exhibition' | 'detail'
const artist = computed(() => useArtStore().artistBySlug(props.artwork.artist))
const size = computed(() => `${props.artwork.medium}${props.artwork.framedSize ? ' . ' + props.artwork.framedSize : ''}`)

</script>
<template>
  <RouterLink :to="{ name: 'artwork', params: { id: artwork.id } }" class="card">
    <div class="card__img"><img :src="artwork.image" :alt="artwork.title" loading="lazy" /><span class="card__artist">
        {{ artist?.name }}</span></div>
    <div class="card__body">
      <div class="card__head">
        <h3>{{ artwork.title }}</h3>
        <StatusBadge v-if="variant === 'detail'" :status="artwork.status" />
      </div>
      <div class="card__meta">
        <p>{{ variant === 'detail' ? artwork.medium : size }}</p>
        <span class="card__price">{{ artwork.priceFramed }}<small v-if="artwork.priceUnframed"> / {{
          artwork.priceUnframed }}</small></span>
      </div>
      <div class="card__foot">
        <StatusBadge v-if="variant === 'exhibition'" :status="artwork.status" />
        <span v-else class="card__link">View artwork <i class="bi bi-arrow-up-right" /></span>
        <img src="/images/barcode.png" alt="" class="barcode">
      </div>
    </div>
  </RouterLink>
</template>
<style lang="scss" scoped>
.card {
  display: block;
  background: $c-white;
  border-radius: $radius-sm;
  box-shadow: $shadow-card;
  overflow: hidden;
  @include focus-ring;

  &__img {
    position: relative;
    aspect-ratio: 4/3;
    background: $c-cream;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px 0px 5px 1px;
    }
  }

  &__artist {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.1rem 0.7rem;
    background: rgba(255, 255, 255, 0.85);
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    border-radius: 12px;
  }

  &__body {
    padding: 1.3rem 1.3rem 1.1rem;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;

    h3 {
      font: 500 1.4rem $font-display;
      text-transform: capitalize;
    }
  }

  &__meta {
    font-size: .68rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #000;
    margin: .3rem 0 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba($c-ink, .12);
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    font-size: 1.3rem;

    small {
      font-size: .9rem;
      color: $c-muted;
    }
  }

  &__link {
    font-size: .72rem;
    text-transform: uppercase;
  }
}

.barcode {
  width: 50px;
}
</style>
