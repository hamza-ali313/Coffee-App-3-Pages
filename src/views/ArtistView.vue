<script setup>
import { computed } from 'vue'
import { useArtStore } from '@/stores/artStore'
import BaseButton from '@/components/common/BaseButton.vue'
import ArtistProfile from '@/components/art/ArtistProfile.vue'
import ArtworkCard from '@/components/art/ArtworkCard.vue'
import Banner from '/images/banner.jpg'

const props = defineProps({ slug: { type: String, required: true } })
const store = useArtStore()
const artist = computed(() => store.artistBySlug(props.slug))
const exhibition = computed(() => store.currentExhibition)
const works = computed(() => (exhibition.value ? store.artworksByExhibition(exhibition.value.slug).slice(0, 4) : []))
</script>
<template>
  <div v-if="artist">
    <section class="hero" :style="{ backgroundImage: `url(${Banner})` }">
      <div class="container hero__inner">
        <h1>{{ artist.name }}</h1>
        <p class="hero__tag">{{ artist.tagline }}</p>
        <p class="hero__sum">{{ artist.summary }}</p>
        <div class="hero__cta">
          <BaseButton :to="{ name: 'exhibitions' }"><i class="bi bi-search" /> Explore the exhibition</BaseButton>
          <BaseButton href="#" variant="tan"><i class="bi bi-cup-hot" /> View menu</BaseButton>
        </div>
      </div>
      <!-- <img class="hero__art" :src="artist.hero" alt="" /> -->
    </section>

    <section class="section about">
      <div class="container">
        <ArtistProfile :artist="artist">
          <template #actions>
            <BaseButton href="#">Read Suzanne's story</BaseButton>
          </template>
        </ArtistProfile>
      </div>
    </section>

    <section class="section works">
      <div class="container">
        <p class="section-sub works__cafe">Dee Cafe</p>
        <h2 class="section-title">The Exhibition</h2>
        <p class="section-sub works__sub">Works currently on display at Dee</p>
        <div class="works__grid">
          <ArtworkCard v-for="a in works" :key="a.id" :artwork="a" />
        </div>
        <div class="works__all">
          <BaseButton :to="{ name: 'exhibitions' }">View all works</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 720px;
  padding-top: 11rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  &__inner {
    position: relative;
    z-index: 2;
    padding: 80px 0 0 0;
  }

  @include down(lg) {
    padding: 80px 80px 0 80px;
  }

  @include up(lg) {
    padding: 180px 80px 0 80px;
  }

  @include down(md) {
    padding: 80px 10px 0 20px;
  }

  h1 {
    @include display-heading(5rem);
    text-transform: capitalize;
    font-weight: 400;
  }

  &__tag {
    font-size: 1.5rem;
    margin: .4rem 0 1rem;
  }

  &__sum {
    max-width: 32rem;
    font-size: .9rem;
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.8rem;
  }

  &__art {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    max-width: 65%;
    object-fit: cover;
    object-position: left;

    @include down(lg) {
      opacity: .25;
      max-width: 100%;
    }
  }
}

.about {
  background: #f6f0e8;
}

.works {
  background-image: url(/images/pink_bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &__cafe {
    margin: 0;
  }

  &__sub {
    color: $c-ink;
  }

  &__grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  }

  &__all {
    text-align: center;
    margin-top: 2.5rem;
  }
}

:deep(.profile__actions) {
  display: flex;
  gap: 21px;
  align-items: center;
}

@include down(lg) {
  :deep(.profile__actions) {
    display: block;
  }
}
</style>
