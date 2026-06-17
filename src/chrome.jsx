import React, { useState, useCallback, useEffect, useRef } from 'react'
import { JIE } from './data.js'
import { useStore } from './store.jsx'
import { Ic, ICON } from './components.jsx'
import { LogoBadge } from './mascot.jsx'

const IconSearch = (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
const IconCart = (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1.6" /><circle cx="18" cy="20" r="1.6" /><path d="M6 6L5 2H2" /></svg>;
const IconMenu = (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
const IconClose = (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;
const IconHome = (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>;
const IconGrid = (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></svg>;
const IconPin = (p) => <svg viewBox="0 0 24 24" width="22" height="22" {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></svg>;

export function SearchBar({ autoFocus }) {
  const { navigate, route } = useStore();
  const [q, setQ] = useState(route.name === "catalogue" ? (route.q || "") : "");
  const submit = (e) => { e.preventDefault(); navigate({ name: "catalogue", q: q.trim() }); };
  return (
    <form className="search" onSubmit={submit} role="search">
      <IconSearch className="search__ic" />
      <input
        autoFocus={autoFocus}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher un jeu, une carte, un manga…"
        aria-label="Rechercher"
      />
      {q && <button type="button" className="search__clear" aria-label="Effacer" onClick={() => setQ("")}><IconClose width="16" height="16" /></button>}
    </form>
  );
}

function UniverseNav({ universes, route, navigate }) {
  const ref = useRef(null);
  const [ind, setInd] = useState({ w: 100, x: 0, show: false });

  const update = useCallback(() => {
    const el = ref.current; if (!el) return;
    const { scrollWidth, clientWidth, scrollLeft } = el;
    const overflow = scrollWidth - clientWidth;
    if (overflow <= 4) { setInd((s) => ({ ...s, show: false })); return; }
    const w = Math.max(18, (clientWidth / scrollWidth) * 100);
    const x = (scrollLeft / overflow) * (100 - w);
    setInd({ w, x, show: true });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current; if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  return (
    <div className="hdr__navwrap">
      <nav className="hdr__nav" aria-label="Univers" ref={ref}>
        <button className={`hdr__navlink ${route.name === "catalogue" && !route.univers ? "is-active" : ""}`} onClick={() => navigate({ name: "catalogue" })}>Tout</button>
        {universes.map((u) => (
          <button key={u.id} className={`hdr__navlink ${route.univers === u.id ? "is-active" : ""}`} onClick={() => navigate({ name: "catalogue", univers: u.id })}>
            {u.short}
          </button>
        ))}
      </nav>
      <div className={`hdr__navbar ${ind.show ? "show" : ""}`} aria-hidden="true">
        <span className="hdr__navbar__thumb" style={{ width: ind.w + "%", left: ind.x + "%" }} />
      </div>
    </div>
  );
}

export function Header() {
  const { navigate, cartCount, openCart, route } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const universes = JIE.universes;

  return (
    <>
      <header className="hdr">
        <div className="hdr__bar">
          <button className="hdr__icon hdr__menu" aria-label="Menu" onClick={() => setMenuOpen(true)}><IconMenu /></button>

          <a className="hdr__brand" onClick={() => navigate("home")} role="button" tabIndex={0}>
            <LogoBadge size={46} />
            <span className="hdr__brandtxt">
              <strong>Jeux Import Export</strong>
              <em>Papeete · Tahiti</em>
            </span>
          </a>

          <div className="hdr__search"><SearchBar /></div>

          <div className="hdr__actions">
            <button className="hdr__icon hdr__searchtoggle" aria-label="Rechercher" onClick={() => setSearchOpen((s) => !s)}><IconSearch /></button>
            <button className="hdr__icon hdr__cart" aria-label="Panier" onClick={openCart}>
              <IconCart />
              {cartCount > 0 && <span className="hdr__count">{cartCount}</span>}
            </button>
          </div>
        </div>

        {searchOpen && <div className="hdr__searchmobile"><SearchBar autoFocus /></div>}

        <UniverseNav universes={universes} route={route} navigate={navigate} />
      </header>

      <div className={`drawer-scrim ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`menu ${menuOpen ? "show" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu__head">
          <LogoBadge size={52} />
          <button className="hdr__icon" aria-label="Fermer" onClick={() => setMenuOpen(false)}><IconClose /></button>
        </div>
        <p className="menu__label">Nos univers</p>
        <button className="menu__link" onClick={() => { navigate({ name: "catalogue" }); setMenuOpen(false); }}>
          Toute la boutique <Ic className="menu__chev" d={ICON.arrow} size={16} />
        </button>
        {universes.map((u) => (
          <button key={u.id} className="menu__link" onClick={() => { navigate({ name: "catalogue", univers: u.id }); setMenuOpen(false); }}>
            {u.name} <Ic className="menu__chev" d={ICON.arrow} size={16} />
          </button>
        ))}
        <p className="menu__label">Infos</p>
        <button className="menu__link menu__link--ic" onClick={() => { navigate("store"); setMenuOpen(false); }}><Ic d={ICON.pin} size={18} /> La boutique</button>
        <a className="menu__link menu__link--ic" href="tel:89491491"><Ic d={ICON.phone} size={18} /> 89 49 14 91</a>
      </aside>
    </>
  );
}

export function TabBar() {
  const { navigate, route, cartCount, openCart } = useStore();
  const Item = ({ icon, label, active, onClick, badge }) => (
    <button className={`tab ${active ? "is-active" : ""}`} onClick={onClick}>
      <span className="tab__ic">{icon}{badge > 0 && <span className="tab__badge">{badge}</span>}</span>
      <span>{label}</span>
    </button>
  );
  return (
    <nav className="tabbar" aria-label="Navigation">
      <Item icon={<IconHome />} label="Accueil" active={route.name === "home"} onClick={() => navigate("home")} />
      <Item icon={<IconGrid />} label="Boutique" active={route.name === "catalogue"} onClick={() => navigate({ name: "catalogue" })} />
      <Item icon={<IconPin />} label="Magasin" active={route.name === "store"} onClick={() => navigate("store")} />
      <Item icon={<IconCart />} label="Panier" badge={cartCount} onClick={openCart} />
    </nav>
  );
}

const IconFb = (p) => <svg viewBox="0 0 24 24" width="20" height="20" {...p}><path d="M14 9V7c0-1 .5-1.5 1.7-1.5H17V2.5h-2.6C11.7 2.5 10.5 4 10.5 6.4V9H8v3.2h2.5V21h3.5v-8.8h2.6l.4-3.2z" fill="currentColor" stroke="none" /></svg>;

export function Footer() {
  const { navigate } = useStore();
  const universes = JIE.universes;
  return (
    <footer className="ftr">
      <div className="ftr__top">
        <div className="ftr__brand">
          <LogoBadge size={84} />
          <p>Le jeu, le manga et la collection, à Tahiti. Votre boutique de référence à Papeete depuis le fenua.</p>
          <a className="ftr__fb" href="https://facebook.com" target="_blank" rel="noopener"><IconFb /> Suivez-nous · +21 000 fans</a>
        </div>
        <div className="ftr__col">
          <h4>Univers</h4>
          {universes.map((u) => <button key={u.id} onClick={() => navigate({ name: "catalogue", univers: u.id })}>{u.name}</button>)}
        </div>
        <div className="ftr__col">
          <h4>La boutique</h4>
          <button onClick={() => navigate("store")}>Adresse & plan</button>
          <button onClick={() => navigate("store")}>Horaires d'ouverture</button>
          <button onClick={() => navigate("store")}>Retrait en boutique</button>
          <a href="tel:89491491">Tél. 89 49 14 91</a>
        </div>
        <div className="ftr__col ftr__contact">
          <h4>Nous trouver</h4>
          <p>89 Rue Dumont d'Urville<br />Papeete, Tahiti</p>
          <p>Lun–Ven : 9h–11h / 11h30–16h30<br />Samedi : 8h–12h<br />Fermé les jours fériés</p>
        </div>
      </div>
      <div className="ftr__legal">
        <span>© {new Date().getFullYear()} Jeux Import Export SARL au capital de 1 000 000 F · RCS Papeete · Démo non transactionnelle</span>
        <span className="ftr__links">
          <a href="#">Mentions légales</a> · <a href="#">CGV</a> · <a href="#">Confidentialité</a>
        </span>
      </div>
    </footer>
  );
}

export { IconSearch, IconClose };
