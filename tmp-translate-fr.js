const fs = require('fs');

const fr = JSON.parse(fs.readFileSync('src/locales/fr.json'));
const weddingFR = {
  "heroImages": [
    "https://sumptuous-events.com/wp-content/uploads/2016/07/marrakech-wedding-planner.jpg",
    "https://images.squarespace-cdn.com/content/v1/5e7cc650dbbd2c25c70e2fa8/de705cf0-8c99-46ff-860a-c7a6d212f1a4/el-fenn-wedding-planner",
    "https://images.squarespace-cdn.com/content/v1/5f8ea32d7c05b54f63b91afa/b1b14475-66cb-44f1-83b0-8c5fcf1be2dd/mariarao_mamouniaweddings_-309.jpg"
  ],
  "hero": {
    "label": "Mariages au Maroc",
    "title": "Des Mariages Sur Mesure au Maroc",
    "subtitle": "Des cérémonies intimes aux célébrations sur plusieurs jours, nous concevons des mariages alliant beauté, émotion et coordination parfaite.",
    "defaultService": "Mariage"
  },
  "servicesSection": {
    "label": "Ce Que Nous Offrons",
    "title": "Nos Services de Mariage",
    "subtitle": "L'excellence sur mesure pour chaque étape de votre voyage."
  },
  "services": [
    { "title": "Organisation Complète de Mariage", "desc": "Une gestion intégrale, du concept jusqu'à la dernière danse, garantissant que chaque détail soit parfaitement réalisé." },
    { "title": "Design & Stylisme de Mariage", "desc": "La création d'un récit visuel cohérent à travers le design floral, l'éclairage et une décoration sur mesure." },
    { "title": "Coordination de Mariage à Destination", "desc": "Une logistique experte pour les couples voyageant au Maroc, gérant les déplacements, les lieux et les prestataires locaux." },
    { "title": "Élopements & Mariages Intimes", "desc": "La curation de cérémonies profondément personnelles et époustouflantes pour des célébrations plus petites et privées." },
    { "title": "Week-ends de Mariage sur Plusieurs Jours", "desc": "La conception d'un voyage complet pour vos invités, du dîner de bienvenue au brunch d'adieu." },
    { "title": "Mariages Culturels & Fusion", "desc": "Le mélange respectueux des traditions et des cultures dans une célébration unique et harmonieuse." }
  ],
  "venuesSection": {
    "label": "Où Nous Célébrons",
    "title": "Célébrez dans les Décors Purs et Extraordinaires du Maroc",
    "subtitle": "Des riads cachés de la Médina jusqu'aux vastes étendues majestueuses du Sahara."
  },
  "venues": [
    {
      "title": "Riads de Luxe",
      "desc": "Cachés derrière des portes sculptées, les riads de Marrakech offrent des cours intimes, des dîners aux chandelles et un sentiment d'intimité cinématographique.",
      "highlights": ["Cours de la Médina & moments sur les toits", "Idéal pour des célébrations intimes à moyennes", "Parfait pour les dîners de bienvenue & brunchs"]
    },
    {
      "title": "Villas & Domaines Privés",
      "desc": "L'ambiance d'une résidence privée avec une hospitalité haut de gamme — de l'espace pour organiser sur plusieurs jours, des rassemblements autour de la piscine et un luxe détendu.",
      "highlights": ["Week-ends de mariage sur plusieurs jours", "Hébergement sur place pour les invités", "Agencements flexibles pour cérémonie + réception"]
    },
    {
      "title": "Palais & Jardins",
      "desc": "Une architecture grandiose, des détails patrimoniaaux et des jardins luxuriants pour les couples qui souhaitent une célébration royale et percutante.",
      "highlights": ["Des toiles de fond de cérémonie à fort impact", "Options pour grande capacité d'invités", "Idéal pour réceptions formelles & musique live"]
    },
    {
      "title": "Camps dans le Désert",
      "desc": "Une cérémonie au coucher du soleil, un dîner éclairé aux lanternes et de la musique sous les étoiles — le Sahara révèle un Maroc inoubliable.",
      "highlights": ["Cérémonies au coucher du soleil & dîners sous les étoiles", "Expérience d'invité immersive", "Parfait pour les élopements ou événements audacieux de week-end"]
    },
    {
      "title": "Lieux en Bord de Mer",
      "desc": "Air de l'océan, lumière dorée et une sophistication décontractée — les lieux côtiers apportent un romantisme sans effort avec un stylisme raffiné.",
      "highlights": ["Cérémonies à l'heure dorée", "Ambiance de luxe décontracté", "Idéal pour des excursions d'invités & brunchs bord de mer"]
    }
  ],
  "editorial": {
    "label": "Notre Philosophie",
    "title": "L'Art dans Chaque Détail",
    "body": "Nous croyons qu'un mariage doit être une expérience sensorielle. Notre approche éditoriale du design garantit que chaque élément — du parfum des fleurs à la transition de la lumière — contribue à un récit cohérent et à couper le souffle. Nous organisons tout le voyage des invités en mettant l'accent sur un divertissement haut de gamme et des tables immersives.",
    "details": ["Fleurs Sur Mesure", "Éclairage d'Ambiance", "Tables Uniques", "Divertissement Sélectif", "Gestion du Voyage Invité", "Stylisme de Cérémonie"]
  },
  "themesSection": {
    "label": "Inspiration",
    "title": "Thèmes de Mariage & Inspiration",
    "subtitle": "Découvrez des thèmes qui résonnent avec l'âme du Maroc et votre style personnel."
  },
  "themes": [
    { "title": "Élégance Royale Marocaine" },
    { "title": "Romance Moderne Minimaliste" },
    { "title": "Célébration au Coucher de Soleil" },
    { "title": "Mariage de Jardin en Fleurs" },
    { "title": "Sophistication Blanc & Or" },
    { "title": "Beldi Chic Réinventé" }
  ],
  "includedSection": {
    "title": "L'Envergure Globale",
    "subtitle": "Une approche holistique pour votre célébration."
  },
  "included": [
    { "title": "Développement du Concept", "desc": "Développer un concept visuel et expérientiel qui raconte votre histoire." },
    { "title": "Recherche de Lieux", "desc": "La sélection parmi les endroits les plus extraordinaires du Maroc pour votre réception." },
    { "title": "Gestion du Budget", "desc": "Une planification stratégique et une gestion transparente de l'investissement pour votre mariage." },
    { "title": "Sélection & Gestion des Prestataires", "desc": "Vous mettre en relation avec les partenaires créatifs locaux et internationaux les plus talentueux." },
    { "title": "Direction Artistique & Moodboards", "desc": "La création de planches de tendances détaillées pour chaque élément visuel." },
    { "title": "Logistique des Invités & Hospitalité", "desc": "Gérer l'hébergement, les déplacements et les expériences de vos invités." },
    { "title": "Fluidité Cérémonie et Réception", "desc": "Agencer la choraleographie parfaite entre toutes les étapes de la journée." },
    { "title": "Coordination le Jour J", "desc": "Une sérénité absolue tandis que nous gérons chaque seconde de votre événement." }
  ],
  "faqSection": {
    "label": "FAQ",
    "title": "Questions Fréquemment Posées"
  },
  "faqs": [
    { "q": "Combien de temps à l'avance devrions-nous commencer ?", "a": "Pour les mariages à destination au Maroc, nous recommandons de commencer entre 10 et 12 mois à l'avance pour réserver votre lieu privilégié et les meilleurs prestataires." },
    { "q": "Travaillez-vous avec des couples internationaux ?", "a": "Oui, la majorité de nos clients sont des couples internationaux. Nous sommes des experts dans la gestion de l'organisation à distance et de la logistique des invités." },
    { "q": "Pouvez-vous organiser des cérémonies multiculturelles ou symboliques ?", "a": "Absolument. Nous sommes spécialisés dans les mariages fusion et pouvons vous assister pour trouver des célébrants pour des cérémonies symboliques, laïques ou religieuses." },
    { "q": "Aidez-vous pour les expériences et l'hébergement des invités ?", "a": "Oui, nous fournissons une gestion complète de l'hospitalité comprenant la réservation d'hébergement, les visites locales et les transports pour vos invités." }
  ],
  "ctaSection": {
    "label": "Prêt(e) ?",
    "title": "Organisez Votre Mariage",
    "subtitle": "Commençons aujourd'hui à créer votre célébration extraordinaire au Maroc."
  }
};

fr.wedding_page = weddingFR;
fs.writeFileSync('src/locales/fr.json', JSON.stringify(fr, null, 2));
