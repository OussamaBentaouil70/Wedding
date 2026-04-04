/**
 * Local image imports for Events page — JSON cannot bundle Vite assets.
 * Keys match `imgKey` / `heroImageKeys` in `events.json`.
 */
import {
  birthdayPrivateImages,
  corporateEventImages,
  evjfBachelorImages,
  festivalImages,
  retreatImages,
} from "./imageCollections";

const first = (images: string[], index: number): string =>
  images[index] ?? images[0] ?? "";

export const EVENTS_ASSETS = {
  corporate: first(corporateEventImages, 0),
  birthday: first(birthdayPrivateImages, 0),
  bachelor: first(evjfBachelorImages, 0),
  editorial: first(retreatImages, 0),
  festivals: first(festivalImages, 0),
  retreats: first(retreatImages, 1),
  sahara: first(retreatImages, 2),
  imperialCity: first(corporateEventImages, 1),
} as const;

export type EventsAssetKey = keyof typeof EVENTS_ASSETS;

export function resolveEventsImage(key: string): string {
  const k = key as EventsAssetKey;
  if (k in EVENTS_ASSETS) return EVENTS_ASSETS[k];
  console.warn(`Unknown events image key: ${key}`);
  return "";
}
