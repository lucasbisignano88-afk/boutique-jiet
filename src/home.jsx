import React, { useRef } from 'react'
import { JIE } from './data.js'
import { useStore } from './store.jsx'
import { Btn, Ic, ICON, RES, ProductCard, ReassuranceRow } from './components.jsx'
import { Mascot } from './mascot.jsx'

function HeroClassic() {
  const { navigate } = useStore();
  return (
    <section className="hero hero--classic">
      <div className="hero__deco" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__txt">
          <span className="hero__eyebrow">Boutique de Papeete · depuis le fenua</span>
          <h1>Le jeu, le manga<br />et la collection,<br /><span className="hero__hl">à Tahiti</span>.</h1>
          <p>Cartes Pokémon & Yu-Gi-Oh!, jeux de société, LEGO, manga et goodies. Retrait gratuit en boutique ou livraison dans tout le fenua.</p>
          <div className="hero__cta">
            <Btn variant="light" size="lg" onClick={() => navigate({ name: "catalogue" })}>Découvrir la boutique</Btn>
            <Btn variant="ghostlight" size="lg" onClick={() => navigate({ name: "catalogue", sort: "nouveau" })}>Nouveaux arrivages</Btn>
          </div>
          <div className="hero__fans"><span className="hero__heart"><Ic d={ICON.heart} size={15} solid /></span> Rejoint par +21 000 fans à Tahiti</div>
        </div>
        <div className="hero__art">
          <div className="hero__halo" />
          <Mascot size={300} mood="celebrate" className="hero__mascot" />
        </div>
      </div>
    </section>
  );
}

function HeroPlayful() {
  const { navigate } = useStore();
  const confetti = [
    ["6%", "18%", "#FFB627", 0], ["14%", "70%", "#16B8A6", 1], ["82%", "12%", "#FFB627", 2],
    ["90%", "62%", "#fff", 0.5], ["46%", "8%", "#fff", 1.5], ["70%", "84%", "#FFB627", 0.8],
  ];
  return (
    <section className="hero hero--playful">
      {confetti.map(([l, t, c, d], i) => (
        <span key={i} className="confetti" style={{ left: l, top: t, background: c, animationDelay: d + "s" }} />
      ))}
      <div className="hero__center">
        <Mascot size={170} mood="celebrate" />
        <h1>Le jeu, le manga &amp; la collection,<br /><span className="hero__hl">à Tahiti</span>.</h1>
        <p>La boutique de référence du jeu, des cartes à collectionner et du manga à Papeete.</p>
        <div className="hero__cta">
          <Btn variant="light" size="lg" onClick={() => navigate({ name: "catalogue" })}>Découvrir la boutique</Btn>
          <Btn variant="ghostlight" size="lg" onClick={() => navigate({ name: "catalogue", sort: "nouveau" })}>Nouveaux arrivages</Btn>
        </div>
        <div className="hero__fans"><span className="hero__heart"><Ic d={ICON.heart} size={15} solid /></span> +21 000 fans · Retrait gratuit en boutique</div>
      </div>
    </section>
  );
}

function HeroSplit() {
  const { navigate } = useStore();
  return (
    <section className="hero hero--split">
      <div className="hero__left">
        <span className="hero__eyebrow hero__eyebrow--dark">89 Rue Dumont d'Urville · Papeete</span>
        <h1>Le jeu, le manga<br />et la collection,<br /><span className="hero__hl">à Tahiti</span>.</h1>
        <p>Des cartes Pokémon aux escape games : tout l'univers du jeu réuni dans votre boutique de Papeete.</p>
        <div className="hero__cta">
          <Btn variant="primary" size="lg" onClick={() => navigate({ name: "catalogue" })}>Découvrir la boutique</Btn>
          <Btn variant="outline" size="lg" onClick={() => navigate({ name: "catalogue", sort: "nouveau" })}>Nouveaux arrivages</Btn>
        </div>
        <div className="hero__fans hero__fans--dark"><span className="hero__heart"><Ic d={ICON.heart} size={15} solid /></span> +21 000 fans à Tahiti</div>
      </div>
      <div className="hero__right">
        <div className="hero__halo" />
        <Mascot size={210} mood="happy" className="hero__mascot" />
      </div>
    </section>
  );
}

export function HeroSwitch({ variant }) {
  if (variant === "playful") return <HeroPlayful />;
  if (variant === "split") return <HeroSplit />;
  return <HeroClassic />;
}

export function Carousel({ items }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };
  return (
    <div className="carou">
      <button className="carou__nav carou__nav--l" aria-label="Précédent" onClick={() => scroll(-1)}>‹</button>
      <div className="carou__track" ref={ref}>
        {items.map((p) => <div className="carou__cell" key={p.id}><ProductCard product={p} /></div>)}
      </div>
      <button className="carou__nav carou__nav--r" aria-label="Suivant" onClick={() => scroll(1)}>›</button>
    </div>
  );
}

export function UniverseGrid() {
  const { navigate } = useStore();
  const universes = JIE.universes;
  const count = (id) => JIE.products.filter((p) => p.univers === id).length;
  const UNI_BG = { pokemon: "assets/uni-pokemon.png?v=2", yugioh: "assets/uni-yugioh.png?v=1", societe: "assets/uni-societe.png?v=3", jouets: "assets/uni-jouets.png?v=1", manga: "assets/uni-manga.png?v=1", logique: "assets/uni-logique.png?v=1", cassetete: "assets/uni-logique.png?v=1" };
  return (
    <div className="unigrid">
      {universes.map((u) => (
        <button key={u.id} type="button" className="unicard" onClick={() => navigate({ name: "catalogue", univers: u.id })}>
          <div className="unicard__bg" style={UNI_BG[u.id] ? { backgroundImage: `url(${RES(UNI_BG[u.id])})` } : undefined} />
          <div className="unicard__scrim" />
          <div className="unicard__overlay">
            <span className="unicard__count">{count(u.id)} articles</span>
            <span className="unicard__name">{u.name}</span>
            <span className="unicard__go">Explorer <Ic d={ICON.arrow} size={14} /></span>
          </div>
        </button>
      ))}
    </div>
  );
}

export function SectionHead({ kicker, title, action, onAction }) {
  return (
    <div className="sechead">
      <div>
        {kicker && <span className="sechead__kicker">{kicker}</span>}
        <h2>{title}</h2>
      </div>
      {action && <button className="sechead__action" onClick={onAction}>{action} →</button>}
    </div>
  );
}

export function StoreStrip() {
  const { navigate } = useStore();
  return (
    <section className="strip">
      <div className="wrap strip__inner">
        <div className="strip__info">
          <span className="strip__kicker"><Ic d={ICON.pin} size={16} /> Votre boutique à Papeete</span>
          <h2>89 Rue Dumont d'Urville</h2>
          <ul className="strip__hours">
            <li><span>Lundi – Vendredi</span><strong>9h–11h · 11h30–16h30</strong></li>
            <li><span>Samedi</span><strong>8h–12h</strong></li>
            <li><span>Dimanche & jours fériés</span><strong>Fermé</strong></li>
          </ul>
          <div className="strip__cta">
            <Btn variant="light" onClick={() => navigate("store")}>Voir la boutique</Btn>
            <a className="strip__phone" href="tel:89491491"><Ic d={ICON.phone} size={18} /> 89 49 14 91</a>
          </div>
        </div>
        <div className="strip__map">
          <div className="mapph">
            <div className="mapph__grid" />
            <span className="mapph__pin"><Ic d={ICON.pin} size={40} /></span>
            <span className="mapph__tag">plan / carte interactive</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ heroVariant }) {
  const { navigate } = useStore();
  const products = JIE.products;
  const nouveautes = products.filter((p) => p.badges.includes("nouveau") || p.badges.includes("limite"));
  const best = products.filter((p) => p.best).slice(0, 8);

  return (
    <div className="page home">
      <HeroSwitch variant={heroVariant} />

      <section className="wrap section">
        <SectionHead kicker="Explorez" title="Nos univers" />
        <UniverseGrid />
      </section>

      <section className="band">
        <div className="wrap section">
          <SectionHead kicker="Fraîchement arrivés" title="Nouveaux arrivages" action="Tout voir" onAction={() => navigate({ name: "catalogue", sort: "nouveau" })} />
          <Carousel items={nouveautes} />
        </div>
      </section>

      <section className="wrap section">
        <SectionHead kicker="Les chouchous" title="Best-sellers" action="Tout voir" onAction={() => navigate({ name: "catalogue", sort: "populaire" })} />
        <div className="grid grid--cards">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="wrap"><ReassuranceRow /></section>

      <StoreStrip />
    </div>
  );
}
