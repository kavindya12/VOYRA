import { pexelsPhoto } from '../utils/galleryUrls'

/** Default gallery URLs per tour slug (Pexels CDN - reliable hotlinking). */
export const TOUR_GALLERY_BY_SLUG = {
  'bali-escape': [
    pexelsPhoto(2166553),
    pexelsPhoto(1450360),
    pexelsPhoto(1029604),
    pexelsPhoto(2387870),
    pexelsPhoto(325964),
  ],
  'maldives-luxury': [
    pexelsPhoto(1287460),
    pexelsPhoto(1174732),
    pexelsPhoto(1450353),
    pexelsPhoto(457878),
    pexelsPhoto(3752196),
  ],
  'ella-adventure': [
    '/images/ella-adventure.png',
    pexelsPhoto(3601425),
    pexelsPhoto(358358),
    pexelsPhoto(4669224),
    pexelsPhoto(1433059),
    pexelsPhoto(1437604),
  ],
  'swiss-alps-journey': [
    '/images/swiss-alps-journey.png',
    pexelsPhoto(2662096),
    pexelsPhoto(1770803),
    pexelsPhoto(1533708),
    pexelsPhoto(417074),
    pexelsPhoto(315566),
  ],
  'kyoto-heritage': [
    '/images/kyoto-heritage.png',
    pexelsPhoto(4020284),
    pexelsPhoto(2504500),
    pexelsPhoto(349447),
    pexelsPhoto(1443890),
    pexelsPhoto(1025392),
  ],
  'santorini-sunset': [
    pexelsPhoto(1010657),
    pexelsPhoto(457878),
    pexelsPhoto(3607263),
    pexelsPhoto(1025392),
    pexelsPhoto(315566),
  ],
}

export function getDefaultGalleryForTour(tour) {
  const slug = tour?.slug || tour?.id
  const fromSlug = TOUR_GALLERY_BY_SLUG[slug]
  if (fromSlug?.length) return fromSlug

  return tour?.image ? [tour.image] : []
}
