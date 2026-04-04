type ImageModuleMap = Record<string, string>;

function sortImportedImages(modules: ImageModuleMap): string[] {
  return Object.entries(modules)
    .sort(([pathA], [pathB]) => {
      const fileA = pathA.split("/").pop() ?? pathA;
      const fileB = pathB.split("/").pop() ?? pathB;
      const numericA = fileA.match(/^(\d+)/);
      const numericB = fileB.match(/^(\d+)/);

      if (numericA && numericB) {
        return Number(numericA[1]) - Number(numericB[1]);
      }

      if (numericA) return -1;
      if (numericB) return 1;

      return fileA.localeCompare(fileB, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    })
    .map(([, src]) => src);
}

const birthdayPrivateModules = import.meta.glob(
  "../assets/images/Birthday & Private events/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as ImageModuleMap;

const corporateEventModules = import.meta.glob(
  "../assets/images/Corporate Events/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as ImageModuleMap;

const evjfBachelorModules = import.meta.glob(
  "../assets/images/EVJF - Bachelor Party/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as ImageModuleMap;

const festivalModules = import.meta.glob(
  "../assets/images/Festivals/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as ImageModuleMap;

const retreatModules = import.meta.glob(
  "../assets/images/Retreats/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as ImageModuleMap;

const weddingModules = import.meta.glob(
  "../assets/images/Weddings/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as ImageModuleMap;

export const birthdayPrivateImages = sortImportedImages(birthdayPrivateModules);
export const corporateEventImages = sortImportedImages(corporateEventModules);
export const evjfBachelorImages = sortImportedImages(evjfBachelorModules);
export const festivalImages = sortImportedImages(festivalModules);
export const retreatImages = sortImportedImages(retreatModules);
export const weddingImages = sortImportedImages(weddingModules);

export const eventsHeroImages = [
  new URL("../assets/images/events/festivals.jpg", import.meta.url).href,
  new URL("../assets/images/Corporate Events/4.jpg", import.meta.url).href,
  new URL("../assets/images/Corporate Events/10.jpg", import.meta.url).href,
  new URL("../assets/images/Corporate Events/17.jpg", import.meta.url).href,
];

export const galleryCollections = [
  {
    title: "Birthday & Private Events",
    subtitle: "Milestones, intimate dinners, and celebratory moments.",
    images: birthdayPrivateImages,
  },
  {
    title: "EVJF - Bachelor Party",
    subtitle: "Pre-wedding celebrations with a playful, polished feel.",
    images: evjfBachelorImages,
  },
  {
    title: "Festivals",
    subtitle: "Energetic celebrations, live moments, and vibrant atmospheres.",
    images: festivalImages,
  },
  {
    title: "Retreats",
    subtitle: "Wellness, escape, and slower luxury experiences.",
    images: retreatImages,
  },
  {
    title: "Corporate Events",
    subtitle: "Executive gatherings, launches, and brand experiences.",
    images: corporateEventImages,
  },
  {
    title: "Weddings",
    subtitle: "Ceremonies, receptions, and editorial wedding imagery.",
    images: weddingImages,
  },
] as const;
