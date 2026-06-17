/* Jeux Import Export Tahiti catalogue de démo
   Prix en F CFP (entiers). Format d'affichage : "2 500 F". */

const universes = [
  { id: "pokemon",   name: "Cartes Pokémon",       short: "Pokémon",     emoji: "⚡", tint: "#FFE08A", desc: "Displays, ETB, boosters et coffrets collector." },
  { id: "yugioh",    name: "Cartes Yu-Gi-Oh!",     short: "Yu-Gi-Oh!",   emoji: "🐉", tint: "#C9B8FF", desc: "Decks de structure, displays et tins méga-pack." },
  { id: "societe",   name: "Jeux de société",      short: "Société",     emoji: "🎲", tint: "#A9E5D6", desc: "Familiaux, ambiance, stratégie et apéro." },
  { id: "jouets",    name: "Jouets & Lego",        short: "Jouets & Lego", emoji: "🧱", tint: "#FFC7B8", desc: "Sets LEGO, figurines, peluches et plus." },
  { id: "manga",     name: "Manga & Goodies",      short: "Manga",       emoji: "📚", tint: "#FFB8CE", desc: "Tomes, haori, tasses, t-shirts, porte-clés." },
  { id: "logique",   name: "Jeux de logique",      short: "Logique",     emoji: "🧩", tint: "#FFE0A8", desc: "Casse-tête, escape games, puzzles, réflexion et speedcubes." },
];

function P(id, univers, name, price, opts = {}) {
  return Object.assign(
    {
      id, univers, name, price,
      badges: [],
      boutique: true,
      stock: 12,
      best: false,
      rating: 4.7,
      reviews: 0,
      desc: "",
      details: [],
    },
    opts
  );
}

const products = [
  // ───── Pokémon ─────
  P("pk-ev-display", "pokemon", "Display Écarlate & Violet Évolutions Prismatiques", 32900, { badges:["nouveau"], best:true, stock:6, reviews:48, rating:4.9, img:"assets/prod-pk-display.webp?v=1",
    desc:"Le display complet de 36 boosters de l'extension la plus chassée du moment. Idéal pour les ouvreurs et les collectionneurs.", details:["36 boosters scellés","Édition française","Extension EV08"] }),
  P("pk-etb-151", "pokemon", "Coffret Dresseur d'Élite (ETB) 151", 8900, { badges:["limite"], best:true, stock:3, reviews:120, rating:4.8, img:"assets/prod-pk-etb.webp?v=1",
    desc:"Le retour des 151 premiers Pokémon dans un ETB premium : boosters, sleeves, dés et rangement.", details:["9 boosters","65 protège-cartes","Édition française"] }),
  P("pk-booster-evo", "pokemon", "Booster Évolutions Prismatiques", 750, { reviews:33, stock:60, img:"assets/prod-pk-booster.webp?v=1",
    desc:"Le booster à l'unité pour tenter la chance sans casser la tirelire.", details:["10 cartes par booster","Édition française"] }),
  P("pk-tin-mew", "pokemon", "Pokébox Tin Mewtwo ex", 4200, { badges:["nouveau"], reviews:18, stock:9, oldPrice:4990, img:"assets/prod-pk-tin.webp?v=1",
    desc:"Une boîte métal collector avec carte promo brillante et boosters.", details:["1 carte promo","4 boosters","Boîte métal"] }),
  P("pk-coffret-premium", "pokemon", "Coffret Collection Premium Dracaufeu ex", 12500, { badges:["limite"], best:true, stock:2, reviews:64, rating:4.9, img:"assets/prod-pk-premium.webp?v=1",
    desc:"Figurine, carte ultra-premium et boosters dans un écrin collector.", details:["1 figurine","1 carte jumbo","6 boosters"] }),
  P("pk-classeur", "pokemon", "Classeur de rangement 9 cases 360 cartes", 3500, { reviews:27, stock:25, oldPrice:3990, img:"assets/prod-pk-classeur.webp?v=1",
    desc:"Protégez votre collection avec ce classeur grand format à anneaux.", details:["20 pages 9 cases","360 cartes","Fermeture zip"] }),

  // ───── Yu-Gi-Oh ─────
  P("yg-display-age", "yugioh", "Display Yu-Gi-Oh! Age of Overlord", 28900, { badges:["nouveau"], best:true, stock:5, reviews:22, rating:4.8, img:"assets/prod-yg-display.webp?v=1",
    desc:"Boîte de 24 boosters de l'extension Age of Overlord. 9 cartes par booster, édition française.", details:["24 boosters","Édition française","9 cartes par booster"] }),
  P("yg-structure", "yugioh", "Deck de Structure Saga du Dragon Bleu", 2900, { best:true, reviews:41, stock:20, oldPrice:3400, img:"assets/prod-yg-structure.webp?v=1",
    desc:"Un deck prêt à jouer, parfait pour débuter ou renforcer un thème iconique.", details:["46 cartes","Guide de stratégie","Prêt à jouer"] }),
  P("yg-tin-2025", "yugioh", "Tin Méga-Pack 2025", 5200, { badges:["limite"], reviews:30, stock:4, rating:4.7, img:"assets/prod-yg-tin.webp?v=1",
    desc:"La boîte métal de fin d'année avec cartes promo et boosters variés.", details:["3 boosters Méga-Pack","3 cartes promo","Boîte métal"] }),
  P("yg-booster-rage", "yugioh", "Booster Rage des Abysses", 690, { reviews:12, stock:0, img:"assets/prod-yg-booster.webp?v=1",
    desc:"Un booster à l'unité pour compléter votre collection.", details:["9 cartes","Édition française"] }),
  P("yg-sleeves", "yugioh", "Protège-cartes Dragon Shield", 1200, { reviews:9, stock:30, img:"assets/prod-yg-sleeves.webp?v=1",
    desc:"Sleeves taille japonaise pour cartes Yu-Gi-Oh!", details:["60 sleeves","Format japonais","Finition matte"] }),
  P("yg-playmat", "yugioh", "Tapis de jeu néoprène", 4500, { badges:["nouveau"], reviews:5, stock:8, img:"assets/prod-yg-playmat.webp?v=1",
    desc:"Surface de duel antidérapante pour jouer dans les meilleures conditions.", details:["60 × 35 cm","Base caoutchouc","Surface tissée"] }),

  // ───── Société ─────
  P("so-catan", "societe", "Catan Le jeu de base", 7900, { best:true, reviews:210, rating:4.8, stock:14, oldPrice:8900, img:"assets/prod-so-catan.webp?v=1",
    desc:"Le classique de la négociation et de la conquête d'île. 3 à 4 joueurs.", details:["3–4 joueurs","Dès 10 ans","75 min"] }),
  P("so-7wonders", "societe", "7 Wonders", 6900, { best:true, reviews:156, rating:4.9, stock:10, oldPrice:7900, img:"assets/prod-so-7wonders.webp?v=1",
    desc:"Bâtissez une cité antique en draftant des cartes. Fluide jusqu'à 7 joueurs.", details:["3–7 joueurs","Dès 10 ans","30 min"] }),
  P("so-dixit", "societe", "Dixit", 5900, { reviews:98, rating:4.8, stock:12, oldPrice:6500, img:"assets/prod-so-dixit.webp?v=1",
    desc:"Un jeu d'images poétiques et d'intuition. Parfait en famille ou entre amis.", details:["3–6 joueurs","Dès 8 ans","30 min"] }),
  P("so-skyjo", "societe", "Skyjo", 2900, { badges:["limite"], best:true, reviews:140, rating:4.7, stock:4, img:"assets/prod-so-skyjo.webp?v=1",
    desc:"Le petit jeu de cartes addictif où il faut le moins de points possible.", details:["2–8 joueurs","Dès 8 ans","30 min"] }),
  P("so-loups", "societe", "Les Loups-Garous de Thiercelieux", 2200, { reviews:75, stock:18, img:"assets/prod-so-loups.webp?v=1",
    desc:"Bluff et débats nocturnes dans un village hanté par les loups-garous.", details:["8–18 joueurs","Dès 10 ans","30 min"] }),
  P("so-timesup", "societe", "Time's Up! Party", 3900, { badges:["nouveau"], reviews:62, stock:9, img:"assets/prod-so-timesup.webp?v=1",
    desc:"Le jeu d'ambiance par excellence : faites deviner un max de célébrités.", details:["4–12 joueurs","Dès 12 ans","60 min"] }),
  P("so-carcassonne", "societe", "Carcassonne", 5500, { reviews:88, stock:11, oldPrice:6200, img:"assets/prod-so-carcassonne.webp?v=1",
    desc:"Posez des tuiles et placez vos partisans pour marquer routes, villes et abbayes.", details:["2–5 joueurs","Dès 7 ans","40 min"] }),
  P("so-uno", "societe", "UNO", 1500, { reviews:54, stock:40, img:"assets/prod-so-uno.webp?v=1",
    desc:"Le grand classique des cartes à abattre. Indémodable.", details:["2–10 joueurs","Dès 7 ans","20 min"] }),

  // ───── Jouets & Lego ─────
  P("jo-lego-bouquet", "jouets", "LEGO Botanical Bouquet de fleurs", 6900, { best:true, reviews:46, rating:4.9, stock:8, oldPrice:7900, img:"assets/prod-jo-bouquet.webp?v=1",
    desc:"Un bouquet à monter et à exposer, ne fane jamais. Idée cadeau sûre.", details:["756 pièces","Dès 18 ans","Collection Botanical"] }),
  P("jo-lego-city", "jouets", "LEGO City Caserne de pompiers", 8900, { reviews:33, stock:0, img:"assets/prod-jo-city.webp?v=1",
    desc:"Caserne complète avec véhicules et figurines pour des heures de jeu.", details:["540 pièces","Dès 6 ans"] }),
  P("jo-lego-star", "jouets", "LEGO Star Wars Chasseur", 12900, { badges:["limite"], best:true, reviews:71, rating:4.8, stock:3, img:"assets/prod-jo-star.webp?v=1",
    desc:"Un vaisseau iconique détaillé avec minifigurines à collectionner.", details:["475 pièces","Dès 9 ans"] }),
  P("jo-peluche", "jouets", "Peluche Pikachu 30 cm", 3900, { badges:["nouveau"], reviews:28, stock:15, img:"assets/prod-jo-peluche.webp?v=1",
    desc:"Toute douce et officielle, à câliner ou à exposer.", details:["30 cm","Licence officielle","Lavable surface"] }),
  P("jo-playmobil", "jouets", "Playmobil Bateau pirate", 9900, { reviews:19, stock:7, img:"assets/prod-jo-playmobil.webp?v=1",
    desc:"Un grand bateau pirate avec accessoires et personnages.", details:["Dès 5 ans","Flotte sur l'eau"] }),

  // ───── Manga & Goodies ─────
  P("mg-onepiece", "manga", "One Piece Tome 108", 1500, { badges:["nouveau"], best:true, reviews:90, rating:4.9, stock:22, img:"assets/prod-mg-onepiece.webp?v=1",
    desc:"Le dernier tome paru de la plus grande aventure de pirates.", details:["Édition française","Glénat","192 pages"] }),
  P("mg-jjk", "manga", "Jujutsu Kaisen Coffret tomes 1-5", 7500, { badges:["limite"], reviews:34, stock:4, rating:4.8, img:"assets/prod-mg-jjk.webp?v=1",
    desc:"Un coffret collector pour débuter la série phénomène.", details:["5 tomes","Coffret illustré","Édition française"] }),
  P("mg-haori", "manga", "Haori Demon Slayer Tanjiro", 5900, { badges:["nouveau"], best:true, reviews:51, rating:4.7, stock:9, img:"assets/prod-mg-haori.webp?v=1",
    desc:"Veste haori inspirée du héros, coupe unisexe, tissu doux.", details:["Tailles S–XL","100% polyester","Lavable 30°"] }),
  P("mg-tasse", "manga", "Mug thermoréactif Akatsuki", 2200, { reviews:23, stock:18, oldPrice:2600, img:"assets/prod-mg-mug.webp?v=1",
    desc:"Le motif apparaît au contact d'une boisson chaude. Effet garanti.", details:["350 ml","Thermoréactif","Boîte cadeau"] }),
  P("mg-tshirt", "manga", "T-shirt Attack on Titan", 3500, { reviews:29, stock:14, oldPrice:3990, img:"assets/prod-mg-tshirt.webp?v=1",
    desc:"Coton premium, sérigraphie de qualité, coupe moderne.", details:["Tailles S–XXL","100% coton","Coupe regular"] }),

  // ───── Casse-tête, escape & logique ─────
  P("ca-puzzle1000", "logique", "Puzzle 1000 pièces Lagon de Tahiti", 3500, { badges:["nouveau"], best:true, reviews:41, rating:4.8, stock:12, img:"assets/prod-lo-puzzle1000.webp?v=1",
    desc:"Un panorama de lagon turquoise à reconstituer. Clin d'œil au fenua.", details:["1000 pièces","70 × 50 cm","Poster inclus"] }),
  P("ca-unlock", "logique", "Unlock! Escape game en boîte", 4500, { best:true, reviews:55, rating:4.7, stock:8, oldPrice:4990, img:"assets/prod-lo-unlock.webp?v=1",
    desc:"Vivez un escape game à la maison, en équipe, avec une appli compagnon.", details:["1–6 joueurs","Dès 10 ans","3 scénarios"] }),
  P("ca-exit", "logique", "EXIT Le manoir sinistre", 3200, { reviews:38, stock:0, img:"assets/prod-lo-exit.webp?v=1",
    desc:"Une énigme immersive à usage unique, frissons garantis.", details:["1–4 joueurs","Dès 12 ans","Niveau difficile"] }),
  P("ca-puzzle3d", "logique", "Puzzle 3D Tour Eiffel lumineuse", 5500, { badges:["limite"], reviews:14, stock:3, img:"assets/prod-lo-puzzle3d.webp?v=1",
    desc:"Un puzzle 3D à assembler et à illuminer. Effet bluffant.", details:["216 pièces","LED incluses","Dès 8 ans"] }),

  // ───── Logique ─────
  P("lo-rubik", "logique", "Rubik's Cube 3×3 Speed", 2200, { best:true, reviews:72, rating:4.8, stock:20, oldPrice:2600, img:"assets/prod-lo-rubik.webp?v=1",
    desc:"Le cube de référence, version rapide pour les speedcubers.", details:["3×3","Mécanisme fluide","Stickerless"] }),
  P("lo-katamino", "logique", "Katamino", 3900, { reviews:35, stock:9, oldPrice:4500, img:"assets/prod-lo-katamino.webp?v=1",
    desc:"Un casse-tête évolutif en bois, solo ou en duel. 500 combinaisons.", details:["1–2 joueurs","Dès 3 ans","Bois"] }),
  P("lo-rush", "logique", "Rush Hour Embouteillage", 3500, { reviews:40, stock:7, img:"assets/prod-lo-rush.webp?v=1",
    desc:"Dégagez la voiture rouge en déplaçant les véhicules. 40 défis.", details:["1 joueur","Dès 8 ans","40 défis"] }),
];

function formatF(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " F";
}

function statusRank(p) {
  if (p.stock === 0) return 3;
  if (p.badges.includes("nouveau")) return 0;
  if (p.badges.includes("limite")) return 1;
  return 2;
}

function orderProducts(list) {
  return list.map((p, i) => [p, i]).sort((a, b) => (statusRank(a[0]) - statusRank(b[0])) || (a[1] - b[1])).map((x) => x[0]);
}

export const JIE = { universes, products, formatF, statusRank, orderProducts };
