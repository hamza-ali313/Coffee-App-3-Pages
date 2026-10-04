<script setup>
defineProps({ to: [String, Object], href: String, variant: { type: String, default: 'dark' } })
</script>
<template>
  <component :is="to ? 'RouterLink' : href ? 'a' : 'button'" :to="to" :href="href" :class="['btn', `btn--${variant}`]">
    <slot />
  </component>
</template>
<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  padding: .85rem 1.6rem;
  border-radius: $radius-sm;
  font-weight: 500;
  text-transform: uppercase;
  transition: background .2s;
  @include focus-ring;

  &--dark {
    background: $c-olive;
    color: $c-white;

    &:hover {
      background: darken($c-olive, 8%);
    }
  }

  &--tan {
    background: $c-tan;
    color: $c-white;

    &:hover {
      background: darken($c-tan, 6%);
    }
  }
}
</style>
