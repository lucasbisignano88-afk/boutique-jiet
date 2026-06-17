import React, { useRef, useState, useEffect } from 'react'
import { JIE } from './data.js'
import { useStore, getProduct, getUniverse } from './store.jsx'
import { Btn, Ic, ICON, RES, F, ProductCard, ProductImage, ReassuranceRow, Stars } from './components.jsx'
import { Mascot } from './mascot.jsx'
import { SectionHead, UniverseGrid, StoreStrip } from './home.jsx'

const USPS = [
  { ic: "spark", t: "Les meilleurs jeux, à Tahiti" },
  { ic: "truck", t: "Livraison gratuite dès 10 000 F en point relais" },
  { ic: "shop", t: "Retrait gratuit en boutique à Papeete en 1 h" },
];

function UspBar() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % USPS.length), 2600); return () => clearInterval(t); }, []);
  const u = USPS[i];
  return (
    <div className="uspbar">
      <span className="uspbar__item" key={i}><Ic d={ICON[u.ic]} size={15} /> {u.t}</span>
    </div>
  );
}

const FEATURED_RAW = [
  { id: "yg-display-age",  bg: "assets/uni-yugioh.png?v=1",  tagline: "À vous de jouer,\nduelliste." },
  { id: "mg-onepiece",     bg: "assets/uni-manga.png?v=1",   tagline: "Embarquez pour\nla grande aventure." },
  { id: "pk-tin-mew",      bg: "assets/uni-pokemon.png?v=2", tagline: "Une boîte collector\nà ouvrir d'urgence." },
  { id: "so-timesup",      bg: "assets/uni-societe.png?v=3", tagline: "L'ambiance,\nà fond les amis." },
  { id: "jo-peluche",      bg: "assets/uni-jouets.png?v=1",  tagline: "Tout doux,\ntout mignon." },
];

const FEATURED = FEATURED_RAW.filter((f) => {
  const p = getProduct(f.id);
  return p && p.badges.includes("nouveau") && p.stock > 0;
});

function FeaturedCarousel() {
  const { navigate } = useStore();
  const [i, setI] = useState(0);
  const n = FEATURED.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % n), 6000); return () => clearInterval(t); }, [n]);
  const f = FEATURED[i];
  const p = getProduct(f.id);
  if (!p) return null;
  const u = getUniverse(p.univers);
  return (
    <div className="fcaro" style={{ backgroundImage: `url(${RES(f.bg)})` }}>
      <div className="fcaro__scrim" />
      <button className="fcaro__arrow fcaro__arrow--l" aria-label="Précédent" onClick={() => go(-1)}><Ic d={ICON.chevL} size={22} /></button>
      <button className="fcaro__arrow fcaro__arrow--r" aria-label="Suivant" onClick={() => go(1)}><Ic d={ICON.chevR} size={22} /></button>
      <div className="fcaro__inner">
        <div className="fcaro__info">
          <div className="fcaro__thumb" onClick={() => navigate({ name: "product", id: p.id })}>
            <ProductImage product={p} showTag={false} />
          </div>
          <div className="fcaro__meta">
            <span className="fcaro__brand"><span className="fcaro__diamond" /> {u?.short}<span className="fcaro__new">Nouveau</span></span>
            <h2>{p.name}</h2>
            <p>{p.desc}</p>
            <div className="fcaro__foot">
              <span className="fcaro__price">{F(p.price)}</span>
              <Btn variant="primary" onClick={() => navigate({ name: "product", id: p.id })}>Découvrir</Btn>
            </div>
          </div>
        </div>
      </div>
      <div className="fcaro__dots">
        {FEATURED.map((_, k) => <button key={k} className={k === i ? "on" : ""} aria-label={`Vedette ${k + 1}`} onClick={() => setI(k)} />)}
      </div>
    </div>
  );
}

function HeroPromoCol() {
  const { navigate } = useStore();
  const cards = [
    { cls: "gpromo--red gpromo--feature", ic: "sparkles", k: "Fraîchement arrivés", t: "Nouveautés",   d: "Les derniers arrivages du fenua", to: { name: "catalogue", view: "nouveau" } },
    { cls: "gpromo--green",  ic: "tag",      k: "Bonnes affaires",     t: "Bons plans",    d: "Tous les articles en réduction",  to: { name: "catalogue", view: "promo" } },
    { cls: "gpromo--yellow", ic: "flame",    k: "Vite, avant rupture", t: "Stock limité",  d: "Les pièces bientôt épuisées",      to: { name: "catalogue", view: "limite" } },
  ];
  return (
    <div className="hpromocol">
      {cards.map((c, i) => (
        <button key={i} className={`gpromo ${c.cls}`} onClick={() => navigate(c.to)}>
          <span className="gpromo__sheen" aria-hidden="true" />
          <span className="gpromo__deco" aria-hidden="true"><Ic d={ICON[c.ic]} size={150} solid /></span>
          <span className="gpromo__k">{c.k}</span>
          <span className="gpromo__t">{c.t}</span>
          <span className="gpromo__d">{c.d}</span>
          <span className="gpromo__cta">Voir <span className="gpromo__arrow"><Ic d={ICON.arrow} size={16} /></span></span>
        </button>
      ))}
    </div>
  );
}

function FeaturedHero() {
  return (
    <section className="fhero2">
      <FeaturedCarousel />
      <HeroPromoCol />
    </section>
  );
}

const PILIERS = [
  { ic: "heart", solid: true, t: "Sélection testée", d: "Chaque jeu est joué et choisi par l'équipe, pour ne garder que les pépites." },
  { ic: "shop", t: "Retrait en 1 h", d: "Commandez en ligne, récupérez en boutique à Papeete le jour même." },
  { ic: "spark", t: "Arrivages chaque semaine", d: "Cartes, nouveautés et exclus du fenua renouvelées en continu." },
];

function SommelierBand() {
  return (
    <section className="piliers">
      <div className="wrap">
        <div className="piliers__grid">
          {PILIERS.map((p, i) => (
            <div className="pilier" key={i}>
              <span className="pilier__ic"><Ic d={ICON[p.ic]} size={26} solid={p.solid} /></span>
              <div className="pilier__txt"><h3>{p.t}</h3><p>{p.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoeurCard({ product }) {
  const { navigate } = useStore();
  return (
    <article className="ccard" onClick={() => navigate({ name: "product", id: product.id })}>
      <div className="ccard__media"><ProductImage product={product} showTag={false} /></div>
      <h3 className="ccard__name">{product.name}</h3>
      <span className="ccard__price">{F(product.price)}</span>
    </article>
  );
}

function CoupsDeCoeur() {
  const picks = JIE.orderProducts(JIE.products.filter((p) => p.best));
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    const cell = el.querySelector(".cco__cell");
    const w = cell ? cell.offsetWidth + 18 : 200;
    setActive(Math.round(el.scrollLeft / w));
  };
  const scroll = (dir) => {
    const el = ref.current; if (!el) return;
    const cell = el.querySelector(".cco__cell");
    const w = cell ? cell.offsetWidth + 18 : 200;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  const toDot = (k) => {
    const el = ref.current; if (!el) return;
    const cell = el.querySelector(".cco__cell");
    const w = cell ? cell.offsetWidth + 18 : 200;
    el.scrollTo({ left: k * w, behavior: "smooth" });
  };
  return (
    <section className="coeur section">
      <div className="coeur__head">
        <span className="coeur__heart"><Ic d={ICON.heart} size={26} solid /></span>
        <h2>Nos derniers coups de cœur</h2>
        <span className="coeur__rule" />
      </div>
      <div className="coeur__caro">
        <button className="coeur__arrow coeur__arrow--l" aria-label="Précédent" onClick={() => scroll(-1)}><Ic d={ICON.chevL} size={20} /></button>
        <div className="cco__track" ref={ref} onScroll={onScroll}>
          {picks.map((p) => <div className="cco__cell" key={p.id}><CoeurCard product={p} /></div>)}
        </div>
        <button className="coeur__arrow coeur__arrow--r" aria-label="Suivant" onClick={() => scroll(1)}><Ic d={ICON.chevR} size={20} /></button>
      </div>
      <div className="coeur__dots">
        {picks.map((_, k) => <button key={k} className={k === active ? "on" : ""} aria-label={`Aller à ${k + 1}`} onClick={() => toDot(k)} />)}
      </div>
    </section>
  );
}

const REVIEWS = [
  { n: "Heimana", v: "Papeete", d: "10/06/2026", t: "Dispo, prix juste et conseils au top. Je recommande les yeux fermés !" },
  { n: "Vaite", v: "Punaauia", d: "09/06/2026", t: "Commande prête en 1 h pour le retrait. Accueil adorable en boutique." },
  { n: "Manea", v: "Faa'a", d: "07/06/2026", t: "Enfin un vrai choix de cartes Pokémon à Tahiti. Mon fils est ravi." },
  { n: "Tearii", v: "Pirae", d: "05/06/2026", t: "Super sélection de jeux de société, on est toujours bien aiguillés." },
];

function Reviews() {
  return (
    <section className="reviews">
      <div className="wrap">
        <SectionHead kicker="Ils nous font confiance" title="Avis de la communauté" />
        <div className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <figure className="rev" key={i}>
              <Stars rating={5} />
              <blockquote>« {r.t} »</blockquote>
              <figcaption><strong>{r.n}</strong> · {r.v}<span>{r.d}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const ARTICLES = [
  { tag: "Sorties", title: "Les arrivages de la semaine vendredi 13 juin", read: "3 min", img: "societe" },
  { tag: "Sélection", title: "Top 10 des jeux pour vos soirées au fenua", read: "5 min", img: "cassetete" },
  { tag: "Guide", title: "Pokémon : bien démarrer sa collection", read: "4 min", img: "pokemon" },
];

function Journal() {
  const tints = { societe: "assets/uni-societe.png?v=3", pokemon: "assets/uni-pokemon.png?v=2", cassetete: null };
  return (
    <section className="wrap section">
      <SectionHead kicker="Le journal" title="À lire dans la boutique" />
      <div className="journal">
        {ARTICLES.map((a, i) => (
          <article className="jart" key={i}>
            <div className="jart__img" style={tints[a.img] ? { backgroundImage: `url(${RES(tints[a.img])})` } : undefined}>
              {!tints[a.img] && <span className="jart__ph">illustration article</span>}
              <span className="jart__tag">{a.tag}</span>
            </div>
            <div className="jart__body">
              <h3>{a.title}</h3>
              <span className="jart__read">{a.read} de lecture · Lire l'article →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <section className="news">
      <div className="wrap news__in">
        <Mascot size={72} mood="happy" />
        <h2>Rejoignez la partie</h2>
        <p>Chaque semaine, les arrivages et coups de cœur du fenua directement dans votre boîte mail.</p>
        {ok ? (
          <div className="news__ok"><Ic d={ICON.check} size={20} /> Merci, c'est noté&nbsp;!</div>
        ) : (
          <form className="news__form" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setOk(true); }}>
            <input type="email" required placeholder="votre@email.pf" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="E-mail" />
            <Btn variant="primary" size="lg" type="submit">Je m'inscris</Btn>
          </form>
        )}
      </div>
    </section>
  );
}

function Nouveautes() {
  const items = JIE.orderProducts(JIE.products.filter((p) => p.badges.includes("nouveau") || p.badges.includes("limite"))).slice(0, 12);
  const [open, setOpen] = useState(false);
  return (
    <section className="band">
      <div className="wrap section">
        <div className="sechead">
          <div>
            <span className="sechead__kicker">Fraîchement arrivés</span>
            <h2>Nouveautés</h2>
          </div>
          <button className={`unfold ${open ? "is-open" : ""}`} onClick={() => setOpen((o) => !o)}>
            {open ? "Réduire" : "Dérouler"} <Ic d={ICON.chevR} size={16} />
          </button>
        </div>
        {open ? (
          <div className="grid grid--cards">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        ) : (
          <div className="oneline">{items.map((p) => <div className="oneline__cell" key={p.id}><ProductCard product={p} /></div>)}</div>
        )}
      </div>
    </section>
  );
}

export function HomeEditorial() {
  const { navigate } = useStore();
  return (
    <div className="page homeed">
      <UspBar />
      <div className="wrap"><FeaturedHero /></div>
      <SommelierBand />
      <CoupsDeCoeur />
      <section className="wrap section"><SectionHead kicker="Explorez" title="Nos univers" /><UniverseGrid /></section>
      <Nouveautes />
      <Reviews />
      <section className="wrap"><ReassuranceRow /></section>
      <Newsletter />
      <StoreStrip />
    </div>
  );
}
