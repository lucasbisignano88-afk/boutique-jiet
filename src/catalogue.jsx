import React, { useState, useEffect } from 'react'
import { JIE } from './data.js'
import { useStore, getUniverse } from './store.jsx'
import { Btn, Ic, ICON, F, ProductCard, EmptyState } from './components.jsx'
import { IconClose } from './chrome.jsx'

const SORTS = [
  { id: "pertinence", label: "Pertinence" },
  { id: "nouveau", label: "Nouveautés" },
  { id: "populaire", label: "Popularité" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
];
const PRICE_MAX = 35000;
const VIEW_TITLE = { promo: "Bons plans", nouveau: "Nouveautés", limite: "Stock limité" };
const isPromo = (p) => !!p.oldPrice && p.stock > 0;
const isLimite = (p) => p.stock > 0 && (p.badges.includes("limite") || p.stock <= 5);
const isNouveau = (p) => p.badges.includes("nouveau");

export function CataloguePage() {
  const { route, navigate } = useStore();
  const all = JIE.products;
  const universes = JIE.universes;

  const [unis, setUnis] = useState(() => new Set(route.univers ? [route.univers] : []));
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [onlyBoutique, setOnlyBoutique] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [sort, setSort] = useState(route.sort || "pertinence");
  const [sheet, setSheet] = useState(false);
  const view = route.view || null;
  const q = (route.q || "").toLowerCase();

  useEffect(() => {
    setUnis(new Set(route.univers ? [route.univers] : []));
    if (route.sort) setSort(route.sort);
  }, [route.univers, route.sort, route.q, route.view]);

  const toggleUni = (id) => setUnis((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  let list = all.filter((p) => {
    if (view === "promo" && !isPromo(p)) return false;
    if (view === "nouveau" && !isNouveau(p)) return false;
    if (view === "limite" && !isLimite(p)) return false;
    if (unis.size && !unis.has(p.univers)) return false;
    if (p.price > priceMax) return false;
    if (onlyBoutique && !p.boutique) return false;
    if (onlyNew && !p.badges.includes("nouveau")) return false;
    if (q && !(p.name.toLowerCase().includes(q) || getUniverse(p.univers).name.toLowerCase().includes(q))) return false;
    return true;
  });
  const SR = JIE.statusRank;
  list = [...list].sort((a, b) => {
    const ao = a.stock === 0, bo = b.stock === 0;
    if (ao !== bo) return ao - bo;
    if (sort === "prix-asc") return a.price - b.price;
    if (sort === "prix-desc") return b.price - a.price;
    if (sort === "nouveau") return (b.badges.includes("nouveau") - a.badges.includes("nouveau")) || b.reviews - a.reviews;
    if (sort === "populaire") return (b.best - a.best) || b.reviews - a.reviews;
    return SR(a) - SR(b);
  });

  const activeCount = unis.size + (onlyBoutique ? 1 : 0) + (onlyNew ? 1 : 0) + (priceMax < PRICE_MAX ? 1 : 0);
  const reset = () => { setUnis(new Set()); setPriceMax(PRICE_MAX); setOnlyBoutique(false); setOnlyNew(false); };

  const title = view ? VIEW_TITLE[view] : unis.size === 1 ? getUniverse([...unis][0]).name : q ? `« ${route.q} »` : "Toute la boutique";

  const Filters = () => (
    <div className="filters">
      <div className="filters__group">
        <h4>Univers</h4>
        {universes.map((u) => (
          <label key={u.id} className="check">
            <input type="checkbox" checked={unis.has(u.id)} onChange={() => toggleUni(u.id)} />
            <span className="check__box" /><span>{u.name}</span>
          </label>
        ))}
      </div>
      <div className="filters__group">
        <h4>Prix maximum</h4>
        <input className="range" type="range" min="500" max={PRICE_MAX} step="500" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} />
        <div className="filters__pricelbl">Jusqu'à <strong>{F(priceMax)}</strong></div>
      </div>
      <div className="filters__group">
        <h4>Disponibilité</h4>
        <label className="check"><input type="checkbox" checked={onlyBoutique} onChange={(e) => setOnlyBoutique(e.target.checked)} /><span className="check__box" /><span>Dispo en boutique</span></label>
        <label className="check"><input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} /><span className="check__box" /><span>Nouveautés</span></label>
      </div>
      {activeCount > 0 && <button className="filters__reset" onClick={reset}>Réinitialiser les filtres</button>}
    </div>
  );

  return (
    <div className="page catalogue">
      <div className="wrap">
        <div className="cathead">
          <div>
            <div className="crumb"><button onClick={() => navigate("home")}>Accueil</button> / Boutique</div>
            <h1>{title}</h1>
            {view
              ? <p className="cathead__count">{list.length} article{list.length > 1 ? "s" : ""} · <button className="cathead__clear" onClick={() => navigate({ name: "catalogue" })}>voir tout le catalogue</button></p>
              : <p className="cathead__count">{list.length} article{list.length > 1 ? "s" : ""}</p>}
          </div>
          <div className="cathead__sort">
            <label>Trier&nbsp;:
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="catlayout">
          <aside className="catlayout__side">
            <Filters />
          </aside>

          <div className="catlayout__main">
            <button className="filterbtn" onClick={() => setSheet(true)}>
              Filtrer & trier {activeCount > 0 && <span className="filterbtn__n">{activeCount}</span>}
            </button>

            {list.length === 0 ? (
              <EmptyState mood="sad" title="Aucun résultat" action={<Btn variant="primary" onClick={reset}>Réinitialiser les filtres</Btn>}>
                On n'a rien trouvé pour cette recherche. Essayez d'autres mots-clés ou élargissez les filtres.
              </EmptyState>
            ) : (
              <div className="grid grid--cards">
                {list.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`sheet-scrim ${sheet ? "show" : ""}`} onClick={() => setSheet(false)} />
      <div className={`sheet ${sheet ? "show" : ""}`}>
        <div className="sheet__head"><h3>Filtrer & trier</h3><button className="hdr__icon" onClick={() => setSheet(false)}><IconClose /></button></div>
        <div className="sheet__body">
          <div className="filters__group">
            <h4>Trier par</h4>
            <div className="segs">
              {SORTS.map((s) => <button key={s.id} className={`seg ${sort === s.id ? "is-active" : ""}`} onClick={() => setSort(s.id)}>{s.label}</button>)}
            </div>
          </div>
          <Filters />
        </div>
        <div className="sheet__foot"><Btn variant="primary" className="btn--block" onClick={() => setSheet(false)}>Voir {list.length} article{list.length > 1 ? "s" : ""}</Btn></div>
      </div>
    </div>
  );
}
