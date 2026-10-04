<script setup>
import NewsletterSignup from './NewsletterSignup.vue'
const explore = ['Menu', 'Whats On', 'Our Story', 'Our Local Community']
const quick = ['Contact us', 'Art at Dee', 'Blog', 'Shop', 'Locations', "FAQ's", 'Careers']
</script>
<template>
  <footer class="footer">
    <NewsletterSignup />
    <div class="container footer__grid">
      <div class="footer__brand">
        <span><img src="/images/footlogo.png" alt="" class="foot-logo"></span>
        <p>A neighbourhood café offering high-quality coffee, fresh and brunch in a calm, nature-inspired setting.</p>
        <div class="footer__social">
          <a href="#" aria-label="Facebook"><i class="bi bi-facebook" /></a>
          <a href="#" aria-label="Instagram"><i class="bi bi-instagram" /></a>
          <a href="#" aria-label="YouTube"><i class="bi bi-youtube" /></a>
        </div>
      </div>
      <nav aria-label="Explore">
        <h4>Explore</h4>
        <ul>
          <li v-for="l in explore" :key="l"><a href="#">{{ l }}</a></li>
        </ul>
      </nav>
      <nav aria-label="Quick links">
        <h4>Quick Links</h4>
        <ul>
          <li v-for="l in quick" :key="l"><a href="#">{{ l }}</a></li>
        </ul>
      </nav>
    </div>
    <div class="container footer__legal">
      <span>© 2026 Dee Café. Made with care for our community</span>
      <span><a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms &amp; Conditions</a></span>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  background: $c-forest;
  color: $c-cream;
  font-size: .85rem;

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
    padding-block: 3rem;

    @include down(md) {
      grid-template-columns: 1fr;
    }
  }

  &__brand p {
    max-width: 26rem;
    margin: 1rem 0;
  }

  &__logo {
    display: inline-grid;
    place-items: center;
    width: 4.5rem;
    height: 4.5rem;
    border: 2px solid $c-cream;
    border-radius: 50%;
    font: italic 1.8rem cursive;
  }

  &__social {
    display: flex;
    gap: .8rem;

    a {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
      background: rgba($c-cream, .85);
      color: $c-tan;
      @include flex-center;
    }
  }

  h4 {
    font: 500 1.4rem $font-display;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  li {
    margin-bottom: .55rem;
  }

  &__legal {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-block: 1.8rem;
    border-top: 1px solid rgba($c-cream, .15);
  }
}

.foot-logo {
  width: 120px;
}
</style>
