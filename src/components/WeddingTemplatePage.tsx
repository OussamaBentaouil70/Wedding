import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHero from './PageHero';
import ReservationForm from './ReservationForm';
import { resolveJsonImageSrc } from '../utils/imageResolver';
import {
  agafayDesertWeddingImages,
  elopementWeddingImages,
  keralaWeddingImages,
  jewishWeddingImages,
} from '../data/imageCollections';

type SectionCopy = {
  label: string;
  title: string;
  subtitle: string;
};

type WeddingPageConfig = {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    defaultService: string;
  };
  heroImages?: string[];
  weddingTypesSection?: SectionCopy;
  servicesSection: SectionCopy;
  services: Array<{ title: string; desc: string }>;
  venuesSection: SectionCopy;
  venues: Array<{ title: string; img: string; desc?: string; highlights?: string[] }>;
  editorial?: {
    label: string;
    title: string;
    body: string;
    imageUrl: string;
    imageAlt: string;
    details?: string[];
  };
  themesSection: SectionCopy;
  themes: Array<{ title: string; img: string }>;
  serviceShowcaseSection?: SectionCopy;
  serviceShowcase?: Array<{ title: string; img: string; desc?: string; highlights?: string[] }>;
  ctaSection: SectionCopy;
  includedSection?: { title: string; subtitle: string };
  included?: Array<{ title: string; desc: string }>;
  faqSection?: { label: string; title: string };
  faqs?: Array<{ q: string; a: string }>;
  ui: {
    details: string;
    close: string;
    venue_experience: string;
    start_planning: string;
    continue: string;
    plan_wedding: string;
    discover_type: string;
  };
};

const weddingPageConfigs: Record<string, WeddingPageConfig> = {
  'wedding_page': {
    hero: {
      label: 'Weddings in Morocco',
      title: 'Bespoke Weddings in Morocco',
      subtitle: 'From intimate ceremonies to multi-day celebrations, we design weddings that balance beauty, emotion, and flawless coordination.',
      defaultService: 'Wedding',
    },
    heroImages: ['src/assets/images/Weddings/1.jpg', 'src/assets/images/Weddings/2.jpg', 'src/assets/images/Weddings/3.jpg'],
    weddingTypesSection: {
      label: 'Wedding Types',
      title: 'Types of Weddings We Create',
      subtitle: 'Explore each celebration style and discover the experience that fits your vision.',
    },
    servicesSection: {
      label: 'What We Offer',
      title: 'Our Wedding Services',
      subtitle: 'Tailored excellence for every step of your journey.',
    },
    services: [
      { title: 'Full Wedding Planning', desc: 'Comprehensive management from concept to the final dance, ensuring every detail is perfectly realized.' },
      { title: 'Wedding Design & Styling', desc: 'Creating a cohesive visual narrative through floral design, lighting, and bespoke decor.' },
      { title: 'Destination Wedding Coordination', desc: 'Expert logistics for couples traveling to Morocco, managing travel, venues, and local vendors.' },
      { title: 'Elopements & Intimate Weddings', desc: 'Curating deeply personal and breathtaking ceremonies for smaller, more private celebrations.' },
      { title: 'Multi-Day Wedding Weekends', desc: 'Designing a full journey for your guests, from welcome dinners to farewell brunches.' },
      { title: 'Cultural & Fusion Weddings', desc: 'Respectfully blending traditions and cultures into a unique and harmonious celebration.' },
    ],
    venuesSection: {
      label: 'Where We Celebrate',
      title: "Celebrate in Morocco's Most Extraordinary Settings",
      subtitle: 'From the hidden riads of the Medina to the majestic expanse of the Sahara.',
    },
    venues: [
      { title: 'Luxury Riads', img: 'src/assets/images/Weddings/8.jpg', desc: 'Hidden behind carved doors, Marrakech riads offer intimate courtyards, candlelit dinners, and a sense of cinematic privacy.', highlights: ['Medina courtyards & rooftop moments', 'Ideal for intimate to mid-size celebrations', 'Perfect for welcome dinners & brunches'] },
      { title: 'Private Villas & Estates', img: 'src/assets/images/Weddings/22.jpg', desc: 'A private residence feel with elevated hospitality — space for multi-day hosting, poolside gatherings, and relaxed luxury.', highlights: ['Multi-day wedding weekends', 'On-site accommodation for guests', 'Flexible layouts for ceremony + reception'] },
      { title: 'Palaces & Gardens', img: 'src/assets/images/Weddings/31.jpg', desc: 'Grand architecture, heritage details, and lush gardens for couples who want a statement-making, regal celebration.', highlights: ['High-impact ceremony backdrops', 'Large guest capacity options', 'Ideal for formal receptions & live entertainment'] },
      { title: 'Desert Camps', img: 'src/assets/images/Weddings/4.jpg', desc: 'A sunset ceremony, lantern-lit dining, and music under the stars — the Sahara is Morocco at its most unforgettable.', highlights: ['Sunset ceremonies & stargazing dinners', 'Immersive guest experience', 'Perfect for elopements or bold weekend events'] },
      { title: 'Beachfront Venues', img: 'src/assets/images/Weddings/21.jpg', desc: 'Ocean air, golden light, and relaxed sophistication — coastal venues bring effortless romance with refined styling.', highlights: ['Golden-hour ceremonies', 'Laid-back luxury atmosphere', 'Great for guest excursions & seaside brunches'] },
    ],
    editorial: {
      label: 'Our Philosophy',
      title: 'Artistry In Every Detail',
      body: 'We believe a wedding should be a sensory experience. Our editorial approach to design ensures that every element — from the scent of the flowers to the transition of the lighting — contributes to a cohesive and breathtaking narrative. We curate the entire guest journey with a focus on high-end entertainment and immersive tablescapes.',
      imageUrl: 'src/assets/images/Weddings/9.jpg',
      imageAlt: 'Wedding design philosophy',
      details: ['Custom Flowers', 'Atmospheric Lighting', 'Bespoke Tablescapes', 'Curated Entertainment', 'Guest Journey Management', 'Ceremony Styling'],
    },
    themesSection: {
      label: 'Inspiration',
      title: 'Wedding Themes & Inspiration',
      subtitle: "Discover themes that resonate with Morocco's soul and your personal style.",
    },
    themes: [
      { title: 'Moroccan Royal Elegance', img: 'src/assets/images/Weddings/10.jpg' },
      { title: 'Modern Minimal Romance', img: 'src/assets/images/Weddings/11.jpg' },
      { title: 'Desert Sunset Celebration', img: 'src/assets/images/Weddings/12.jpg' },
      { title: 'Garden Wedding in Bloom', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'White & Gold Sophistication', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Beldi Chic Reimagined', img: 'src/assets/images/Weddings/15.jpg' },
    ],
    serviceShowcaseSection: {
      label: 'Services',
      title: 'Our Services',
      subtitle: 'Essential wedding services delivered with style, precision, and seamless coordination.',
    },
    serviceShowcase: [
      {
        title: 'Transportation',
        img: 'src/assets/images/Weddings/Services/transportation.jpg',
        desc: 'Private transfers and guest transport management designed to keep every movement smooth and stress-free.',
        highlights: ['Airport and hotel transfers', 'Ceremony and reception shuttles', 'Luxury vehicle coordination'],
      },
      {
        title: 'DJ',
        img: 'src/assets/images/Weddings/Services/DJ.jpg',
        desc: 'Music direction and live atmosphere management to shape the perfect emotional flow from cocktail hour to last dance.',
        highlights: ['Curated music programming', 'Sound setup coordination', 'Dance-floor experience design'],
      },
      {
        title: 'Catering',
        img: 'src/assets/images/Weddings/Services/catering wedding.jpg',
        desc: 'Refined culinary experiences tailored to your guests, celebration style, and the rhythm of your wedding day.',
        highlights: ['Custom menu planning', 'Tasting and service flow', 'Dietary and guest preference support'],
      },
      {
        title: 'Make Up',
        img: 'src/assets/images/Weddings/Services/make up.jpg',
        desc: 'Professional beauty services for the bride and bridal party, timed precisely for a calm and camera-ready preparation.',
        highlights: ['Bride and bridal party beauty', 'Trial session coordination', 'On-site touch-up support'],
      },
      {
        title: 'Photography & Videography',
        img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80',
        desc: 'Editorial coverage that captures every key emotion and detail, from preparations to the final celebration moments.',
        highlights: ['Photo and video team coordination', 'Timeline-aligned coverage', 'Cinematic highlight storytelling'],
      },
    ],
    includedSection: {
      title: 'The Full Planning Scope',
      subtitle: 'A comprehensive approach to your celebration.',
    },
    included: [
      { title: 'Concept development', desc: 'Developing a unique visual and experiential concept that tells your story.' },
      { title: 'Venue sourcing', desc: "Curating a list of Morocco's most extraordinary settings for your celebration." },
      { title: 'Budget guidance', desc: 'Strategic planning and transparent management of your wedding investment.' },
      { title: 'Vendor selection and management', desc: 'Connecting you with the most talented local and international creative partners.' },
      { title: 'Design direction and moodboards', desc: 'Creation of detailed moodboards focusing on every visual element of your day.' },
      { title: 'Guest logistics and hospitality', desc: 'Managing hospitality, transport, and experiences for your traveling guests.' },
      { title: 'Ceremony and reception flow', desc: 'Designing the seamless choreography of your ceremony and reception.' },
      { title: 'On-the-day coordination', desc: 'Absolute peace of mind while we oversee every second of your celebration.' },
    ],
    faqSection: {
      label: 'FAQ',
      title: 'Frequently Asked Questions',
    },
    faqs: [
      { q: 'How far in advance should we start?', a: 'For destination weddings in Morocco, we recommend starting 10–12 months in advance to secure your preferred venue and top-tier vendors.' },
      { q: 'Do you work with international couples?', a: 'Yes, the majority of our clients are international couples. We are experts in handling remote planning and guest logistics.' },
      { q: 'Can you plan multicultural or symbolic ceremonies?', a: 'Absolutely. We specialise in fusion weddings and can assist with finding celebrants for symbolic, secular, or religious ceremonies.' },
      { q: 'Do you assist with guest experiences and accommodation?', a: 'Yes, we provide full hospitality management including accommodation booking, local tours, and transport for your guests.' },
    ],
    ctaSection: {
      label: 'Ready?',
      title: 'Plan Your Wedding',
      subtitle: "Let's start crafting your extraordinary celebration in Morocco today.",
    },
    ui: {
      details: 'details',
      close: 'Close',
      venue_experience: 'Venue Experience',
      start_planning: 'Start Planning',
      continue: 'Continue Browsing',
      plan_wedding: 'Plan Your Wedding',
      discover_type: 'Discover',
    },
  },
  'wedding_subpages.agafay': {
    hero: {
      label: 'Weddings in Morocco',
      title: 'Agafay Desert Weddings',
      subtitle: 'From intimate sunset ceremonies to immersive multi-day desert experiences, we design weddings in Agafay that combine natural beauty, exclusivity, and unforgettable moments.',
      defaultService: 'Wedding',
    },
    servicesSection: {
      label: 'What We Offer',
      title: 'Our Wedding Services',
      subtitle: 'Tailored excellence including desert camp setup, logistics, guest experience, and full event production in remote luxury settings.',
    },
    services: [
      { title: 'Desert Camp Setup', desc: 'Elegant layouts, atmospheric lighting, and refined structures built for the Agafay landscape.' },
      { title: 'Logistics & Guest Experience', desc: 'Transportation, timing, and hospitality details handled with precision in a remote setting.' },
      { title: 'Full Event Production', desc: 'Technical coordination, vendor management, and on-site delivery across every event moment.' },
      { title: 'Sunset Ceremonies', desc: 'Romantic vows shaped around golden light and panoramic desert views.' },
      { title: 'Multi-Day Desert Celebrations', desc: 'Welcome dinners, ceremony days, and farewell moments designed as one cohesive journey.' },
      { title: 'Luxury Styling', desc: 'Bohemian elegance, candlelight, and warm desert textures tailored to your vision.' },
    ],
    venuesSection: {
      label: 'Where We Celebrate',
      title: "Celebrate in Morocco's Most Extraordinary Settings",
      subtitle: 'From luxury desert camps to private setups under the stars, just outside Marrakech.',
    },
    venues: [
      { title: 'Luxury Desert Camps', img: 'src/assets/images/Weddings/4.jpg' },
      { title: 'Private Stargazing Setups', img: 'src/assets/images/Weddings/12.jpg' },
      { title: 'Golden Hour Ceremony Spaces', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Desert Dining Under the Stars', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Remote Luxury Retreats', img: 'src/assets/images/Weddings/15.jpg' },
    ],
    themesSection: {
      label: 'Inspiration',
      title: 'Wedding Themes & Inspiration',
      subtitle: 'Bohemian elegance, candlelit dinners, and golden sunset ceremonies in a unique desert atmosphere.',
    },
    themes: [
      { title: 'Bohemian Elegance', img: 'src/assets/images/Weddings/10.jpg' },
      { title: 'Candlelit Desert Dinners', img: 'src/assets/images/Weddings/11.jpg' },
      { title: 'Golden Sunset Ceremonies', img: 'src/assets/images/Weddings/12.jpg' },
      { title: 'Desert Romance', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Neutral Luxe Styling', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Immersive Desert Mood', img: 'src/assets/images/Weddings/15.jpg' },
    ],
    ctaSection: {
      label: 'Ready?',
      title: 'Plan Your Wedding',
      subtitle: "Let's craft your unforgettable desert wedding experience in Agafay.",
    },
    ui: {
      details: 'details',
      close: 'Close',
      venue_experience: 'Venue Experience',
      start_planning: 'Start Planning',
      continue: 'Continue Browsing',
      plan_wedding: 'Plan Your Wedding',
      discover_type: 'Discover',
    },
  },
  'wedding_subpages.elopement': {
    hero: {
      label: 'Bespoke Weddings in Morocco',
      title: 'Elopement Weddings in Morocco',
      subtitle: 'From intimate vows to romantic escapes, we design elopements that focus on emotion, privacy, and meaningful experiences in breathtaking Moroccan settings.',
      defaultService: 'Wedding',
    },
    servicesSection: {
      label: 'What We Offer',
      title: 'Our Wedding Services',
      subtitle: 'Tailored excellence including location scouting, styling, photography, and full coordination for intimate celebrations.',
    },
    services: [
      { title: 'Location Scouting', desc: 'Private riads, scenic desert landscapes, and hidden destinations matched to your story.' },
      { title: 'Intimate Ceremony Styling', desc: 'Minimal, romantic visuals that keep the focus on the moment itself.' },
      { title: 'Photography Coordination', desc: 'Natural light, cinematic framing, and memory-making details captured beautifully.' },
      { title: 'Full Coordination', desc: 'All logistics handled discreetly so the experience remains calm and effortless.' },
      { title: 'Celebration Planning', desc: 'Thoughtful touches for a private dinner, mini escape, or post-ceremony experience.' },
      { title: 'Meaningful Guest Moments', desc: 'Even for small celebrations, every detail is designed to feel intentional and elevated.' },
    ],
    venuesSection: {
      label: 'Where We Celebrate',
      title: "Celebrate in Morocco's Most Extraordinary Settings",
      subtitle: 'From secluded riads to desert landscapes and hidden gems across Morocco.',
    },
    venues: [
      { title: 'Secluded Riads', img: 'src/assets/images/Weddings/8.jpg' },
      { title: 'Hidden Desert Landscapes', img: 'src/assets/images/Weddings/4.jpg' },
      { title: 'Private Rooftop Moments', img: 'src/assets/images/Weddings/21.jpg' },
      { title: 'Quiet Garden Corners', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Off-the-Grid Luxury', img: 'src/assets/images/Weddings/15.jpg' },
    ],
    themesSection: {
      label: 'Inspiration',
      title: 'Wedding Themes & Inspiration',
      subtitle: 'Romantic minimalism, cinematic moments, and deeply personal experiences.',
    },
    themes: [
      { title: 'Romantic Minimalism', img: 'src/assets/images/Weddings/11.jpg' },
      { title: 'Cinematic Escape', img: 'src/assets/images/Weddings/12.jpg' },
      { title: 'Private Vows', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Quiet Luxury', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Intimate Celebration', img: 'src/assets/images/Weddings/15.jpg' },
      { title: 'Meaningful Details', img: 'src/assets/images/Weddings/10.jpg' },
    ],
    ctaSection: {
      label: 'Ready?',
      title: 'Plan Your Wedding',
      subtitle: "Let's create your intimate and unforgettable elopement in Morocco.",
    },
    ui: {
      details: 'details',
      close: 'Close',
      venue_experience: 'Venue Experience',
      start_planning: 'Start Planning',
      continue: 'Continue Browsing',
      plan_wedding: 'Plan Your Wedding',
      discover_type: 'Discover',
    },
  },
  'wedding_subpages.kerala': {
    hero: {
      label: 'Bespoke Weddings in Morocco',
      title: 'Kerala Wedding in Marrakech',
      subtitle: 'From vibrant traditional rituals to multi-day celebrations, we design Kerala weddings that respect cultural authenticity while elevating the experience in a luxury Moroccan setting.',
      defaultService: 'Wedding',
    },
    servicesSection: {
      label: 'What We Offer',
      title: 'Our Wedding Services',
      subtitle: 'Tailored excellence including traditional ceremony coordination, décor, catering (Indian cuisine), and guest experience.',
    },
    services: [
      { title: 'Traditional Ceremony Coordination', desc: 'Planning and sequencing that respects the rituals and structure of Kerala weddings.' },
      { title: 'Décor & Styling', desc: 'Color-rich floral design and layered styling that complements the ceremony and reception flow.' },
      { title: 'Indian Cuisine Catering', desc: 'Menu coordination with catering partners experienced in authentic Indian culinary experiences.' },
      { title: 'Guest Experience', desc: 'Hospitality, transfers, and schedule management for multi-day celebration weekends.' },
      { title: 'Multi-Day Production', desc: 'From welcome moments to ceremony and reception, every day is coherently planned.' },
      { title: 'Cultural Sensitivity', desc: 'Respectful planning that balances Kerala traditions with the Marrakech setting.' },
    ],
    venuesSection: {
      label: 'Where We Celebrate',
      title: "Celebrate in Morocco's Most Extraordinary Settings",
      subtitle: 'From grand villas to elegant venues adapted for multi-day Indian celebrations.',
    },
    venues: [
      { title: 'Grand Villas', img: 'src/assets/images/Weddings/22.jpg' },
      { title: 'Elegant Courtyards', img: 'src/assets/images/Weddings/31.jpg' },
      { title: 'Reception Gardens', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Multi-Day Celebration Spaces', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Luxury Moroccan Venues', img: 'src/assets/images/Weddings/15.jpg' },
    ],
    themesSection: {
      label: 'Inspiration',
      title: 'Wedding Themes & Inspiration',
      subtitle: 'Colorful ceremonies, floral richness, cultural traditions, and refined luxury.',
    },
    themes: [
      { title: 'Colorful Ceremonies', img: 'src/assets/images/Weddings/10.jpg' },
      { title: 'Floral Richness', img: 'src/assets/images/Weddings/11.jpg' },
      { title: 'Traditional Rituals', img: 'src/assets/images/Weddings/12.jpg' },
      { title: 'Refined Luxury', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Cultural Celebration', img: 'src/assets/images/Weddings/15.jpg' },
      { title: 'Elegant Indian Wedding Styling', img: 'src/assets/images/Weddings/13.jpg' },
    ],
    ctaSection: {
      label: 'Ready?',
      title: 'Plan Your Wedding',
      subtitle: "Let's bring your Kerala wedding vision to life in Marrakech.",
    },
    ui: {
      details: 'details',
      close: 'Close',
      venue_experience: 'Venue Experience',
      start_planning: 'Start Planning',
      continue: 'Continue Browsing',
      plan_wedding: 'Plan Your Wedding',
      discover_type: 'Discover',
    },
  },
  'wedding_subpages.jewish': {
    hero: {
      label: 'Bespoke Weddings in Morocco',
      title: 'Jewish Wedding in Marrakech',
      subtitle: 'From traditional ceremonies under the chuppah to elegant multi-day celebrations, we design Jewish weddings that honor heritage, rituals, and refined aesthetics, while ensuring seamless coordination in Marrakech.',
      defaultService: 'Wedding',
    },
    servicesSection: {
      label: 'What We Offer',
      title: 'Our Wedding Services',
      subtitle: 'Tailored excellence for every step of your journey, including kosher catering coordination, ceremonial setup, and culturally aligned planning.',
    },
    services: [
      { title: 'Kosher Catering Coordination', desc: 'Careful sourcing and coordination with kosher catering partners for your celebration.' },
      { title: 'Ceremonial Setup', desc: 'Thoughtful planning for the chuppah, seating, and ceremonial flow.' },
      { title: 'Culturally Aligned Planning', desc: 'Every detail is handled with respect for tradition and family expectations.' },
      { title: 'Multi-Day Celebration Support', desc: 'Welcome dinners, ceremony days, and farewell moments planned seamlessly.' },
      { title: 'Guest Hospitality', desc: 'Transfers, timing, and hosting support for family and guests arriving in Marrakech.' },
      { title: 'Elegant Production', desc: 'Luxury styling and calm execution across the full wedding experience.' },
    ],
    venuesSection: {
      label: 'Where We Celebrate',
      title: "Celebrate in Morocco's Most Extraordinary Settings",
      subtitle: 'From historic riads rich in Jewish heritage to luxury villas and exclusive venues in Marrakech.',
    },
    venues: [
      { title: 'Historic Riads', img: 'src/assets/images/Weddings/8.jpg' },
      { title: 'Luxury Villas', img: 'src/assets/images/Weddings/22.jpg' },
      { title: 'Exclusive Marrakech Venues', img: 'src/assets/images/Weddings/31.jpg' },
      { title: 'Chuppah Ceremony Spaces', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Heritage-Led Settings', img: 'src/assets/images/Weddings/14.jpg' },
    ],
    themesSection: {
      label: 'Inspiration',
      title: 'Wedding Themes & Inspiration',
      subtitle: 'Timeless elegance, traditional rituals, and modern luxury blended into meaningful celebrations.',
    },
    themes: [
      { title: 'Timeless Elegance', img: 'src/assets/images/Weddings/10.jpg' },
      { title: 'Traditional Rituals', img: 'src/assets/images/Weddings/11.jpg' },
      { title: 'Modern Luxury', img: 'src/assets/images/Weddings/12.jpg' },
      { title: 'Meaningful Celebrations', img: 'src/assets/images/Weddings/13.jpg' },
      { title: 'Heritage & Style', img: 'src/assets/images/Weddings/14.jpg' },
      { title: 'Refined Marrakech Setting', img: 'src/assets/images/Weddings/15.jpg' },
    ],
    ctaSection: {
      label: 'Ready?',
      title: 'Plan Your Wedding',
      subtitle: "Let's create a Jewish wedding in Marrakech that reflects your traditions and vision.",
    },
    ui: {
      details: 'details',
      close: 'Close',
      venue_experience: 'Venue Experience',
      start_planning: 'Start Planning',
      continue: 'Continue Browsing',
      plan_wedding: 'Plan Your Wedding',
      discover_type: 'Discover',
    },
  },
};

const weddingServiceTypeByContentKey: Record<string, string> = {
  'wedding_page': 'Wedding in Marrakech',
  'wedding_subpages.agafay': 'Agafay',
  'wedding_subpages.elopement': 'Elopement',
  'wedding_subpages.kerala': 'Kerala',
  'wedding_subpages.jewish': 'Jewish',
};

const defaultServiceShowcaseSection: SectionCopy = {
  label: 'Services',
  title: 'Our Services',
  subtitle: 'Essential wedding services delivered with style, precision, and seamless coordination.',
};

const defaultServiceShowcaseItems = [
  {
    title: 'Transportation',
    img: 'src/assets/images/Weddings/Services/transportation.jpg',
    desc: 'Private transfers and guest transport management designed to keep every movement smooth and stress-free.',
    highlights: ['Airport and hotel transfers', 'Ceremony and reception shuttles', 'Luxury vehicle coordination'],
  },
  {
    title: 'DJ',
    img: 'src/assets/images/Weddings/Services/DJ.jpg',
    desc: 'Music direction and live atmosphere management to shape the perfect emotional flow from cocktail hour to last dance.',
    highlights: ['Curated music programming', 'Sound setup coordination', 'Dance-floor experience design'],
  },
  {
    title: 'Catering',
    img: 'src/assets/images/Weddings/Services/catering wedding.jpg',
    desc: 'Refined culinary experiences tailored to your guests, celebration style, and the rhythm of your wedding day.',
    highlights: ['Custom menu planning', 'Tasting and service flow', 'Dietary and guest preference support'],
  },
  {
    title: 'Make Up',
    img: 'src/assets/images/Weddings/Services/make up.jpg',
    desc: 'Professional beauty services for the bride and bridal party, timed precisely for a calm and camera-ready preparation.',
    highlights: ['Bride and bridal party beauty', 'Trial session coordination', 'On-site touch-up support'],
  },
  {
    title: 'Photography & Videography',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80',
    desc: 'Editorial coverage that captures every key emotion and detail, from preparations to the final celebration moments.',
    highlights: ['Photo and video team coordination', 'Timeline-aligned coverage', 'Cinematic highlight storytelling'],
  },
];

interface WeddingTemplatePageProps {
  contentKey: string;
  showWeddingTypes?: boolean;
}

const WeddingTemplatePage: React.FC<WeddingTemplatePageProps> = ({ contentKey, showWeddingTypes = false }) => {
  const { t, i18n } = useTranslation();
  const baseConfig = useMemo(() => weddingPageConfigs[contentKey] ?? weddingPageConfigs.wedding_page, [contentKey]);
  const translatedConfig = useMemo(
    () => t(contentKey, { returnObjects: true, defaultValue: null }) as Partial<WeddingPageConfig> | null,
    [contentKey, i18n.language, i18n.resolvedLanguage, t],
  );
  const config = useMemo<WeddingPageConfig>(() => {
    const tc = translatedConfig ?? {};
    return {
      ...baseConfig,
      ...tc,
      hero: {
        ...baseConfig.hero,
        ...(tc.hero ?? {}),
      },
      weddingTypesSection: tc.weddingTypesSection
        ? { ...(baseConfig.weddingTypesSection ?? tc.weddingTypesSection), ...tc.weddingTypesSection }
        : baseConfig.weddingTypesSection,
      servicesSection: {
        ...baseConfig.servicesSection,
        ...(tc.servicesSection ?? {}),
      },
      services: tc.services ?? baseConfig.services,
      venuesSection: {
        ...baseConfig.venuesSection,
        ...(tc.venuesSection ?? {}),
      },
      venues: tc.venues ?? baseConfig.venues,
      editorial: baseConfig.editorial || tc.editorial
        ? {
          ...(baseConfig.editorial ?? tc.editorial ?? {}),
          ...(tc.editorial ?? {}),
          details: tc.editorial?.details ?? baseConfig.editorial?.details,
        }
        : undefined,
      themesSection: {
        ...baseConfig.themesSection,
        ...(tc.themesSection ?? {}),
      },
      themes: tc.themes ?? baseConfig.themes,
      serviceShowcaseSection: tc.serviceShowcaseSection ?? baseConfig.serviceShowcaseSection,
      serviceShowcase: tc.serviceShowcase ?? baseConfig.serviceShowcase,
      ctaSection: {
        ...baseConfig.ctaSection,
        ...(tc.ctaSection ?? {}),
      },
      includedSection: tc.includedSection
        ? { ...(baseConfig.includedSection ?? tc.includedSection), ...tc.includedSection }
        : baseConfig.includedSection,
      included: tc.included ?? baseConfig.included,
      faqSection: tc.faqSection
        ? { ...(baseConfig.faqSection ?? tc.faqSection), ...tc.faqSection }
        : baseConfig.faqSection,
      faqs: tc.faqs ?? baseConfig.faqs,
      ui: {
        ...baseConfig.ui,
        ...(tc.ui ?? {}),
      },
      heroImages: tc.heroImages ?? baseConfig.heroImages,
    };
  }, [baseConfig, translatedConfig]);
  const serviceShowcaseSection = config.serviceShowcaseSection ?? defaultServiceShowcaseSection;
  const serviceShowcaseItems = config.serviceShowcase ?? defaultServiceShowcaseItems;
  const weddingServiceType = weddingServiceTypeByContentKey[contentKey] ?? '';
  const weddingSubtypeImagesByKey: Record<string, string[]> = {
    'wedding_subpages.agafay': agafayDesertWeddingImages,
    'wedding_subpages.elopement': elopementWeddingImages,
    'wedding_subpages.kerala': keralaWeddingImages,
    'wedding_subpages.jewish': jewishWeddingImages,
  };

  const subpageImages = weddingSubtypeImagesByKey[contentKey] ?? [];
  const useSubpageImages = subpageImages.length > 0;
  const pickSubpageImage = (index: number): string => {
    if (!useSubpageImages) return '';
    return subpageImages[index % subpageImages.length] ?? '';
  };

  const explicitHeroImages = (config.heroImages ?? []).map(resolveJsonImageSrc).filter(Boolean);
  const heroImages: string[] = useSubpageImages
    ? [pickSubpageImage(0), pickSubpageImage(1), pickSubpageImage(2)].filter(Boolean)
    : explicitHeroImages;

  const venuesWithImages: any[] = (config.venues ?? []).map((venue: any, index: number) => ({
    ...venue,
    img: useSubpageImages ? pickSubpageImage(index) : resolveJsonImageSrc(venue.img),
  }));
  const editorialImage: string = resolveJsonImageSrc(config.editorial?.imageUrl ?? '');
  const themesWithImages: any[] = (config.themes ?? []).map((theme: any, index: number) => ({
    ...theme,
    img: useSubpageImages
      ? pickSubpageImage((config.venues ?? []).length + index)
      : resolveJsonImageSrc(theme.img),
  }));
  const serviceShowcaseWithImages: any[] = serviceShowcaseItems.map((item: any) => ({
    ...item,
    img: resolveJsonImageSrc(item.img),
  }));
  const safeHeroImages = heroImages.filter(Boolean);
  const safeVenuesWithImages = venuesWithImages.filter((venue: any) => Boolean(venue.img));
  const safeThemesWithImages = themesWithImages.filter((theme: any) => Boolean(theme.img));
  const safeServiceShowcaseWithImages = serviceShowcaseWithImages.filter((item: any) => Boolean(item.img));
  const reservationImage = safeHeroImages[0] || editorialImage;
  const agafayFeatureImage = new URL(
    '../assets/images/Weddings/agafay-desert/Destination-Wedding-Photographer-3-1536x1024-1.jpg',
    import.meta.url,
  ).href;
  const weddingTypeCards = [
    {
      title: 'Wedding in Marrakech',
      desc: 'Bespoke weddings in Marrakech with elegant planning, tailored design, and seamless coordination from start to finish.',
      image: 'src/assets/images/Weddings/1.jpg',
      modal: {
        title: 'Wedding in Marrakech',
        subtitle: 'A refined celebration in the city that defines your destination experience.',
        body: 'Intimate venue planning, elegant styling, guest hospitality, and seamless wedding coordination in Marrakech.',
        image: 'src/assets/images/Weddings/1.jpg',
      },
    },
    {
      title: 'Agafay Desert Wedding',
      desc: 'Sunset ceremonies and immersive desert celebrations just outside Marrakech.',
      path: '/wedding/agafay-desert',
      image: agafayFeatureImage,
    },
    {
      title: 'Elopement Wedding in Morocco',
      desc: 'Intimate vows and romantic escapes designed around privacy, emotion, and meaningful moments.',
      path: '/wedding/elopement',
      image: elopementWeddingImages[0] ?? 'src/assets/images/Weddings/8.jpg',
    },
    {
      title: 'Kerala Wedding in Marrakech',
      desc: 'Vibrant cultural celebrations that combine Indian traditions with a refined Moroccan setting.',
      path: '/wedding/kerala',
      image: keralaWeddingImages[0] ?? 'src/assets/images/Weddings/22.jpg',
    },
    {
      title: 'Jewish Wedding in Marrakech',
      desc: 'Heritage-led celebrations with ceremonial elegance, kosher coordination, and polished hosting.',
      path: '/wedding/jewish',
      image: jewishWeddingImages[0] ?? 'src/assets/images/Weddings/31.jpg',
    },
  ];

  const weddingReservationOptions = [
    { value: 'Wedding in Marrakech', label: 'Wedding in Marrakech' },
    { value: 'Agafay', label: 'Agafay' },
    { value: 'Jewish', label: 'Jewish' },
    { value: 'Elopement', label: 'Elopement' },
    { value: 'Kerala', label: 'Kerala' },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeVenueIdx, setActiveVenueIdx] = useState<number | null>(null);
  const [activeWeddingCardIdx, setActiveWeddingCardIdx] = useState<number | null>(null);
  const [activeServiceShowcaseIdx, setActiveServiceShowcaseIdx] = useState<number | null>(null);
  const activeVenue = useMemo(() => (activeVenueIdx === null ? null : venuesWithImages[activeVenueIdx]), [activeVenueIdx, venuesWithImages]);
  const activeWeddingCard = activeWeddingCardIdx === null ? null : weddingTypeCards[activeWeddingCardIdx];
  const activeWeddingCardModal = activeWeddingCard && 'modal' in activeWeddingCard ? activeWeddingCard.modal : null;
  const activeServiceShowcase = useMemo(
    () => (activeServiceShowcaseIdx === null ? null : serviceShowcaseWithImages[activeServiceShowcaseIdx]),
    [activeServiceShowcaseIdx, serviceShowcaseWithImages],
  );

  const goToReservationForm = () => {
    setActiveWeddingCardIdx(null);
    window.setTimeout(() => {
      scrollToReservation();
    }, 50);
  };

  useEffect(() => {
    if (activeVenueIdx === null && activeServiceShowcaseIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVenueIdx(null);
        setActiveServiceShowcaseIdx(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeVenueIdx, activeServiceShowcaseIdx]);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-form');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = el.querySelector('input, select, textarea, button') as HTMLElement | null;
    firstInput?.focus?.();
  };

  return (
    <div className="page-wedding">

      <PageHero
        images={safeHeroImages}
        label={config.hero.label}
        title={config.hero.title}
        subtitle={config.hero.subtitle}
        defaultService={weddingServiceType || config.hero.defaultService}
        serviceOptions={weddingReservationOptions}
        servicePlaceholder="Select a wedding type"
        showForm
      />

      {showWeddingTypes ? (
        <section id="wedding-types" className="section-padding container reveal wedding-types-section">
          <div className="wedding-section-header">
            <span className="section-label">{config.weddingTypesSection?.label ?? 'Wedding Types'}</span>
            <span className="gold-line" />
            <h2>{config.weddingTypesSection?.title ?? 'Types of Weddings We Create'}</h2>
            <p>{config.weddingTypesSection?.subtitle ?? 'Explore each celebration style and discover the experience that fits your vision.'}</p>
          </div>
          <div className="wedding-types-grid">
            {weddingTypeCards.map((item, idx) => (
              'modal' in item ? (
                <button
                  key={item.title}
                  type="button"
                  className="wedding-type-card wedding-type-card--button reveal"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                  onClick={() => setActiveWeddingCardIdx(idx)}
                >
                  <div className="wedding-type-card-image-wrap">
                    <img src={resolveJsonImageSrc(item.image)} alt={item.title} className="wedding-type-card-image" />
                    <div className="wedding-type-overlay">
                      <span className="wedding-type-tag">{config.weddingTypesSection?.label ?? 'Wedding Types'}</span>
                      <div className="wedding-type-info">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <span className="wedding-type-cta">
                        {config.ui.discover_type} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </button>
              ) : (
                <Link key={item.path} to={item.path} className="wedding-type-card reveal" style={{ transitionDelay: `${idx * 70}ms` }}>
                  <div className="wedding-type-card-image-wrap">
                    <img src={resolveJsonImageSrc(item.image)} alt={item.title} className="wedding-type-card-image" />
                    <div className="wedding-type-overlay">
                      <span className="wedding-type-tag">{config.weddingTypesSection?.label ?? 'Wedding Types'}</span>
                      <div className="wedding-type-info">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                      <span className="wedding-type-cta">
                        {config.ui.discover_type} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </section>
      ) : null}

      <section id="wedding-services" className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{config.servicesSection.label}</span>
          <span className="gold-line" />
          <h2>{config.servicesSection.title}</h2>
          <p>{config.servicesSection.subtitle}</p>
        </div>
        <div className="wedding-services-grid">
          {config.services.map((s: any, i: number) => (
            <div key={i} className="wedding-service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="wedding-venues" className="reveal">
        <div className="wedding-section-header container">
          <span className="section-label">{config.venuesSection.label}</span>
          <span className="gold-line" />
          <h2>{config.venuesSection.title}</h2>
          <p>{config.venuesSection.subtitle}</p>
        </div>
        <div className="venue-experience-grid">
          {safeVenuesWithImages.map((v: any, i: number) => (
            <button
              key={v.title}
              type="button"
              className="venue-card venue-card--button"
              onClick={() => setActiveVenueIdx(i)}
              aria-haspopup="dialog"
              aria-expanded={activeVenueIdx === i}
            >
              {v.img ? <img src={v.img} alt={v.title} className="venue-card-img" /> : null}
              <div className="venue-card-overlay">
                <h3>{v.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeVenue && (
        <div
          className="wedding-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVenue.title} ${t('wedding_page.ui.details')}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveVenueIdx(null);
          }}
        >
          <div className="wedding-modal">
            <button
              type="button"
              className="wedding-modal-close"
              onClick={() => setActiveVenueIdx(null)}
              aria-label={t('wedding_page.ui.close')}
            >
              <X size={20} />
            </button>

            <div className="wedding-modal-grid">
              <div className="wedding-modal-img-wrap">
                {activeVenue.img ? <img src={activeVenue.img} alt={activeVenue.title} className="wedding-modal-img" /> : null}
                <div className="wedding-modal-img-overlay" />
                <div className="wedding-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{t('wedding_page.ui.venue_experience')}</span>
                  <h3>{activeVenue.title}</h3>
                </div>
              </div>

              <div className="wedding-modal-body">
                <p className="wedding-modal-desc">{activeVenue.desc}</p>
                <ul className="wedding-modal-highlights">
                  {(activeVenue.highlights ?? []).map((h: string) => (
                    <li key={h}>
                      <span className="wedding-modal-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="wedding-modal-cta">
                  <button type="button" className="btn-primary" onClick={() => { setActiveVenueIdx(null); scrollToReservation(); }}>
                    {config.ui.start_planning} <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveVenueIdx(null)}>
                    {config.ui.continue}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeWeddingCardModal && activeWeddingCard && (
        <div
          className="wedding-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={activeWeddingCardModal.title}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveWeddingCardIdx(null);
          }}
        >
          <div className="wedding-modal">
            <button
              type="button"
              className="wedding-modal-close"
              onClick={() => setActiveWeddingCardIdx(null)}
              aria-label={config.ui.close}
            >
              <X size={20} />
            </button>

            <div className="wedding-modal-grid">
              <div className="wedding-modal-img-wrap">
                <img
                  src={resolveJsonImageSrc(activeWeddingCardModal.image)}
                  alt={activeWeddingCardModal.title}
                  className="wedding-modal-img"
                />
                <div className="wedding-modal-img-overlay" />
                <div className="wedding-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>
                    {config.weddingTypesSection?.label ?? 'Wedding Types'}
                  </span>
                  <h3>{activeWeddingCardModal.title}</h3>
                </div>
              </div>

              <div className="wedding-modal-body">
                <p className="wedding-modal-desc">{activeWeddingCardModal.subtitle}</p>
                <p className="wedding-modal-desc">{activeWeddingCardModal.body}</p>

                <div className="wedding-modal-cta">
                  <button type="button" className="btn-primary" onClick={goToReservationForm}>
                    {config.ui.start_planning} <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveWeddingCardIdx(null)}>
                    {config.ui.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {config.editorial ? (
        <section id="wedding-editorial" className="section-padding container reveal">
          <div className="editorial-container">
            <div className="editorial-img-side">
              {editorialImage ? <img src={editorialImage} alt={config.editorial.imageAlt} className="editorial-img-main" /> : null}
            </div>
            <div className="editorial-text-side">
              <span className="section-label">{config.editorial.label}</span>
              <span className="gold-line gold-line-left" />
              <h2>{config.editorial.title}</h2>
              <p>{config.editorial.body}</p>
              <ul className="editorial-details-list">
                {(config.editorial.details ?? []).map((d: string) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section id="wedding-themes" className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{config.themesSection.label}</span>
          <span className="gold-line" />
          <h2>{config.themesSection.title}</h2>
          <p>{config.themesSection.subtitle}</p>
        </div>
        <div className="themes-inspiration-grid">
          {safeThemesWithImages.map((theme: any, i: number) => (
            <div key={i} className="theme-inspiration-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              {theme.img ? <img src={theme.img} alt={theme.title} className="theme-inspiration-img" /> : null}
              <div className="theme-inspiration-overlay">
                <h3>{theme.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {serviceShowcaseSection && safeServiceShowcaseWithImages.length > 0 ? (
        <section id="wedding-services-showcase" className="reveal">
          <div className="wedding-section-header container">
            <span className="section-label">{serviceShowcaseSection.label}</span>
            <span className="gold-line" />
            <h2>{serviceShowcaseSection.title}</h2>
            <p>{serviceShowcaseSection.subtitle}</p>
          </div>
          <div className="venue-experience-grid">
            {safeServiceShowcaseWithImages.map((service: any, i: number) => (
              <button
                key={service.title}
                type="button"
                className="venue-card venue-card--button"
                onClick={() => setActiveServiceShowcaseIdx(i)}
                aria-haspopup="dialog"
                aria-expanded={activeServiceShowcaseIdx === i}
              >
                {service.img ? <img src={service.img} alt={service.title} className="venue-card-img" /> : null}
                <div className="venue-card-overlay">
                  <h3>{service.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {activeServiceShowcase ? (
        <div
          className="wedding-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeServiceShowcase.title} ${config.ui.details}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveServiceShowcaseIdx(null);
          }}
        >
          <div className="wedding-modal">
            <button
              type="button"
              className="wedding-modal-close"
              onClick={() => setActiveServiceShowcaseIdx(null)}
              aria-label={config.ui.close}
            >
              <X size={20} />
            </button>

            <div className="wedding-modal-grid">
              <div className="wedding-modal-img-wrap">
                {activeServiceShowcase.img ? (
                  <img src={activeServiceShowcase.img} alt={activeServiceShowcase.title} className="wedding-modal-img" />
                ) : null}
                <div className="wedding-modal-img-overlay" />
                <div className="wedding-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>
                    {serviceShowcaseSection.label}
                  </span>
                  <h3>{activeServiceShowcase.title}</h3>
                </div>
              </div>

              <div className="wedding-modal-body">
                <p className="wedding-modal-desc">{activeServiceShowcase.desc}</p>
                <ul className="wedding-modal-highlights">
                  {(activeServiceShowcase.highlights ?? []).map((h: string) => (
                    <li key={h}>
                      <span className="wedding-modal-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="wedding-modal-cta">
                  <button type="button" className="btn-primary" onClick={() => { setActiveServiceShowcaseIdx(null); scrollToReservation(); }}>
                    {config.ui.start_planning} <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveServiceShowcaseIdx(null)}>
                    {config.ui.continue}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {config.includedSection && config.included ? (
        <section id="wedding-included" className="journey-dark-section reveal">
          <div className="container">
            <div className="wedding-section-header">
              <h2 style={{ color: '#fff' }}>{config.includedSection.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>{config.includedSection.subtitle}</p>
            </div>
            <div className="included-grid">
              {config.included.map((item: any, idx: number) => (
                <div key={idx} className="included-card reveal" style={{ transitionDelay: `${idx * 60}ms` }}>
                  <div className="included-card-icon">
                    <Check size={18} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.faqSection && config.faqs ? (
        <section id="wedding-faq" className="section-padding container reveal">
          <div className="wedding-faq">
            <div className="wedding-section-header">
              <span className="section-label">{config.faqSection.label}</span>
              <span className="gold-line" />
              <h2>{config.faqSection.title}</h2>
            </div>
            {config.faqs.map((faq: any, idx: number) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <h3>{faq.q}</h3>
                  <span className="faq-icon"><Plus size={22} /></span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer"><p>{faq.a}</p></div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section id="wedding-cta" className="wedding-cta-final">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{config.ctaSection.label}</span>
          <h2>{config.ctaSection.title}</h2>
          <p>{config.ctaSection.subtitle}</p>
          <Link to="/contact" className="btn-primary">
            {config.ui.plan_wedding} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section id="reservation-form" className="section-padding wedding-reservation-section">
        <div className="container wedding-reservation-inner reveal">
          <div className="wedding-reservation-media">
            {reservationImage ? (
              <img src={reservationImage} alt={config.hero.title} className="wedding-reservation-media-img" />
            ) : null}
            <div className="wedding-reservation-media-overlay">
              <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{config.ctaSection.label}</span>
              <h2>{config.ctaSection.title}</h2>
              <p>{config.ctaSection.subtitle}</p>
            </div>
          </div>
          <div className="wedding-reservation-form-panel">
            <ReservationForm
              title="Wedding Reservation"
              subtitle="Tell us which wedding style you want to plan, and we’ll take it from there."
              selectPlaceholder="Select a wedding type"
              requestButtonLabel="Request Wedding Planning"
              successTitle="Wedding request received"
              successText="Thank you. We’ll be in touch within 24 hours to discuss your wedding plans."
              initialServiceType={weddingServiceType}
              options={weddingReservationOptions}
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default WeddingTemplatePage;