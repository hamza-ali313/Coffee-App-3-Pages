const S = 'suzanne-lycett'
const base =
  { artist: S, exhibition: 'on-the-riverbank', 
  year: 2026, status: 'available', unframedSize: '', priceUnframed: '', description: '' }
export const artworks = [
  {
    ...base, id: 'on-the-riverbank', title: 'On the Riverbank', category: 'Birds', 
    medium: 'Graphite on paper', framedSize: '52 x 69 cm', unframedSize: '42 x 59 cm',
    priceFramed: '£1.2K', priceUnframed: '£950', image: '/images/On-The-Riverbank.jpg', 
    gallery: ['/images/On-The-Riverbank.jpg','/images/moreexhi1_03.jpg', '/images/moreexhi2_03.jpg', '/images/moreexhi3_03.jpg'],
    description: 'A flash of turquoise and the shimmer of iridescent wings. The kingfisher and the damselfly are two of the most beautiful sights along the river. Such a treat to see them in Richmond Park at this time of year.'
  },
  { ...base, id: 'red-fox', title: 'Red Squirrel', category: 'Mammals', medium: 'Graphite on paper', framedSize: '30 x 40 cm', priceFramed: '£1,400', image: '/images/moreexhi1_03.jpg' },
  { ...base, id: 'vixen', title: 'Vixen', category: 'Mammals', medium: 'Pencil on drafting film', priceFramed: '£350', image: '/images/exhi4_03.jpg' },
  { ...base, id: 'little-owl', title: 'Little Owl', category: 'Birds', medium: 'Limited edition giclée print', priceFramed: '£150', priceUnframed: '£60', image: '/images/moreexhi3_03.jpg' },
  { ...base, id: 'barn-owl', title: 'Barn Owl', category: 'Birds', medium: 'Graphite on paper', framedSize: '40 x 50 cm', priceFramed: '£1,200', image: '/images/moreexhi2_03.jpg' },
  { ...base, id: 'red-squirrel', title: 'Red Fox', category: 'Mammals', medium: 'Pencil on drafting film', priceFramed: '£370', image: '/images/moreexhi3_03.jpg' }

]
