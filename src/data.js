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

// Produits externalisés : un fichier JSON par produit dans ./content/produits/.
// Chargés au build via import.meta.glob (Vite), puis triés par le champ `order`
// pour reproduire exactement l'ordre d'origine du catalogue.
const productModules = import.meta.glob("./content/produits/*.json", { eager: true });

const products = Object.values(productModules)
  .map((m) => m.default ?? m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
