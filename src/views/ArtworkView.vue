<script setup>
import { computed } from "vue";
import { useArtStore } from "@/stores/artStore";
import BaseButton from "@/components/common/BaseButton.vue";
import StatusBadge from "@/components/common/StatusBadge.vue";
import ArtCarousel from "@/components/common/ArtCarousel.vue";
import ArtworkGallery from "@/components/art/ArtworkGallery.vue";
import ArtworkCard from "@/components/art/ArtworkCard.vue";
import ArtistProfile from "@/components/art/ArtistProfile.vue";

const props = defineProps({ id: { type: String, required: true } });
const store = useArtStore();
const artwork = computed(() => store.artworkById(props.id));
const artist = computed(() => artwork.value && store.artistBySlug(artwork.value.artist));
const siblings = computed(() => store.artworksByExhibition(artwork.value.exhibition));
const others = computed(() => siblings.value.filter((a) => a.id !== props.id));
const images = computed(() =>
  (artwork.value.gallery ?? [artwork.value.image]).map((src, i) => ({
    id: `${artwork.value.id}-${i}`,
    src,
    alt: artwork.value.title,
  }))
);
const specs = computed(() =>
  [
    ["Year", artwork.value.year],
    ["Medium", artwork.value.medium],
    ["Dimension framed", artwork.value.framedSize],
    ["Dimension unframed", artwork.value.unframedSize],
  ].filter(([, v]) => v)
);
const spotlight = computed(
  () => others.value.find((a) => a.id === "little-owl") ?? others.value[0]
);
</script>
<template>
  <div v-if="artwork" class="page">
    <div class="container">
      <p class="crumbs">
        <RouterLink :to="{ name: 'exhibitions' }"><b>Art at Dee</b></RouterLink><span />
        <b>{{ artist?.name }}</b>
      </p>
      <div class="detail">
        <ArtworkGallery :images="images" />
        <div class="detail__info">
          <StatusBadge :status="artwork.status" />
          <h1>{{ artwork.title }}</h1>
          <p class="detail__desc">{{ artwork.description }}</p>
          <dl class="specs">
            <template v-for="[k, v] in specs" :key="k">
              <dt>
                <b>{{ k }}</b>
              </dt>
              <dd>{{ v }}</dd>
            </template>
          </dl>
          <div class="price">
            <div>
              <span><b>Framed</b></span><strong>{{ artwork.priceFramed }}</strong>
            </div>
            <div v-if="artwork.priceUnframed">
              <span><b>Unframed</b></span><strong>{{ artwork.priceUnframed }}</strong>
            </div>
          </div>
          <BaseButton href="mailto:hello@deecafe.com?subject=Enquiry: " class="enquire">Enquire about this artwork
          </BaseButton>
          <p class="share">
            <img src="/images/arrow.png" alt="" style="object-fit: contain; width: 15px" />
            <b> Share this artwork:</b>
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook" /></a><a href="#" aria-label="Pinterest"><i
                class="bi bi-pinterest" /></a><a href="#" aria-label="X"><i class="bi bi-twitter-x" /></a>
          </p>
        </div>
      </div>
    </div>

    <section class="section container">
      <div class="artist">
        <ArtistProfile :artist="artist" layout="compact">
          <template #actions>
            <BaseButton :to="{ name: 'artist', params: { slug: artist.slug } }">View artist &amp; exhibition
            </BaseButton>
          </template>
        </ArtistProfile>
        <img v-if="spotlight" src="/images/fixLittle-Owl1.jpg" alt="spotlight.title" class="artist__img" />
      </div>
    </section>

    <section class="section container">
      <h2 class="section-title">More from the exhibition</h2>
      <p class="section-sub">Explore more artworks by {{ artist?.name }}</p>
      <ArtCarousel :items="others">
        <template #default="{ item }">
          <ArtworkCard :artwork="item" variant="detail" />
        </template>
      </ArtCarousel>
      <div class="all">
        <BaseButton :to="{ name: 'artist', params: { slug: artist.slug } }">View all works</BaseButton>
      </div>
    </section>
  </div>
  <p v-else class="container section">
    We couldn't find that artwork.
    <RouterLink :to="{ name: 'exhibitions' }">Back to exhibitions</RouterLink>
  </p>
</template>
<style lang="scss" scoped>
.page {
  padding-top: 9rem;
  background: $c-cream-warm;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 5%;
    right: 0;
    width: 100px;
    height: 230px;
    background-image: url(/images/afterleaf.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

@include down(sm) {
  .page {
    &::before {
      content: none
    }

    .detail{
      display: block;
    }
  }

  .gallery__main {
    height: 380px;
  }
}

.crumbs {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;

  span {
    display: inline-block;
    width: 2rem;
    border-top: 2px solid #c98a4b;
    vertical-align: middle;
    margin: 0 0.5rem;
  }
}

.detail {
  display: grid;
  gap: 3rem;

  @include up(lg) {
    grid-template-columns: 5fr 6fr;
  }

  &__info {
    display: grid;
    align-content: start;
    justify-items: start;
    gap: 1rem;
    padding: 0px 30px;

    @include down(lg) {
      padding: 0px 10px;;
  }

    h1 {
      @include display-heading(3.6rem);
      text-transform: capitalize;
      font-weight: 400;
    }
  }

  &__desc {
    color: $c-muted;
    font-size: 0.9rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba($c-ink, 0.15);
    max-width: 30rem;
  }
}

.specs {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.2rem 4rem;
  margin: 0;
  font-size: 0.85rem;

  dt {
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  dd {
    margin: 0;
    color: $c-muted;
  }
}

.price {
  display: flex;
  gap: 2.5rem;
  padding: 1.2rem 2rem;
  border-radius: $radius-md;
  background: rgba($c-tan, 0.3);

  div+div {
    padding-left: 2.5rem;
    border-left: 1px solid rgba($c-ink, 0.2);
  }

  span {
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  strong {
    font: 400 2.4rem $font-display;
  }
}

.share {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  text-transform: uppercase;

  a {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: $c-olive;
    color: $c-white;
    @include flex-center;
  }
}

.artist {
  display: grid;
  gap: 3rem;
  align-items: center;

  @include up(lg) {
    grid-template-columns: 1fr 1.2fr;
  }

  &__img {
    width: 100%;
    padding: 2rem;
    background: $c-white;
    border-radius: $radius-lg;
    max-height: 520px;
    object-fit: contain;
  }
}

.all {
  text-align: center;
  margin-top: 2rem;
}

:deep(.dyn_cls) {
  margin-top: 20px;

  .profile__link:first-child {
    margin-right: 10px;
    background-color: #5a3d1c;
    color: #fff;
  }
}

:deep(.badge) {
  background-image: url("/images/avlal_bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border-radius: unset;
}
</style>
