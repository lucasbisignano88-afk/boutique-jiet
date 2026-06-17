import React, { useRef } from 'react'
import { JIE } from './data.js'
import { useStore, getUniverse } from './store.jsx'
import { Btn, Ic, ICON, RES, F, ProductImage, productBadges, Badge, Stars } from './components.jsx'
import { Mascot } from './mascot.jsx'
import { SectionHead, UniverseGrid, StoreStrip } from './home.jsx'

const pct = (p) => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

function ProductCardMkt({ product, rank }) {
  const { addToCart, navigate } = useStore();
  const out = product.stock === 0;
  const u = getUniverse(product.univers);
  const promo = !!product.oldPrice && !out;
  return (
    <article className={`mcard ${out ? "mcard--out" : ""}`} onClick={() => navigate({ name: "product", id: product.id })}>
      <div className="mcard__media">
        <ProductImage product={product} showTag={false} />
        {rank && rank <= 3 && <span className="macaron"><span>{rank}</span></span>}
        <div className="mcard__badges">
          {promo && <span className="badge badge--promo">-{pct(product)}%</span>}
          {productBadges(product).map((t) => <Badge key={t} type={t} />)}
        </div>
      </div>
      <div className="mcard__body">
        <span className="mcard__uni">{u?.short}</span>
        <h3 className="mcard__name">{product.name}</h3>
        <div className="mcard__rate"><Stars rating={product.rating} reviews={product.reviews} /></div>
        <div className="mcard__price">
          {product.oldPrice && <span className="mcard__old">{F(product.oldPrice)}</span>}
          <span className={`mcard__now ${promo ? "is-promo" : ""}`}>{F(product.price)}</span>
        </div>
        <div className={`mcard__avail ${out ? "is-out" : ""}`}>{out ? "Épuisé" : "● En stock · retrait boutique"}</div>
        {out
          ? <button className="btn btn--outline btn--sm btn--block" disabled>Indisponible</button>
          : <button className="btn btn--primary btn--sm btn--block" onClick={(e) => { e.stopPropagation(); addToCart(product.id, 1); }}>
              <Ic d={ICON.cartPlus} size={16} /> Ajouter au panier
            </button>}
      </div>
    </article>
  );
}

function MktRow({ title, kicker, items, ranked, onMore }) {
  const ref = useRef(null);
  const scroll = (dir) => { const el = ref.current; if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" }); };
  return (
    <section className="mrow">
      <div className="mrow__head">
        <div>
          {kicker && <span className="mrow__kicker">{kicker}</span>}
          <h2>{title}</h2>
        </div>
        <div className="mrow__tools">
          {onMore && <button className="mrow__more" onClick={onMore}>Voir tout</button>}
          <div className="mrow__navs">
            <button aria-label="Précédent" onClick={() => scroll(-1)}><Ic d={ICON.chevL} size={18} /></button>
            <button aria-label="Suivant" onClick={() => scroll(1)}><Ic d={ICON.chevR} size={18} /></button>
          </div>
        </div>
      </div>
      <div className="mrow__track" ref={ref}>
        {items.map((p, i) => <div className="mrow__cell" key={p.id}><ProductCardMkt product={p} rank={ranked ? i + 1 : null} /></div>)}
      </div>
    </section>
  );
}

const BANNERS = [
  { bg: "assets/uni-pokemon.png?v=2", kicker: "Cartes à collectionner", title: "Cartes Pokémon", sub: "Écarlate & Violet, ETB, boosters, collectors…", cta: "Voir les Pokémon", to: { name: "catalogue", univers: "pokemon" } },
  { bg: "assets/uni-societe.png?v=3", kicker: "Pour toute la famille", title: "Jeux de société", sub: "Catan, Dixit, 7 Wonders, Skyjo & les classiques.", cta: "Découvrir", to: { name: "catalogue", univers: "societe" } },
  { bg: "assets/uni-manga.png?v=1", kicker: "Pop culture nippone", title: "Manga & Goodies", sub: "Tomes, haori, figurines POP! à Papeete.", cta: "Explorer le manga", to: { name: "catalogue", univers: "manga" } },
];

function HeroBanner() {
  const { navigate } = useStore();
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BANNERS.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hbanner">
      <div className="hbanner__track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {BANNERS.map((b, k) => (
          <div className="hslide" key={k} style={{ backgroundImage: `linear-gradient(90deg, rgba(20,12,12,.86) 0%, rgba(20,12,12,.55) 42%, rgba(20,12,12,.12) 78%), url(${RES(b.bg)})` }}>
            <div className="hslide__in">
              <span className="hslide__kicker">{b.kicker}</span>
              <h1>{b.title}</h1>
              <p>{b.sub}</p>
              <Btn variant="primary" size="lg" onClick={() => navigate(b.to)}>{b.cta}</Btn>
            </div>
          </div>
        ))}
      </div>
      <button className="hbanner__nav hbanner__nav--l" aria-label="Précédent" onClick={() => setI((i - 1 + BANNERS.length) % BANNERS.length)}><Ic d={ICON.chevL} size={22} /></button>
      <button className="hbanner__nav hbanner__nav--r" aria-label="Suivant" onClick={() => setI((i + 1) % BANNERS.length)}><Ic d={ICON.chevR} size={22} /></button>
      <div className="hbanner__dots">
        {BANNERS.map((_, k) => <button key={k} className={k === i ? "on" : ""} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} />)}
      </div>
    </section>
  );
}

const TRUST = [
  { ic: "shop", t: "Boutique à Papeete", d: "depuis le fenua" },
  { ic: "pin", t: "Retrait gratuit en 1 h", d: "89 Rue Dumont d'Urville" },
  { ic: "truck", t: "Livraison Tahiti & îles", d: "expédition sous 24–48 h" },
  { ic: "heart", t: "+21 000 fans", d: "la communauté du fenua" },
];

function TrustStrip() {
  return (
    <div className="trust">
      {TRUST.map((x, i) => (
        <div className="trust__item" key={i}>
          <Ic d={ICON[x.ic]} size={22} solid={x.ic === "heart"} />
          <div><strong>{x.t}</strong><span>{x.d}</span></div>
        </div>
      ))}
    </div>
  );
}

function PromoTiles() {
  const { navigate } = useStore();
  const tiles = [
    { cls: "promo--red", k: "En ce moment", t: "Bons plans", d: "Tous les articles en réduction", cta: "J'en profite", to: { name: "catalogue", view: "promo" } },
    { cls: "promo--dark", k: "Fraîchement arrivés", t: "Nouveautés", d: "Les derniers arrivages du fenua", cta: "Je découvre", to: { name: "catalogue", view: "nouveau" } },
    { cls: "promo--light", k: "Vite, avant rupture", t: "Stock limité", d: "Les pièces bientôt épuisées", cta: "Je fonce", to: { name: "catalogue", view: "limite" } },
  ];
  return (
    <div className="promotiles">
      {tiles.map((t, i) => (
        <button key={i} className={`promo ${t.cls}`} onClick={() => navigate(t.to)}>
          <span className="promo__k">{t.k}</span>
          <span className="promo__t">{t.t}</span>
          <span className="promo__d">{t.d}</span>
          <span className="promo__cta">{t.cta} <Ic d={ICON.arrow} size={15} /></span>
        </button>
      ))}
    </div>
  );
}

function CommunityBand() {
  return (
    <section className="community">
      <div className="wrap community__in">
        <div className="community__mascot"><Mascot size={96} mood="celebrate" /></div>
        <div className="community__txt">
          <h2>Rejoignez +21 000 fans à Tahiti</h2>
          <p>Arrivages, ouvertures de boosters, concours et bons plans : toute la vie de la boutique en direct sur Facebook.</p>
        </div>
        <a className="btn btn--light btn--lg community__btn" href="https://facebook.com" target="_blank" rel="noopener"><Ic d={ICON.fb} size={18} solid /> Suivre la boutique</a>
      </div>
    </section>
  );
}

export function HomeMarketplace() {
  const { navigate } = useStore();
  const products = JIE.products;
  const best = products.filter((p) => p.best);
  const nouveautes = products.filter((p) => p.badges.includes("nouveau") || p.badges.includes("limite"));
  const promos = products.filter((p) => p.oldPrice && p.stock > 0);

  return (
    <div className="page homemkt">
      <div className="annoncebar"><Ic d={ICON.spark} size={15} /> Nouveaux arrivages chaque semaine · Retrait gratuit en boutique à Papeete</div>

      <div className="wrap"><HeroBanner /></div>

      <div className="wrap"><TrustStrip /></div>

      <div className="wrap">
        <MktRow title="Meilleures ventes" kicker="Les chouchous du fenua" items={best} ranked onMore={() => navigate({ name: "catalogue", sort: "populaire" })} />
      </div>

      <div className="wrap"><PromoTiles /></div>

      <div className="band">
        <div className="wrap">
          <MktRow title="Bons plans du moment" kicker="Prix rouge" items={promos} onMore={() => navigate({ name: "catalogue", sort: "populaire" })} />
        </div>
      </div>

      <div className="wrap">
        <MktRow title="Nouveaux arrivages" kicker="Fraîchement arrivés" items={nouveautes} onMore={() => navigate({ name: "catalogue", sort: "nouveau" })} />
      </div>

      <section className="wrap section">
        <SectionHead kicker="Explorez" title="Nos univers" />
        <UniverseGrid />
      </section>

      <CommunityBand />

      <StoreStrip />
    </div>
  );
}
