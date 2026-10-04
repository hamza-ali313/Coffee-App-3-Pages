<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ images: { type: Array, required: true } })
const active = ref(0)
watch(() => props.images, () => (active.value = 0))
</script>
<template>
  <div class="gallery">
    <div class="gallery__main"><img :src="images[active].src" :alt="images[active].alt" /></div>
    <ul class="gallery__thumbs">
      <li v-for="(img, i) in images.slice(0, 4)" :key="img.id">
        <button :class="{ on: i === active }" :aria-label="`Show ${img.alt}`" @click="active = i"><img :src="img.src"
            :alt="img.alt" /></button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  &__main {
    background: #ffffff;
    border-radius: 16px;
    height: 530px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__thumbs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: .8rem;
    margin-top: .8rem;

    button {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      padding: 0;

      &.on {
        border: 1px solid $c-orange;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
