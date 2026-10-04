<script setup>
import { ref } from 'vue'
const email = ref(''), done = ref(false)
const submit = () => { if (!email.value) return; /* TODO: POST to newsletter API */ done.value = true; email.value = '' }
</script>
<template>
  <section class="join">
    <h2 class="join__title">Come in, stay a while</h2>
    <h3 class="join__sub">Join our community</h3>
    <p>Be the first one to know about our limited editions and special offers.</p>
    <form class="join__form" @submit.prevent="submit">
      <i class="bi bi-envelope-fill" />
      <input v-model="email" type="email" placeholder="type your email..." aria-label="Email address" required />
      <button type="submit">Submit</button>
    </form>
    <p v-if="done" class="join__ok" role="status">Thanks, you're on the list.</p>
  </section>
</template>
<style lang="scss" scoped>
.join {
  text-align: center;
  color: $c-cream;
  padding: 5rem $gutter 2rem;

  &__title {
    @include display-heading(4rem);
    text-transform: capitalize;
    font-weight: 400;
  }

  &__sub {
    @include display-heading(2.4rem);
    margin: 3.5rem 0 .6rem;
    text-transform: capitalize;
    font-weight: 400;
  }

  &__form {
    display: flex;
    align-items: center;
    gap: .8rem;
    max-width: 860px;
    margin: 1.8rem auto 0;
    padding: .4rem .4rem .4rem 1.2rem;
    background: $c-white;
    border-radius: $radius-sm;
    color: $c-ink;

    i{
      font-size: 22px;
    }

    input {
      flex: 1;
      border: 0;
      outline: 0;
      font: italic .8rem $font-body;
      min-width: 0;
    }

    button {
      padding: .7rem 2.2rem;
      background: $c-tan;
      color: $c-white;
      border-radius: 6px;
      font-size: 1.3rem;
      text-transform: uppercase;
    }
  }

  &__ok {
    margin-top: 1rem;
    color: $c-tan;
  }
}
</style>
