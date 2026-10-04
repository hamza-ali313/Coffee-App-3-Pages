<script setup>
import { useArtStore } from '@/stores/artStore'
import { computed } from 'vue'
const props = defineProps({ exhibition: { type: Object, required: true } })
const artist = computed(() => useArtStore().artistBySlug(props.exhibition.artist))
</script>
<template>
  <article class="ex">
    <div class="ex__img"><img :src="exhibition.cover" :alt="exhibition.name" loading="lazy" /></div>
    <div class="ex__body">
      <h3>{{ exhibition.name }}</h3>
      <p class="ex__artist">{{ artist?.name }}</p>
      <div class="ex__foot">
        <span>{{ exhibition.start }} - {{ exhibition.end }}</span>
        <RouterLink :to="{ name: 'artist', params: { slug: exhibition.artist } }" class="ex__go">Explore</RouterLink>
      </div>
    </div>
  </article>
</template>
<style lang="scss" scoped>
.ex {
  background: $c-white;
  border-radius: $radius-sm;
  box-shadow: $shadow-card;
  overflow: hidden;

  &__img {
    aspect-ratio: 4/3;
    background: $c-cream;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__body {
    padding: 1.4rem;

    h3 {
      font: 500 1.4rem $font-display;
      text-transform: capitalize;
    }
  }

  &__artist {
    font-size: .68rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    margin: .2rem 0 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba($c-ink, .12);
  }

  &__foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;
    font-size: .68rem;
    text-transform: uppercase;
  }

  &__go {
    padding: .35rem 1rem;
    border-radius: 8px;
    background: $c-tan;
    color: $c-white;
    font-weight: 500;
    @include focus-ring;
  }
}
</style>
