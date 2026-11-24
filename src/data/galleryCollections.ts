// Gallery collections for the Portugal site (duplicate photos removed; each photo appears once).
// Titles and subtitles come from the locale files: gallery_page.collections.<key>.
const modules = import.meta.glob("../assets/images/portugal/*/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" }) as Record<string, string>;
const pick = (paths: string[]) => paths.map((p) => modules[`../assets/images/portugal/${p}`]).filter(Boolean);

export const galleryCollections = [
  { key: "weddings", images: pick(["weddings/algarve-coast-weddings.jpg", "weddings/atlantic-romance.jpg", "weddings/bohemian-elegance.jpg", "weddings/candlelit-coastal-dinners.jpg", "weddings/golden-sunset-ceremonies.jpg", "weddings/immersive-coastal-mood.jpg", "weddings/jewish-wedding.jpg", "weddings/kerala-wedding.jpg", "weddings/luxury-coastal-estates.jpg", "weddings/neutral-luxe-styling.jpg", "weddings/wedding-in-lisbon.jpg", "home/lisbon-weddings.jpg", "home/coastal-weddings.jpg", "home/coastal-estate-weddings.jpg", "home/wedding-details-home-page.jpg", "home/wedding-garden-home-page.jpg", "home/who-we-are.jpg"]) },
  { key: "venues", images: pick(["venues/beachfront-venues.jpg", "venues/elegant-country-estates.jpg", "venues/historic-palaces-quintas.jpg", "venues/luxury-hotels-resorts.jpg", "venues/mountain-retreats.jpg", "venues/palaces-gardens.jpg", "venues/plan-with-clarity.jpg", "venues/private-villas-estates.jpg"]) },
  { key: "elopements", images: pick(["elopement/intimate-celebration.jpg", "elopement/meaningful-details.jpg", "elopement/plan-your-wedding.jpg", "elopement/private-rooftop-moments.jpg", "elopement/quiet-garden-corner.jpg"]) },
  { key: "indian", images: pick(["indian-wedding/elegant-courtyards.jpg", "indian-wedding/grand-villas.jpg", "indian-wedding/multi-day-celebration-spaces.jpg", "indian-wedding/other-images-2.jpg", "indian-wedding/other-images.jpg", "indian-wedding/reception-gardens.jpg"]) },
  { key: "jewish", images: pick(["jewish-wedding/heritage-style.jpg", "jewish-wedding/historic-palaces-and-private-quintas.jpg", "jewish-wedding/other-images.jpg", "jewish-wedding/other-images2.jpg", "jewish-wedding/traditional-rituals.jpg"]) },
  { key: "events", images: pick(["home/welcome-dinner.jpg", "home/engagement-celebrations.jpg", "home/private-parties.jpg", "home/corporate-brand-events.jpg"]) },
  { key: "catering", images: pick(["catering/bespoke-fine-dining.jpg", "catering/catering-for-every-moment.jpg", "catering/indian-wedding-catering.jpg", "catering/international-wedding-catering.jpg", "catering/italian-wedding-catering.jpg", "catering/moroccan-wedding-catering.jpg", "catering/other-images.jpg", "catering/other-images2.jpg", "catering/other-images3.jpg", "catering/portuguese-wedding-catering.jpg"]) },
] as const;
