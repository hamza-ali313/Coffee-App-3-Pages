<script setup>
import { ref } from 'vue'
import { useArtStore } from '@/stores/artStore'
import BaseButton from '@/components/common/BaseButton.vue'
import ArtCarousel from '@/components/common/ArtCarousel.vue'
import ExhibitionCard from '@/components/art/ExhibitionCard.vue'

const store = useArtStore()
const tab = ref('current')
const selects = [['artist', 'Artist'], ['year', 'Year'], ['category', 'Category']]
</script>
<template>
  <div class="page">
    <div class="bar container">
      <div class="tabs" role="tablist">
        <button v-for="t in ['current', 'past']" :key="t" role="tab" :aria-selected="tab === t"
          :class="{ on: tab === t }" @click="tab = t">{{ t }}</button>
      </div>
      <div class="filters">
        <strong>Filter</strong>
        <select v-for="[key, label] in selects" :key="key" :value="store.filters[key]" :aria-label="label"
          @change="store.setFilter(key, $event.target.value)">
          <option value="">{{ label }}</option>
          <option v-for="o in store.filterOptions[key]" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>
    </div>

    <section v-if="tab === 'current'" class="current">
      <template v-if="store.currentExhibition">
        <div class="current__text">
          <p>Current</p>
          <h1>{{ store.currentExhibition.name }}</h1>
          <p class="current__artist">{{ store.artistBySlug(store.currentExhibition.artist)?.name }}</p>
          <p>{{ store.currentExhibition.start }} — {{ store.currentExhibition.end }}</p>
          <BaseButton :to="{ name: 'artist', params: { slug: store.currentExhibition.artist } }"><i
              class="bi bi-search" /> Explore the exhibition</BaseButton>
        </div>
        <img class="current__img" :src="store.currentExhibition.cover" :alt="store.currentExhibition.name" />
      </template>
      <p v-else class="empty container">No current exhibition matches these filters. Clear a filter to see more.</p>
    </section>

    <section class="section past container">
      <h2 class="section-title" style="margin-bottom: 22px;">Past exhibitions</h2>
      <ArtCarousel v-if="store.pastExhibitions.length" :items="store.pastExhibitions" key-field="slug">
        <template #default="{ item }">
          <ExhibitionCard :exhibition="item" />
        </template>
      </ArtCarousel>
      <p v-else class="empty">No past exhibitions match these filters.</p>
      <div class="past__all">
        <BaseButton :to="{ name: 'artist', params: { slug: 'suzanne-lycett' } }">View all works</BaseButton>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.page {
  padding-top: 9rem;
  background: $c-cream;
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-block: 1px solid rgba($c-ink, .15);
  padding-block: .8rem;
  margin-top: 35px;
}

.tabs button {
  font-size: 1.3rem;
  padding: .3rem .6rem;
  color: $c-muted;
  text-transform: capitalize;
  @include focus-ring;

  &.on {
    color: $c-forest;
    font-weight: 500;
    box-shadow: 0 .8rem 0 -.6rem $c-tan;
  }
}

.filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  strong {
    font-size: 1.3rem;
    margin-right: .6rem;
    font-weight: 500;
  }

  select {
    appearance: none; // removes the browser's default arrow
    -webkit-appearance: none;
    min-width: 10rem;
    padding: .7rem 2.4rem .7rem 1rem; // extra right padding so text doesn't sit under the icon
    border: 0;
    border-radius: $radius-sm;
    background: $c-white url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16' fill='%236b6660'><path d='M4.5 6l3.5 3.5L11.5 6z'/></svg>") no-repeat right 1rem center;
    background-size: 12px;
    font: 1.1rem $font-body;
    color: $c-muted;
  }
}

.current {
  display: grid;
  align-items: center;
  gap: 2rem;
  padding-block: 4rem;

  @include up(lg) {
    grid-template-columns: 1fr 1.5fr;
  }

  &__text {
    display: grid;
    gap: .5rem;
    justify-items: start;
    padding-inline-start: $gutter; // lines text up with the header/filter bar above

    @include up(lg) {
      padding-inline-start: max($gutter, calc((100vw - #{$container}) / 2));
    }

    h1 {
      @include display-heading(4.2rem);
      text-transform: capitalize;
      font-weight: 400;
    }

    p:first-child {
      font-size: 1.4rem;
    }
  }

  &__artist {
    text-transform: uppercase;
    font-size: 1.1rem;
    color: #27352a;
  }

  &__img {
    width: 100%;
    max-height: 640px;
    object-fit: cover;
    background: $c-white;
  }
}

.past__all {
  text-align: center;
  margin-top: 2.5rem;
}

.empty {
  text-align: center;
  color: $c-muted;
  padding-block: 3rem;
}
</style>
