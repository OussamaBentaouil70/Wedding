/**
 * Local image imports for Events page — JSON cannot bundle Vite assets.
 * Keys match `imgKey` / `heroImageKeys` in `events.json`.
 */
import corporate from '../assets/images/events/corporate.jpg';
import birthday from '../assets/images/events/birthday.jpg';
import bachelor from '../assets/images/events/bachelor.jpg';
import editorial from '../assets/images/events/editorial.jpg';
import festivals from '../assets/images/events/festivals.jpg';
import retreats from '../assets/images/events/retreats.jpg';
import sahara from '../assets/images/gallery/sahara.jpg';
import imperialCity from '../assets/images/gallery/imperial-city.jpg';

export const EVENTS_ASSETS = {
  corporate,
  birthday,
  bachelor,
  editorial,
  festivals,
  retreats,
  sahara,
  imperialCity,
} as const;

export type EventsAssetKey = keyof typeof EVENTS_ASSETS;

export function resolveEventsImage(key: string): string {
  const k = key as EventsAssetKey;
  if (k in EVENTS_ASSETS) return EVENTS_ASSETS[k];
  console.warn(`Unknown events image key: ${key}`);
  return '';
}
