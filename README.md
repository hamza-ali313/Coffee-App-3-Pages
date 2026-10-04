# Art at Dee (Vue 3 + SCSS)

    npm install && npm run dev

Routes: `/art/artist/suzanne-lycett` · `/art/exhibitions` · `/art/artwork/on-the-riverbank`
Put images in `public/images/` (file names are referenced in `src/data/*.js`).

Data flow: `data/*.js` → `services/artService` → Pinia `artStore` → views → components (props down, events up).
SCSS: tokens/mixins in `styles/abstracts` are auto-injected into every `<style lang="scss">` via `vite.config.js`.
