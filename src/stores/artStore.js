import { defineStore } from 'pinia'
import { artService } from '@/services/artService'

export const useArtStore = defineStore('art', {
  state: () => ({
    artists: [], artworks: [], exhibitions: [],
    loaded: false, loading: false, error: null,
    filters: { artist: '', year: '', category: '' }
  }),
  getters: {
    artistBySlug: (s) => (slug) => s.artists.find((a) => a.slug === slug),
    artworkById: (s) => (id) => s.artworks.find((a) => a.id === id),
    artworksByExhibition: (s) => (slug) => s.artworks.filter((a) => a.exhibition === slug),
    filterOptions: (s) => ({
      artist: s.artists.map((a) => ({ value: a.slug, label: a.name })),
      year: [...new Set(s.exhibitions.map((e) => e.year))].sort((a, b) => b - a).map((y) => ({ value: y, label: String(y) })),
      category: [...new Set(s.exhibitions.map((e) => e.category))].map((c) => ({ value: c, label: c }))
    }),
    filteredExhibitions(s) {
      const { artist, year, category } = s.filters
      return s.exhibitions.filter((e) => (!artist || e.artist === artist) && (!year || e.year === Number(year)) && (!category || e.category === category))
    },
    currentExhibition() { return this.filteredExhibitions.find((e) => e.status === 'current') },
    pastExhibitions() { return this.filteredExhibitions.filter((e) => e.status === 'past') }
  },
  actions: {
    async init() {
      if (this.loaded || this.loading) return
      this.loading = true
      try {
        const [artists, artworks, exhibitions ] = await Promise.all([artService.getArtists(), artService.getArtworks(), artService.getExhibitions()])
        Object.assign(this, { artists, artworks, exhibitions, loaded: true })
      } catch { this.error = 'We could not load the gallery. Please refresh the page.' }
      finally { this.loading = false }
    },
    setFilter(key, value) { this.filters[key] = value }
  }
})
