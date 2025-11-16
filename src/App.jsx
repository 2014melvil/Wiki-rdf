import React, { useState, useEffect } from 'react';
import { Search, Bot, LifeBuoy, X, Loader2, Link as LinkIcon, BookOpen } from 'lucide-react';

// --- Données des Clans (Très Détaillées) ---
const clansData = [
  // Pyrrhia
  { 
    name: "Ailes de Boue", 
    id: "boue",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/8B4513/FFFFFF?text=Ailes+de+Boue",
    apparence: "Écailles épaisses et blindées, dans des tons de marron, ambre et sépia. Constitution massive et puissante.",
    capacites: "Peuvent cracher du feu (s'ils ont assez de chaleur/boue), retenir leur souffle jusqu'à une heure. Très forts physiquement. Les 'grands-ailes' (nés d'œufs rouge sang) sont immunisés au feu.",
    societe: "Organisés en 'fratries' de frères et sœurs qui restent loyaux à vie. Le 'grand-aile' dirige la fratrie. Loyauté et famille sont primordiales.",
    territoire: "Le Delta du Diamant et les marais, au sud-ouest de Pyrrhia.",
    reine: "Reine Tourbe" 
  },
  { 
    name: "Ailes de Mer", 
    id: "mer",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/00008B/FFFFFF?text=Ailes+de+Mer",
    apparence: "Écailles dans les tons de bleu, vert et turquoise. Membres palmés, branchies sur le cou. Bandes luminescentes sur tout le corps pour communiquer.",
    capacites: "Respirent sous l'eau, excellente vision nocturne sous-marine, puissants nageurs. Peuvent créer de grandes vagues avec leur queue.",
    societe: "Une société complexe et artistique vivant dans des palais sous-marins. La reine contrôle tout, et l'art (écriture, chant) est très valorisé. Communiquent en 'Aquatique' (flashs lumineux).",
    territoire: "L'océan à l'est de Pyrrhia et le Palais d'Été.",
    reine: "Reine Corail" 
  },
  { 
    name: "Ailes de Pluie", 
    id: "pluie",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/008000/FFFFFF?text=Ailes+de+Pluie",
    apparence: "Écailles plus fines capables de changer de couleur instantanément, reflétant leurs émotions ou leur environnement (camouflage). Corps élancé et queue préhensile.",
    capacites: "Peuvent changer la couleur de leurs écailles à volonté. Crachent un venin mortel et corrosif. Utilisent leur queue pour s'accrocher aux arbres.",
    societe: "Autrefois laxiste, avec des 'reines' changeant tous les mois. Depuis Gloria, ils sont plus organisés. Valorisaient les bains de soleil et les fruits. Maintenant, ils s'entraînent au combat.",
    territoire: "La forêt tropicale, au nord-est de Pyrrhia.",
    reine: "Reine Gloria" 
  },
  { 
    name: "Ailes de Nuit", 
    id: "nuit",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/000000/FFFFFF?text=Ailes+de+Nuit",
    apparence: "Écailles noires ou violet très foncé. Des écailles argentées en forme de larmes au coin des yeux (pour les télépathes/voyants). Dessous d'ailes tachetés d'argent, comme un ciel nocturne.",
    capacites: "Peuvent se fondre dans l'ombre et cracher du feu. Si nés sous une ou plusieurs lunes pleines, ils peuvent avoir des dons de télépathie et/ou de prémonition (voir l'avenir).",
    societe: "Autrefois secrets, arrogants et manipulateurs, vivant sur une île volcanique. Depuis qu'ils vivent dans la forêt tropicale, ils sont plus ouverts et honnêtes.",
    territoire: "Autrefois une île volcanique, maintenant la forêt tropicale (partagée avec les Ailes de Pluie).",
    reine: "Reine Gloria (par alliance et choix du clan)" 
  },
  { 
    name: "Ailes de Sable", 
    id: "sable",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/FFD700/000000?text=Ailes+de+Sable",
    apparence: "Écailles couleur sable pâle, jaune ou or. Langue fourchue noire. Une crête dorsale. Un aiguillon venimeux très dangereux au bout de la queue.",
    capacites: "Peuvent survivre longtemps sans eau, résistent à la chaleur extrême. Crachent du feu. Leur venin de queue est mortel (le seul antidote est le cactus de la Vipère Claire).",
    societe: "Clan divisé après la guerre de succession. Loyaux mais rusés. Habitués aux marchés et aux villes-forteresses dans le désert.",
    territoire: "Le vaste désert (Royaume de Sable) au sud de Pyrrhia.",
    reine: "Reine Fournaise (la mère de Sunny)" 
  },
  { 
    name: "Ailes du Ciel", 
    id: "ciel",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/FF4500/FFFFFF?text=Ailes+du+Ciel",
    apparence: "Écailles dans les tons de rouge, orange ou or. Ailes immenses, les plus grandes de tous les clans. Agile et puissant.",
    capacites: "Excellents volants, les plus rapides. Crachent un feu puissant. Certains, comme Péril, naissent avec 'trop de feu' (écailles brûlantes).",
    societe: "Militaristes et grincheux, avec une passion pour les combats d'arène (sous Scarlet). Sous la reine Ruby, la société est plus juste et moins brutale.",
    territoire: "Les montagnes (Clifford) au nord de Pyrrhia.",
    reine: "Reine Ruby" 
  },
  { 
    name: "Ailes de Glace", 
    id: "glace",
    continent: "Pyrrhia", 
    img: "https://placehold.co/400x300/ADD8E6/000000?text=Ailes+de+Glace",
    apparence: "Écailles bleu pâle, argentées ou blanches. Griffes dentelées pour s'agripper à la glace. Sang bleu. Corps anguleux.",
    capacites: "Souffle de glace mortel qui gèle instantanément au contact. Très résistants au froid intense et à la lumière vive.",
    societe: "Société très stricte, aristocratique et hiérarchisée, basée sur un 'Cercle' de classement. Froids et méprisants envers les autres clans.",
    territoire: "La toundra gelée au nord-ouest de Pyrrhia.",
    reine: "Reine Neige" 
  },
  // Pantala
  { 
    name: "Ailes de Soie", 
    id: "soie",
    continent: "Pantala", 
    img: "https://placehold.co/400x300/FF69B4/FFFFFF?text=Ailes+de+Soie",
    apparence: "Absolument magnifiques, avec des écailles de toutes les couleurs (papillons). Naissent sans ailes, mais subissent une Métamorphose à 6 ans.",
    capacites: "Peuvent produire de la soie par leurs poignets. Après leur Métamorphose, ils développent de grandes ailes de papillon. Certains (rares) sont des 'lance-soie enflammés'.",
    societe: "Opprimés par les Ailes de Guêpe. Artistes et pacifiques, ils sont au bas de l'échelle sociale de Pantala.",
    territoire: "Les 'Ruches' (cités-arbres) contrôlées par les Ailes de Guêpe.",
    reine: "Reine Guêpe (de facto), Reine Séquoia (en exil)"
  },
  { 
    name: "Ailes de Guêpe", 
    id: "guepe",
    continent: "Pantala", 
    img: "https://placehold.co/400x300/FFFF00/000000?text=Ailes+de+Guepe",
    apparence: "Écailles noires et jaunes (parfois orange). Quatre ailes fines d'insecte. Corps segmenté. Aiguillons venimeux aux poignets et à la queue.",
    capacites: "Peuvent injecter un venin paralysant (ou mortel). La reine Guêpe contrôle tout son clan via un 'esprit de ruche' (contrôle mental).",
    societe: "Clan dominant et totalitaire de Pantala. Stricts, militaires, ils contrôlent les Ailes de Soie et chassent les Ailes de Feuille.",
    territoire: "Les Ruches de Pantala.",
    reine: "Reine Guêpe" 
  },
  { 
    name: "Ailes de Feuille", 
    id: "feuille",
    continent: "Pantala", 
    img: "https://placehold.co/400x300/228B22/FFFFFF?text=Ailes+de+Feuille",
    apparence: "Écailles dans les tons de vert et de marron (camouflage forestier). Certains ont des ailes en forme de feuille.",
    capacites: "Absorbent l'énergie du soleil. Certains ont la 'Main Verte' (un pouvoir de contrôle sur les plantes). Ne crachent pas de feu.",
    societe: "Clan divisé en deux : les 'Ailes-de-Sève' (pacifistes) et les 'Ailes-de-Poison' (guerriers). Longtemps considérés comme éteints, ils vivent cachés.",
    territoire: "La Jungle de la Sève Empoisonnée (Poison Jungle).",
    reine: "Reine Séquoia" 
  },
];

// --- Données Personnages (AVEC INFO 'cycle') --- 

// -- CYCLE 1 (Pyrrhia) --
const protagonistsCycle1 = [
  { id: "argil", name: "Argil", clan: "Ailes de Boue", clanId: 'boue', desc: "Le 'grand-aile' des dragonnets du destin. Loyal et protecteur.", cycle: 1 },
  { id: "tsunami", name: "Tsunami", clan: "Ailes de Mer", clanId: 'mer', desc: "La princesse des Ailes de Mer, têtue, courageuse et leader féroce.", cycle: 1 },
  { id: "gloria", name: "Gloria", clan: "Ailes de Pluie", clanId: 'pluie', desc: "D'abord sous-estimée, elle se révèle être une reine juste et puissante.", cycle: 1 },
  { id: "comete", name: "Comète", clan: "Ailes de Nuit", clanId: 'nuit', desc: "L'intellectuel du groupe. Né sous une lune, il peut lire les pensées.", cycle: 1 },
  { id: "sunny", name: "Sunny", clan: "Hybride Sable/Nuit", clanId: 'hybride-sable-nuit', desc: "Optimiste et gentille. Hybride sans venin de queue mais au grand cœur.", cycle: 1 },
];

// -- CYCLE 2 (Pyrrhia) --
const protagonistsCycle2 = [
  { name: "Lune Claire", clan: "Ailes de Nuit", clanId: 'nuit', desc: "Héroïne de l'Cycle 2, avec de vrais dons de prémonition et télépathie.", cycle: 2 },
  { name: "Winter", clan: "Ailes de Glace", clanId: 'glace', desc: "Prince des Ailes de Glace, strict et froid en apparence, mais loyal.", cycle: 2 },
  { name: "Péril", clan: "Ailes du Ciel", clanId: 'ciel', desc: "Née avec 'trop de feu', elle brûle tout ce qu'elle touche.", cycle: 2 },
  { name: "Qibli", clan: "Ailes de Sable", clanId: 'sable', desc: "Extrêmement intelligent et rusé, il veut utiliser son esprit pour aider.", cycle: 2 },
  { name: "Kinkajou", clan: "Ailes de Pluie", clanId: 'pluie', desc: "Vive, bavarde et enthousiaste. Une amie loyale de l'Ailière de Jade.", cycle: 2 },
  { name: "Triton", clan: "Ailes de Mer", clanId: 'mer', desc: "Prince Aile de Mer et Animus secret. Il préfère se cacher.", cycle: 2 },
];

// -- CYCLE 3 (Pantala) --
const protagonistsCycle3 = [
  { name: "Bourdon", clan: "Ailes de Soie", clanId: 'soie', desc: "Un Aile de Soie au grand cœur qui découvre les secrets de Pantala.", cycle: 3 },
  { name: "Criket", clan: "Ailes de Guêpe", clanId: 'guepe', desc: "Une Aile de Guêpe curieuse et intelligente, immunisée au contrôle mental.", cycle: 3 },
  { name: "Belladone", clan: "Ailes de Feuille", clanId: 'feuille', desc: "Une Aile de Feuille fougueuse, déterminée à venger son clan.", cycle: 3 },
  { name: "Luna", clan: "Ailes de Soie", clanId: 'soie', desc: "Sœur de Bourdon. Elle est une 'lance-soie enflammée'.", cycle: 3 },
  { name: "Patte-d'Acier", clan: "Ailes de Soie", clanId: 'soie', desc: "Un Aile de Soie rebelle et impulsif, membre de la 'Chrysalide'.", cycle: 3 },
];

// -- ANTAGONISTES --
const antagonistsData = [
  { name: "Sinistre", clan: "Hybride Nuit/Glace", clanId: 'hybride-nuit-glace', desc: "Un hybride Animus ancien, télépathe et voyant. Antagoniste principal de l'Cycle 2.", cycle: 2 },
  { name: "Reine Scarlet", clan: "Ailes du Ciel", clanId: 'ciel', desc: "L'ancienne reine cruelle des Ailes du Ciel, obsédée par son arène.", cycle: 1 },
  { name: "Reine Guêpe", clan: "Ailes de Guêpe", clanId: 'guepe', desc: "La reine tyrannique de Pantala qui contrôle son clan par l'esprit. Antagoniste de l'Cycle 3.", cycle: 3 },
  { name: "Fournaise", clan: "Ailes de Sable", clanId: 'sable', desc: "Sœur de Flamme et Fièvre. Extrêmement brutale et cruelle.", cycle: 1 },
  { name: "Fièvre", clan: "Ailes de Sable", clanId: 'sable', desc: "Sœur de Flamme et Fournaise. La plus intelligente et manipulatrice.", cycle: 1 },
  { name: "Flamme", clan: "Ailes de Sable", clanId: 'sable', desc: "Sœur de Fournaise et Fièvre. Considérée comme la plus belle et la moins menaçante.", cycle: 1 },
  { name: "Morrowseer", clan: "Ailes de Nuit", clanId: 'nuit', desc: "L'architecte de la fausse prophétie des dragonnets.", cycle: 1 },
  { name: "Vésuve", clan: "Ailes de Nuit", clanId: 'nuit', desc: "La reine secrète et impitoyable des Ailes de Nuit sur l'île volcanique.", cycle: 1 },
];

// -- ROYAUTÉ --
const royaltyData = [
  { name: "Reine Corail", clan: "Ailes de Mer", clanId: 'mer', desc: "Reine des Ailes de Mer et mère de Tsunami. Écrivaine prolifique.", cycle: 1 },
  { name: "Reine Ruby", clan: "Ailes du Ciel", clanId: 'ciel', desc: "Reine actuelle des Ailes du Ciel. Plus juste que Scarlet.", cycle: 2 },
  { name: "Reine Fournaise", clan: "Ailes de Sable", clanId: 'sable', desc: "Mère de Sunny. Ancienne chef des Piquants-du-Désert.", cycle: 1 },
  { name: "Reine Neige", clan: "Ailes de Glace", clanId: 'glace', desc: "La jeune reine des Ailes de Glace après la mort de Glacier.", cycle: 2 },
  { name: "Reine Tourbe", clan: "Ailes de Boue", clanId: 'boue', desc: "La reine pragmatique des Ailes de Boue et alliée d'Argil.", cycle: 1 },
  { name: "Reine Séquoia", clan: "Ailes de Feuille", clanId: 'feuille', desc: "Reine des Ailes de Feuille cachée dans la Jungle.", cycle: 3 },
];

// -- HYBRIDES --
const hybridsList = [
  { name: "Sunny", clan: "Hybride Sable/Nuit", clanId: 'hybride-sable-nuit', desc: "Dragonnette du destin. Hybride sans venin de queue.", cycle: 1 },
  { name: "Sinistre", clan: "Hybride Nuit/Glace", clanId: 'hybride-nuit-glace', desc: "Un hybride Animus ancien, télépathe et voyant.", cycle: 2 },
  { name: "Clairvoyante", clan: "Hybride Nuit/Glace", clanId: 'hybride-nuit-glace', desc: "Sœur de Sinistre. Une hybride à l'esprit unique.", cycle: 2 },
  { name: "Typhon", clan: "Hybride Mer/Glace", clanId: 'hybride-mer-glace', desc: "Un hybride mentionné, souvent utilisé comme exemple.", cycle: 2 },
];

const pyrrhiaCharacters = [...protagonistsCycle1, ...protagonistsCycle2]
  .sort((a, b) => a.name.localeCompare(b.name));
const pantalaCharacters = [...protagonistsCycle3]
  .sort((a, b) => a.name.localeCompare(b.name));
const allCharacters = [...protagonistsCycle1, ...protagonistsCycle2, ...protagonistsCycle3, ...royaltyData, ...antagonistsData, ...hybridsList]
  .sort((a, b) => a.name.localeCompare(b.name));

// --- Données Quiz de Connaissances ---
const triviaQuestions = [
  // ... (questions existantes, pas besoin de les lister ici)
  { question: "Quel dragon est le personnage principal du premier livre, 'La Prophétie' ?", options: ["Tsunami", "Argil", "Gloria", "Sunny"], correctAnswer: "Argil" },
  { question: "De quel clan Tsunami est-elle la princesse perdue ?", options: ["Ailes de Mer", "Ailes de Nuit", "Ailes de Pluie", "Ailes de Sable"], correctAnswer: "Ailes de Mer" },
  { question: "Quel pouvoir secret Gloria utilise-t-elle pour devenir reine des Ailes de Pluie ?", options: ["Son venin", "Lire les pensées", "Une prophétie cachée", "Elle n'a pas de pouvoir secret"], correctAnswer: "Son venin" },
  { question: "Qui est le 'grand-aile' dans une fratrie Ailes de Boue ?", options: ["Le plus fort", "Le plus âgé", "Le dragon né d'un œuf couleur sang", "Leur chef de groupe"], correctAnswer: "Le dragon né d'un œuf couleur sang" },
  { question: "Quel clan vit dans le désert ?", options: ["Ailes de Glace", "Ailes de Sable", "Ailes de Boue", "Ailes du Ciel"], correctAnswer: "Ailes de Sable" },
  { question: "Quelle reine cruelle dirigeait les Ailes du Ciel au début de la série ?", options: ["Reine Oasis", "Reine Scarlet", "Reine Corail", "Reine Glacier"], correctAnswer: "Reine Scarlet" },
];

// --- NOUVEAU : Données Quiz Expert ---
const expertTriviaQuestions = [
  { question: "Quel est le nom de l'antidote au venin de queue des Ailes de Sable ?", options: ["Le cactus de la Vipère Claire", "La boue magique", "Le venin d'Aile de Pluie", "L'herbe de dragon"], correctAnswer: "Le cactus de la Vipère Claire" },
  { question: "De qui Péril est-elle la fille ?", options: ["Reine Scarlet", "Reine Ruby", "Kestrel", "Reine Fournaise"], correctAnswer: "Kestrel" },
  { question: "Comment s'appelle le pouvoir Animus de la famille royale des Ailes de Glace ?", options: ["Le Don de l'Ordre", "Le Souffle de Glace", "Le Cercle des Dons", "Le Cadeau de Glace"], correctAnswer: "Le Don de l'Ordre" },
  { question: "Quel est le nom du père de Sinistre ?", options: ["Prince Arcturus", "Roi Fjord", "Prince Narval", "Prince Winter"], correctAnswer: "Prince Arcturus" },
  { question: "Quelle Aile de Guêpe est immunisée au contrôle mental de la Reine Guêpe (à part Criket) ?", options: ["Patte-d'Acier", "Belladone", "Une Aile de Soie", "Il n'y en a pas d'autre"], correctAnswer: "Il n'y en a pas d'autre" },
  { question: "Quelle reine a été tuée par un dragon de glace Animus lors du 'Massacre du Palais d'Été' ?", options: ["Reine Lagune", "Reine Corail", "Reine Oasis", "Reine Perle"], correctAnswer: "Reine Lagune" },
];


// --- Données Quiz de Personnalité (Quel Clan) ---
const personalityQuizData = [
  // ... (questions existantes)
  { 
    question: "Où préférerais-tu vivre ?",
    options: [
      { text: "Dans un marécage chaud et boueux.", points: ["boue"] },
      { text: "Un palais sous l'océan.", points: ["mer"] },
      // ...
    ],
  },
];

// --- Données Quiz Dragonnet du Destin ---
const destinyQuizData = [
  // ... (questions existantes)
  { 
    question: "Quel est ton plus grand défaut ?",
    options: [
      { text: "Je suis parfois trop naïf ou optimiste.", points: ["sunny"] },
      // ...
    ],
  },
];


// --- Données pour les nouvelles pages ---

// --- 1. Données "Guide des Livres" ---
// MISE À JOUR : Liste complète des livres avec titres corrects et numéros de tome.
const booksData = {
  cycle1: [
    { tome: 1, titre: "La Prophétie", couv: "https://placehold.co/200x300/8B4513/FFFFFF?text=Tome+1", resume: "Cinq dragonnets sont élevés en secret pour accomplir une mystérieuse prophétie et mettre fin à la guerre." },
    { tome: 2, titre: "La Princesse Disparue", couv: "https://placehold.co/200x300/00008B/FFFFFF?text=Tome+2", resume: "Tsunami retourne chez les Ailes de Mer, mais le palais royal cache des secrets mortels." },
    { tome: 3, titre: "Au Cœur de la Jungle", couv: "https://placehold.co/200x300/008000/FFFFFF?text=Tome+3", resume: "Gloria doit découvrir pourquoi les Ailes de Pluie disparaissent de leur forêt paisible." },
    { tome: 4, titre: "L'Île au Secret", couv: "https://placehold.co/200x300/000000/FFFFFF?text=Tome+4", resume: "Comète se rend sur l'île volcanique des Ailes de Nuit et découvre la terrible vérité sur son clan." },
    { tome: 5, titre: "La Nuit la Plus Claire", couv: "https://placehold.co/200x300/FFD700/000000?text=Tome+5", resume: "C'est l'heure de choisir la nouvelle Reine des Ailes de Sable. Sunny doit convaincre tout le monde de choisir la paix." },
  ],
  cycle2: [
    { tome: 6, titre: "La Montagne de Jade", couv: "https://placehold.co/200x300/32CD32/FFFFFF?text=Tome+6", resume: "Lune Claire arrive à l'Académie. Elle entend des voix et une prophétie terrifiante émerge." },
    { tome: 7, titre: "Le Piège de Glace", couv: "https://placehold.co/200x300/ADD8E6/000000?text=Tome+7", resume: "Winter doit retourner au Royaume de Glace pour affronter sa famille et sauver son frère." },
    { tome: 8, titre: "La Mission de Péril", couv: "https://placehold.co/200x300/FF4500/FFFFFF?text=Tome+8", resume: "Péril, l'Aile du Ciel aux écailles brûlantes, doit choisir son camp : la Reine Scarlet ou ses nouveaux amis." },
    { tome: 9, titre: "Les Serres du Pouvoir", couv: "https://placehold.co/200x300/191970/FFFFFF?text=Tome+9", resume: "Triton retourne au Royaume de Mer pour découvrir ce qui est arrivé à sa magie Animus." },
    { tome: 10, titre: "La Tempête de Sable", couv: "https://placehold.co/200x300/F4A460/000000?text=Tome+10", resume: "Qibli doit affronter son passé et le terrible Sinistre pour sauver Pyrrhia de la magie éternelle." },
  ],
  cycle3: [
    { tome: 11, titre: "Le Continent Perdu", couv: "https://placehold.co/200x300/FF69B4/FFFFFF?text=Tome+11", resume: "Sur le continent de Pantala, Bourdon (Aile de Soie) découvre que sa vie est un mensonge." },
    { tome: 12, titre: "La Ruche", couv: "https://placehold.co/200x300/FFA500/000000?text=Tome+12", resume: "Criket (Aile de Guêpe) est immunisée au contrôle mental de la Reine Guêpe et doit fuir pour survivre." },
    { tome: 13, titre: "Le Poison de la Jungle", couv: "https://placehold.co/200x300/228B22/FFFFFF?text=Tome+13", resume: "Belladone (Aile de Feuille) cherche le moyen ultime de vaincre les Ailes de Guêpe dans la jungle la plus dangereuse." },
    { tome: 14, titre: "Le Souffle du Mal", couv: "https://placehold.co/200x300/ADD8E6/000000?text=Tome+14", resume: "La Reine Guêpe n'est pas la seule menace. Une plante ancienne et maléfique s'éveille pour tout contrôler." },
    { tome: 15, titre: "Les Flammes de l'Espoir", couv: "https://placehold.co/200x300/B0C4DE/000000?text=Tome+15", resume: "Luna et ses amis doivent unir les deux continents pour vaincre l'Autre-Cerveau une fois pour toutes." },
  ],
  horsSeries: [
    { tome: "HS1", titre: "Sinistre : La Légende", couv: "https://placehold.co/200x300/4B0082/FFFFFF?text=Légende+Sinistre", resume: "L'histoire tragique de Sinistre, Clairvoyante et Fathom, 2000 ans avant la série principale." },
    { tome: "HS2", titre: "Tueuse de Dragons", couv: "https://placehold.co/200x300/A0522D/FFFFFF?text=Légende+Humains", resume: "Les événements du Cycle 1 vus à travers les yeux de trois humains." },
  ],
  graphicNovels: [
    { tome: "BD1", titre: "La Prophétie (BD)", couv: "https://placehold.co/200x300/8B4513/FFFFFF?text=BD+Tome+1", resume: "Adaptation en roman graphique du Tome 1." },
    // ... on pourrait en ajouter d'autres ici
  ]
};

// --- 2. Données "Prophéties" et "Magie" ---
const propheciesData = [
  // ... (données existantes)
  { 
    titre: "La Prophétie des Dragonnets (Cycle 1)",
    texte: "Quand la guerre durera vingt ans... les dragonnets viendront.\n..." 
  },
];

const animusData = {
  // ... (données existantes)
  description: "La magie Animus est une capacité extrêmement rare et puissante...",
  dangers: "Le pouvoir a un coût terrible : chaque utilisation ronge l'âme du dragon...",
  dragonsConnus: [ "Albatros (Aile de Mer, devenu fou)", "Sinistre (Hybride Nuit/Glace)", "Triton (Prince Aile de Mer)", "Anémone (Princesse Aile de Mer)", "..." ]
};

// --- 3. Données "Galerie" ---
const galleryImageData = [
  // ... (données existantes)
  { nom: "Argil", url: "https://placehold.co/400x400/8B4513/FFFFFF?text=Argil" },
  { nom: "Tsunami", url: "https://placehold.co/400x400/00008B/FFFFFF?text=Tsunami" },
];

// --- 4. Données "Générateur d'OC" ---
const ocNameParts = {
  // ... (données existantes)
  boue: ["Terre", "Boue", "Argile", "Sable", "Tourbe", "Roseau", "Saule"],
  mer: ["Nautile", "Corail", "Ablone", "Indiggo", "Triton", "Anémone", "Vague"],
  // ...
};
const ocTraits = ["Courageux", "Timide", "Artistique", "Intelligent", "Grincheux", "Optimiste", "Mystérieux", "Loyal"];

// --- 5. Données "Arbres Généalogiques" ---
const familyTreeData = {
  mer: {
    nom: "Famille Royale des Ailes de Mer", cycle: 1,
    patriarche: {
      nom: "Reine Corail", conjoint: "Roi Branchie",
      enfants: [ { nom: "Tsunami (Princesse)" }, { nom: "Anémone (Princesse, Animus)" }, { nom: "Triton (Prince, Animus)" }, { nom: "Auklet (Princesse)" }, ]
    }
  },
  nuitGlace: {
    nom: "Lignée de Sinistre", cycle: 2,
    patriarche: {
      nom: "Prince Arcturus (Aile de Glace, Animus)", conjoint: "Flocon (Aile de Nuit)",
      enfants: [ { nom: "Sinistre (Hybride, Animus)" }, { nom: "Clairvoyante (Hybride)" }, ]
    }
  },
  sable: {
    nom: "Lignée de la Reine Oasis", cycle: 1,
    patriarche: {
      nom: "Reine Oasis",
      enfants: [ { nom: "Fournaise (Princesse, V.F.)" }, { nom: "Fièvre (Princesse, V.F.)" }, { nom: "Flamme (Princesse, V.F.)" }, ]
    }
  }
};

// --- NOUVEAU : 6. Données "Lieux Notables" ---
const locationsData = [
  { 
    name: "Académie de la Montagne de Jade", 
    cycle: 2, 
    img: "https://placehold.co/600x300/32CD32/FFFFFF?text=Montagne+de+Jade",
    desc: "Fondée par les dragonnets du destin après la guerre pour unir tous les clans. C'est le lieu principal de l'Cycle 2, construit à l'intérieur de la montagne." 
  },
  { 
    name: "L'Arène des Ailes du Ciel", 
    cycle: 1,
    img: "https://placehold.co/600x300/FF4500/FFFFFF?text=Ar%C3%A8ne+du+Ciel",
    desc: "L'arène de combat de la Reine Scarlet. C'est là que les prisonniers étaient forcés de se battre à mort pour le divertissement de la reine. Argil et Tsunami y ont combattu." 
  },
  { 
    name: "L'Île Volcanique des Ailes de Nuit", 
    cycle: 1, 
    img: "https://placehold.co/600x300/191970/FFFFFF?text=%C3%8Ele+Volcanique",
    desc: "La demeure secrète et misérable des Ailes de Nuit pendant des siècles. Un volcan actif, un manque de nourriture et un climat de peur y régnaient." 
  },
  { 
    name: "Palais d'Été des Ailes de Mer", 
    cycle: 1, 
    img: "https://placehold.co/600x300/00008B/FFFFFF?text=Palais+d%27%C3%89t%C3%A9",
    desc: "Un palais magnifique construit dans des grottes marines, accessible uniquement par des tunnels sous-marins. Il a été détruit lors du massacre orchestré par Albatros." 
  },
  { 
    name: "Les Ruches de Pantala", 
    cycle: 3, 
    img: "https://placehold.co/600x300/FFFF00/000000?text=Les+Ruches",
    desc: "Les 'villes' des Ailes de Guêpe et de Soie. D'immenses structures d'arbres interconnectées et contrôlées par la Reine Guêpe." 
  },
];

// --- Composant StyleInjector (MIS À JOUR AVEC POLICES) ---
const StyleInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@400;700&display=swap');
    
    /* Importation des polices de clans */
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@700&family=Pacifico&family=EB+Garamond:wght@700&family=Pathway+Gothic+One&family=Anton&family=Julius+Sans+One&family=Great+Vibes&family=Russo+One&family=Arvo:wght@700&display=swap');

    body, .font-sans {
      font-family: 'Lato', sans-serif;
    }
    
    .font-serif, h1, h2, h3, h4, h5, h6 {
      font-family: 'Cinzel', serif;
    }
    
    /* Polices par clan */
    .font-clan-boue { font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px; }
    .font-clan-mer { font-family: 'Dancing Script', cursive; font-size: 1.4rem; }
    .font-clan-pluie { font-family: 'Pacifico', cursive; font-size: 1.3rem; }
    .font-clan-nuit { font-family: 'EB Garamond', serif; }
    .font-clan-sable { font-family: 'Pathway Gothic One', sans-serif; font-size: 1.4rem; }
    .font-clan-ciel { font-family: 'Anton', sans-serif; letter-spacing: 0.5px; }
    .font-clan-glace { font-family: 'Julius Sans One', sans-serif; }
    .font-clan-soie { font-family: 'Great Vibes', cursive; font-size: 1.7rem; }
    .font-clan-guepe { font-family: 'Russo One', sans-serif; }
    .font-clan-feuille { font-family: 'Arvo', serif; }
    
    /* Polices pour hybrides (basées sur le clan dominant) */
    .font-clan-hybride-sable-nuit { font-family: 'Pathway Gothic One', sans-serif; font-size: 1.4rem; }
    .font-clan-hybride-nuit-glace { font-family: 'EB Garamond', serif; }
    .font-clan-hybride-mer-glace { font-family: 'Dancing Script', cursive; font-size: 1.4rem; }


    /* Animations de Page */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }

    /* Animations de Quiz */
    @keyframes pulseCorrect {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    .animate-pulseCorrect {
      animation: pulseCorrect 0.4s ease-in-out 2;
      background-color: #16a34a !important; /* Force le vert */
    }

    @keyframes shakeIncorrect {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .animate-shakeIncorrect {
      animation: shakeIncorrect 0.4s ease-in-out;
      background-color: #dc2626 !important; /* Force le rouge */
    }
    
    /* NOUVEAU : Style pour Arbre Généalogique */
    .tree ul {
      padding-top: 20px; position: relative;
      transition: all 0.5s;
    }

    .tree li {
      float: left; text-align: center;
      list-style-type: none;
      position: relative;
      padding: 20px 5px 0 5px;
      transition: all 0.5s;
    }

    /* Lignes de connexion */
    .tree li::before, .tree li::after{
      content: '';
      position: absolute; top: 0; right: 50%;
      border-top: 2px solid #ccc;
      width: 50%; height: 20px;
    }
    .tree li::after{
      right: auto; left: 50%;
      border-left: 2px solid #ccc;
    }
    
    /* Enlever les lignes pour le premier/dernier enfant */
    .tree li:only-child::after, .tree li:only-child::before {
      display: none;
    }
    .tree li:only-child{ padding-top: 0;}
    .tree li:first-child::before, .tree li:last-child::after{
      border: 0 none;
    }
    .tree li:last-child::before{
      border-right: 2px solid #ccc;
      border-radius: 0 5px 0 0;
    }
    .tree li:first-child::after{
      border-radius: 5px 0 0 0;
    }

    /* Ligne du bas */
    .tree ul ul::before{
      content: '';
      position: absolute; top: 0; left: 50%;
      border-left: 2px solid #ccc;
      width: 0; height: 20px;
    }

    .tree li div{
      border: 2px solid #ccc;
      padding: 10px 15px;
      text-decoration: none;
      color: #eee;
      background-color: #4A5568; /* bg-gray-700 */
      font-family: 'Cinzel', serif;
      display: inline-block;
      border-radius: 8px;
      transition: all 0.5s;
    }
    .tree li div:hover {
      background-color: #2D3748; /* bg-gray-800 */
      border-color: #F6AD55; /* border-orange-400 */
    }
    
    /* Style pour conjoint */
    .tree .conjoint {
      color: #F6AD55; /* text-orange-400 */
      font-style: italic;
    }

  `}</style>
);

// --- NOUVEAU : Composant Dropdown (pour Navbar) ---
const NavDropdown = ({ title, children, isOpen, setIsOpen, closeOthers }) => {
  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      closeOthers(); // Ferme les autres avant d'ouvrir
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200 text-sm md:text-base flex items-center"
      >
        {title}
        <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-50 py-1 border border-gray-700"
          onClick={() => setIsOpen(false)} // Ferme au clic sur un item
        >
          {children}
        </div>
      )}
    </div>
  );
};

// --- NOUVEAU : Composant Navbar (Mis à jour avec Dropdowns) ---
const Navbar = ({ setCurrentPage }) => {
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [activitesOpen, setActivitesOpen] = useState(false);

  const closeAllDropdowns = () => {
    setExplorerOpen(false);
    setActivitesOpen(false);
  };
  
  const navItemClasses = "block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer transition-colors duration-200";
  const simpleNavItemClasses = "px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200 text-sm md:text-base";

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-white font-serif">
          Les Royaumes de Feu
        </div>
        <div className="flex flex-wrap justify-end space-x-1 md:space-x-2">
          <span className={simpleNavItemClasses} onClick={() => { closeAllDropdowns(); setCurrentPage('accueil'); }}>Accueil</span>
          <span className={simpleNavItemClasses} onClick={() => { closeAllDropdowns(); setCurrentPage('livres'); }}>Livres</span>

          {/* Dropdown "Explorer" */}
          <NavDropdown
            title="Explorer"
            isOpen={explorerOpen}
            setIsOpen={setExplorerOpen}
            closeOthers={() => setActivitesOpen(false)}
          >
            <span className={navItemClasses} onClick={() => setCurrentPage('monde')}>Monde</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('clans')}>Clans</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('personnages')}>Personnages</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('lieux')}>Lieux Notables</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('propheties')}>Prophéties</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('animus')}>Magie Animus</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('familles')}>Familles Royales</span>
          </NavDropdown>

          {/* Dropdown "Activités" */}
          <NavDropdown
            title="Activités"
            isOpen={activitesOpen}
            setIsOpen={setActivitesOpen}
            closeOthers={() => setExplorerOpen(false)}
          >
            <span className={navItemClasses} onClick={() => setCurrentPage('quiz')}>Hub de Quiz</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('oc_generator')}>Générateur d'OC</span>
            <span className={navItemClasses} onClick={() => setCurrentPage('galerie')}>Galerie</span>
          </NavDropdown>

          {/* --- NOUVEAU BOUTON "ENCYCLOPÉDIE" --- */}
          <span 
            className={simpleNavItemClasses} 
            onClick={() => { closeAllDropdowns(); setCurrentPage('encyclopedie'); }}>
            Encyclopédie & Aide
          </span>

        </div>
      </div>
      {/* Fond cliquable pour fermer les dropdowns */}
      {(explorerOpen || activitesOpen) && (
        <div 
          onClick={closeAllDropdowns}
          className="fixed inset-0 h-full w-full z-40"
        />
      )}
    </nav>
  );
};

// --- Composant Bouton "Retour" ---
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mb-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
  >
    &larr; Retour
  </button>
);

// --- Composant générique pour les onglets ---
const TabButton = ({ label, isActive, onClick }) => {
  const baseTabClass = "py-2 px-6 rounded-lg font-semibold transition-colors duration-200";
  const activeTabClass = "bg-orange-600 text-white";
  const inactiveTabClass = "bg-gray-700 text-gray-300 hover:bg-gray-600";
  return (
    <button 
      onClick={onClick}
      className={`${baseTabClass} ${isActive ? activeTabClass : inactiveTabClass}`}
    >
      {label}
    </button>
  );
};

// --- Composant HomePage (Accueil) ---
const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl shadow-lg overflow-hidden">
        <div 
          className="h-64 md:h-80 bg-cover bg-center"
          style={{ backgroundImage: "url('https://placehold.co/1200x400/2D3748/FFFFFF?text=Bienvenue+sur+le+Wiki')" }}
        >
          <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold font-serif">Les Royaumes de Feu</h1>
              <p className="text-gray-300 text-lg md:text-xl mt-4 font-sans">Explorez les mondes de Pyrrhia et Pantala.</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-10">
          <h2 className="text-3xl font-serif text-white mb-6">Accès Rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <button
              onClick={() => setCurrentPage('clans')}
              className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
            >
              <h3 className="text-xl font-serif text-orange-400">Les Clans</h3>
              <p className="text-gray-300 mt-2">Découvrez les 10 clans de dragons, leurs pouvoirs et leurs reines.</p>
            </button>
            
            <button
              onClick={() => setCurrentPage('personnages')}
              className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
            >
              <h3 className="text-xl font-serif text-orange-400">Personnages</h3>
              <p className="text-gray-300 mt-2">Rencontrez les héros, antagonistes et familles royales des trois cycles.</p>
            </button>

            <button
              onClick={() => setCurrentPage('quiz')}
              className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
            >
              <h3 className="text-xl font-serif text-orange-400">Hub de Quiz</h3>
              <p className="text-gray-300 mt-2">Testez vos connaissances et découvrez quel dragon vous êtes !</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Composant "Guide des Livres" (MISE À JOUR COMPLÈTE) ---
const BookGuidePage = () => {
  const [activeTab, setActiveTab] = useState('cycle1');

  const tabs = [
    { id: 'cycle1', label: 'Cycle 1' },
    { id: 'cycle2', label: 'Cycle 2' },
    { id: 'cycle3', label: 'Cycle 3' },
    { id: 'horsSeries', label: 'Hors-Séries' },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-6">Guide des Livres</h1>
      
      {/* Onglets pour les livres */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <TabButton 
            key={tab.id} 
            label={tab.label} 
            isActive={activeTab === tab.id} 
            onClick={() => setActiveTab(tab.id)} 
          />
        ))}
      </div>

      {/* Grille de livres */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {booksData[activeTab].map((book) => (
          <div key={book.tome} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform duration-200">
            <div className="relative">
              <img src={book.couv} alt={book.titre} className="w-full h-auto object-cover" />
              <div className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {typeof book.tome === 'number' ? `Tome ${book.tome}` : book.tome}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-serif text-white mb-2 leading-tight">{book.titre}</h3>
              <p className="text-sm text-gray-400 flex-grow">{book.resume}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Composant "Monde" (Cartes) ---
const WorldPage = () => {
  const [activeMap, setActiveMap] = useState('pyrrhia');

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-6">Les Mondes</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <TabButton label="Pyrrhia" isActive={activeMap === 'pyrrhia'} onClick={() => setActiveMap('pyrrhia')} />
        <TabButton label="Pantala" isActive={activeMap === 'pantala'} onClick={() => setActiveMap('pantala')} />
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        {activeMap === 'pyrrhia' && (
          <div>
            <h2 className="text-3xl font-serif text-orange-400 mb-4">Pyrrhia</h2>
            <img src="https://placehold.co/1000x800/2D3748/FFFFFF?text=Carte+de+Pyrrhia" alt="Carte de Pyrrhia" className="w-full h-auto rounded-lg" />
            <p className="text-gray-300 mt-4">Le continent principal, abritant les 7 clans : Ailes de Boue, Mer, Pluie, Nuit, Sable, Ciel et Glace.</p>
          </div>
        )}
        {activeMap === 'pantala' && (
          <div>
            <h2 className="text-3xl font-serif text-orange-400 mb-4">Pantala</h2>
            <img src="https://placehold.co/1000x800/2D3748/FFFFFF?text=Carte+de+Pantala" alt="Carte de Pantala" className="w-full h-auto rounded-lg" />
            <p className="text-gray-300 mt-4">Le 'Continent Perdu', abritant les Ailes de Soie, de Guêpe et de Feuille.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Composant "Lieux Notables" ---
const LocationsPage = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-8">Lieux Notables</h1>
      <div className="space-y-8">
        {locationsData.map((loc) => (
          <div key={loc.name} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={loc.img} alt={loc.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-3xl font-serif text-orange-400 mb-2">{loc.name}</h2>
              <span className="inline-block bg-gray-700 text-orange-300 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Cycle {loc.cycle}
              </span>
              <p className="text-gray-300">{loc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Composant "Prophéties" ---
const PropheciesPage = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-8">Prophéties & Magie</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-serif text-orange-400 mb-4">Les Prophéties</h2>
        {propheciesData.map((prophecy, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-serif text-white mb-2">{prophecy.titre}</h3>
            <p className="text-gray-300 whitespace-pre-wrap font-sans italic">{prophecy.texte}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Composant "Magie Animus" ---
const AnimusPage = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-8">La Magie Animus</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-serif text-orange-400 mb-4">Qu'est-ce que c'est ?</h2>
        <p className="text-gray-300 mb-6">{animusData.description}</p>

        <h2 className="text-3xl font-serif text-red-500 mb-4">Les Dangers</h2>
        <p className="text-gray-300 mb-6">{animusData.dangers}</p>
        
        <h2 className="text-3xl font-serif text-blue-400 mb-4">Animus Connus</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {animusData.dragonsConnus.map((dragon, index) => (
            <li key={index}>{dragon}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- Composant "Arbres Généalogiques" ---
const FamilyTreePage = () => {
  const [activeTree, setActiveTree] = useState(Object.keys(familyTreeData)[0]);
  const tree = familyTreeData[activeTree];

  // Composant récursif pour afficher l'arbre
  const RenderTree = ({ node }) => (
    <li>
      <div>
        {node.nom}
        {node.conjoint && <span className="block text-sm conjoint">(+ {node.conjoint})</span>}
      </div>
      {node.enfants && node.enfants.length > 0 && (
        <ul>
          {node.enfants.map((enfant, index) => (
            <RenderTree key={index} node={enfant} />
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-6">Familles Royales</h1>
      
      <div className="flex justify-center space-x-4 mb-6 overflow-x-auto">
        {Object.keys(familyTreeData).map((key) => (
          <TabButton
            key={key}
            label={familyTreeData[key].nom}
            isActive={activeTree === key}
            onClick={() => setActiveTree(key)}
          />
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-3xl font-serif text-orange-400 mb-4 text-center">{tree.nom}</h2>
        <div className="tree">
          <ul>
            <RenderTree node={tree.patriarche} />
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- Composant "Galerie" ---
const GalleryPage = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-8">Galerie</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImageData.map((img, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={img.url} alt={img.nom} className="w-full h-auto object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-serif text-white text-center">{img.nom}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Composant "Générateur d'OC" ---
const OCGeneratorPage = () => {
  const [generatedOC, setGeneratedOC] = useState(null);

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateOC = () => {
    const clanIds = Object.keys(ocNameParts);
    const randomClanId = getRandomItem(clanIds);
    const randomName = getRandomItem(ocNameParts[randomClanId]);
    const randomTrait = getRandomItem(ocTraits);
    const clanInfo = clansData.find(c => c.id === randomClanId) || { name: randomClanId };
    
    setGeneratedOC({
      clanId: randomClanId,
      clanName: clanInfo.name,
      name: randomName,
      trait: randomTrait,
    });
  };

  return (
    <div className="p-4 md:p-8 text-center">
      <h1 className="text-4xl font-serif text-white mb-6">Générateur de Personnage</h1>
      <p className="text-gray-300 mb-8">Créez votre propre dragon des Royaumes de Feu !</p>
      
      <button
        onClick={generateOC}
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-200"
      >
        Générer !
      </button>

      {generatedOC && (
        <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-serif text-orange-400 mb-4">Votre Dragon :</h2>
          <p className={`text-3xl text-white mb-2 font-clan-${generatedOC.clanId}`}>
            {generatedOC.name}
          </p>
          <p className="text-xl text-gray-300">
            Un(e) <span className="font-bold">{generatedOC.clanName}</span>
          </p>
          <p className="text-xl text-gray-300">
            ...qui est <span className="font-bold">{generatedOC.trait.toLowerCase()}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

// --- Composant "Page des Clans" (avec détails) ---
const ClansPage = () => {
  const [filter, setFilter] = useState('tous');
  const [selectedClan, setSelectedClan] = useState(null);

  const filteredClans = clansData.filter(clan => {
    if (filter === 'tous') return true;
    return clan.continent.toLowerCase() === filter;
  });

  if (selectedClan) {
    const clan = selectedClan;
    return (
      <div className="p-4 md:p-8">
        <BackButton onClick={() => setSelectedClan(null)} />
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img src={clan.img} alt={clan.name} className="w-full h-64 md:h-80 object-cover" />
          <div className="p-6 md:p-8">
            <h1 className={`text-4xl md:text-5xl font-clan-${clan.id} text-white mb-2`}>{clan.name}</h1>
            <span className="inline-block bg-gray-700 text-orange-300 text-sm font-semibold px-3 py-1 rounded-full mb-6">
              Continent : {clan.continent}
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-serif text-orange-400 mb-2">Apparence</h3>
                <p className="text-gray-300">{clan.apparence}</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-orange-400 mb-2">Capacités</h3>
                <p className="text-gray-300">{clan.capacites}</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-orange-400 mb-2">Société</h3>
                <p className="text-gray-300">{clan.societe}</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-orange-400 mb-2">Territoire</h3>
                <p className="text-gray-300">{clan.territoire}</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-2xl font-serif text-orange-400 mb-2">Reine Actuelle</h3>
              <p className="text-gray-300 text-xl">{clan.reine}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-6">Les Clans Draconiques</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <TabButton label="Tous" isActive={filter === 'tous'} onClick={() => setFilter('tous')} />
        <TabButton label="Pyrrhia" isActive={filter === 'pyrrhia'} onClick={() => setFilter('pyrrhia')} />
        <TabButton label="Pantala" isActive={filter === 'pantala'} onClick={() => setFilter('pantala')} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClans.map((clan) => (
          <div 
            key={clan.id} 
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={() => setSelectedClan(clan)}
          >
            <img src={clan.img} alt={clan.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className={`text-2xl font-clan-${clan.id} text-white text-center`}>{clan.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Composant "Page des Personnages" ---
const CharactersPage = () => {
  const [activeTab, setActiveTab] = useState('cycle1');

  const tabs = {
    'cycle1': { label: "Cycle 1", data: protagonistsCycle1 },
    'cycle2': { label: "Cycle 2", data: protagonistsCycle2 },
    'cycle3': { label: "Cycle 3", data: protagonistsCycle3 },
    'antagonistes': { label: "Antagonistes", data: antagonistsData },
    'royaute': { label: "Royauté", data: royaltyData },
    'hybrides': { label: "Hybrides", data: hybridsList },
  };

  const renderCharacterList = (characters) => (
    <div className="space-y-4">
      {characters.map((char) => (
        <div key={char.name} className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className={`text-2xl text-white font-clan-${char.clanId}`}>{char.name}</h3>
          <span className="text-sm text-orange-400 font-semibold">{char.clan} {char.cycle ? `(Cycle ${char.cycle})` : ''}</span>
          <p className="text-gray-300 mt-2">{char.desc}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-serif text-white mb-6">Personnages</h1>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {Object.keys(tabs).map((key) => (
          <TabButton
            key={key}
            label={tabs[key].label}
            isActive={activeTab === key}
            onClick={() => setActiveTab(key)}
          />
        ))}
      </div>
      
      <div>
        {renderCharacterList(tabs[activeTab].data)}
      </div>
    </div>
  );
};

// --- Composant "Quiz Hub" ---
const QuizHubPage = ({ setCurrentPage }) => {
  return (
    <div className="p-4 md:p-8 text-center">
      <h1 className="text-4xl font-serif text-white mb-8">Hub de Quiz</h1>
      <div className="max-w-lg mx-auto space-y-4">
        <button
          onClick={() => setCurrentPage('quiz_normal')}
          className="w-full p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
        >
          <h3 className="text-xl font-serif text-orange-400">Quiz de Connaissances</h3>
          <p className="text-gray-300 mt-2">Testez vos connaissances de base sur l'Cycle 1.</p>
        </button>
        <button
          onClick={() => setCurrentPage('quiz_expert')}
          className="w-full p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
        >
          <h3 className="text-xl font-serif text-orange-400">Quiz Expert</h3>
          <p className="text-gray-300 mt-2">Pensez-vous tout savoir ? Relevez le défi !</p>
        </button>
        <button
          onClick={() => setCurrentPage('quiz_perso')}
          className="w-full p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
        >
          <h3 className="text-xl font-serif text-orange-400">Quiz : Quel Clan es-tu ?</h3>
          <p className="text-gray-300 mt-2">Découvrez à quel clan de Pyrrhia vous appartenez.</p>
        </button>
        <button
          onClick={() => setCurrentPage('quiz_destin')}
          className="w-full p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-left"
        >
          <h3 className="text-xl font-serif text-orange-400">Quiz : Quel Dragonnet es-tu ?</h3>
          <p className="text-gray-300 mt-2">Ressemblez-vous plus à Argil, Tsunami, Gloria, Comète ou Sunny ?</p>
        </button>
      </div>
    </div>
  );
};

// --- Composant "Quiz" (Générique) ---
const QuizComponent = ({ title, questions, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // L'option choisie
  const [isCorrect, setIsCorrect] = useState(null); // true, false, ou null

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // Empêche de cliquer plusieurs fois

    const correct = option === currentQuestion.correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 1500); // Délai pour voir la correction
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const getButtonClass = (option) => {
    const baseClass = "w-full p-4 rounded-lg text-left transition-all duration-300 disabled:opacity-70";
    
    if (selectedAnswer === null) {
      return `${baseClass} bg-gray-700 hover:bg-gray-600`;
    }

    if (option === selectedAnswer) {
      return `${baseClass} ${isCorrect ? 'animate-pulseCorrect' : 'animate-shakeIncorrect'}`;
    }
    
    if (option === currentQuestion.correctAnswer) {
      return `${baseClass} bg-green-700`; // Montre la bonne réponse si on s'est trompé
    }
    
    return `${baseClass} bg-gray-700 opacity-50`;
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <BackButton onClick={onBack} />
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
        {showResults ? (
          <div className="text-center">
            <h2 className="text-3xl font-serif text-white mb-4">Résultats du Quiz</h2>
            <p className="text-2xl text-orange-400 mb-6">
              Votre score : {score} / {questions.length}
            </p>
            <button
              onClick={restartQuiz}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration
