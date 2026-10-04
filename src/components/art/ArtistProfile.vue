<script setup>
defineProps({ artist: { type: Object, required: true }, layout: { type: String, default: 'portrait' } }) // 'portrait' | 'compact'
</script>
<template>
  <section :class="['profile', `profile--${layout}`]">
    <div v-if="layout === 'portrait'" class="profile__photo"><img :src="artist.portrait" :alt="artist.name" /></div>
    <div class="profile__text">
      <h2>{{ artist.name }}</h2>
      <p class="profile__lead">{{ layout === 'portrait' ? artist.heading : 'Realistic wildlife drawings inspired by the natural world' }}</p>
      <p v-for="(p, i) in (layout === 'portrait' ? artist.bio : artist.bio.slice(0, 2))" :key="i">{{ p }}</p>
      <div class="profile__actions">
        <slot name="actions" />
        <div class="dyn_cls">
            <a :href="artist.website" target="_blank" rel="noopener" class="profile__link" style=""><i class="bi bi-globe2" /> {{
              layout === 'portrait' ? artist.website.replace('https://', '') : 'website' }} <i
                class="bi bi-arrow-up-right" /></a>
            <a v-if="layout === 'compact'" :href="artist.instagram" target="_blank" rel="noopener" class="profile__link"><i class="bi bi-instagram" /> instagram</a>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.profile {
  display: grid;
  gap: 3rem;
  align-items: center;

  &--portrait {
    @include up(lg) {
      grid-template-columns: 1fr 1.2fr;
    }
  }

  &__photo img {
    width: 100%;
    max-height: 640px;
    object-fit: cover;
    border-radius: $radius-lg;
  }

  &__text {
    display: grid;
    gap: 1.1rem;
    font-size: .88rem;
    color: $c-muted;
    max-width: 34rem;

    h2 {
      @include display-heading(3.4rem);
      color: $c-ink;
      text-transform: capitalize;
      font-weight: 400;
      position: relative;

      
    &::after {
        content: '';
        position: absolute;
        top: -35px;
        left: 70%;
        transform: translateX(-50%);
        width: 2.5rem; // size of the leaf image — adjust to taste
        height: 2.5rem;
        background-image: url('/images/accleaf.png'); // fixed typo: was /mages/
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    }
  }

  &--compact &__lead {
    color: $c-orange;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  &--portrait &__lead {
    color: $c-ink;
    font-size: 1.4rem;
  }

  &__actions {
    margin-top: .6rem;
  }

  &__link {
    font-size: .78rem;
    color: $c-ink;
    @include focus-ring;
  }

  &--compact &__link {
    padding: .3rem .9rem;
    border-radius: 6px;
    background: rgba($c-tan, .6);
    font-size: .75rem;
  }
}
</style>
