// Single data-access layer: swap these bodies for fetch()/axios when an API exists.
import { artists } from '@/data/artists'
import { artworks } from '@/data/artworks'
import { exhibitions } from '@/data/exhibitions'
// import { galleries } from '@/data/galleries'          // ← NEW import

const respond = (data) => new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), 100))

export const artService = {
  getArtists: () => respond(artists),
  getArtworks: () => respond(artworks),
  getExhibitions: () => respond(exhibitions),
  // getGalleries: () => respond(galleries)
}
