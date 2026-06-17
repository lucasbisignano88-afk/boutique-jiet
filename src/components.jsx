import React from 'react'
import { JIE } from './data.js'
import { useStore, getUniverse } from './store.jsx'
import { Mascot } from './mascot.jsx'

export const F = (n) => JIE.formatF(n);

export function RES(p) {
  if (!p) return p;
  return p;
}

export const Ic = ({ d, size = 20, solid = false, style, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style}
       fill={solid ? "currentColor" : "none"} stroke={solid ? "none" : "currentColor"}
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const ICON = {
  shop: "M5 8h14l1 3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-4 0M4 11V5h16v6M6 21v-7h5v7M14 14h4v4h-4z",
  truck: "M3 6h11v9H3zM14 9h3.5l2.5 3v3H14zM7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  phone: "M6.5 10.5a14 14 0 0 0 7 7l2-2a1 1 0 0 1 1-.25 11 11 0 0 0 3.2.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .5 3.2 1 1 0 0 1-.25 1z",
  clock: "M12 7.5V12l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z",
  car: "M5 13l1.6-5h10.8L19 13M4 13h16v5H4zM7 18v2M17 18v2M7.5 15.5h.01M16.5 15.5h.01",
  pin: "M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12zM12 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z",
  check: "M8.5 12.5l2.5 2.5 5-5M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z",
  heart: "M12 20.3l-1.4-1.3C6 14.9 3.5 12.6 3.5 9.6 3.5 7.3 5.3 5.5 7.6 5.5c1.3 0 2.6.6 3.4 1.6l1 1.2 1-1.2c.8-1 2.1-1.6 3.4-1.6 2.3 0 4.1 1.8 4.1 4.1 0 3-2.5 5.3-7.1 9.4z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  cartPlus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6L6 18",
  send: "M4 12l16-8-6 16-3-6-7-2z",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z",
  trash: "M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13",
  tag: "M20.6 13.4l-7.2 7.2a1.6 1.6 0 0 1-2.2 0l-7.4-7.4a1.6 1.6 0 0 1-.4-1V5.6A1.6 1.6 0 0 1 5 4h6.6a1.6 1.6 0 0 1 1.1.5l7.9 7.9a1.5 1.5 0 0 1 0 1z",
  flame: "M12 2.5c1.6 3.2 4.8 4.6 4.8 8.4a4.8 4.8 0 0 1-9.6 0c0-1.3.4-2.2 1.1-3 .2 1.1.9 1.8 1.8 2C9.4 8 10.7 5.5 12 2.5z",
  sparkles: "M12 3l1.8 5L19 9.8 13.8 11.6 12 17l-1.8-5.4L5 9.8 10.2 8z",
  chevL: "M15 6l-6 6 6 6",
  chevR: "M9 6l6 6-6 6",
  spark: "M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7z",
  fb: "M14 9V7c0-1 .4-1.4 1.5-1.4H17V2.6h-2.7C11.8 2.6 10.5 4 10.5 6.3V9H8v3.1h2.5V21h3.5v-8.9h2.5l.5-3.1z",
};

export const Btn = ({ variant = "primary", size = "", className = "", children, ...rest }) => (
  <button className={`btn btn--${variant} ${size ? "btn--" + size : ""} ${className}`} {...rest}>
    {children}
  </button>
);

const BADGE_LABEL = { nouveau: "Nouveau", limite: "Stock limité", shop: "Dispo boutique", epuise: "Épuisé" };
export const Badge = ({ type, children }) => (
  <span className={`badge badge--${type}`}>{children || BADGE_LABEL[type]}</span>
);

export const Price = ({ value, className = "" }) => <span className={`price ${className}`}>{F(value)}</span>;

export const Stars = ({ rating = 0, reviews }) => {
  const full = Math.round(rating);
  return (
    <span className="stars" title={`${rating} / 5`}>
      <span className="stars__row" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" width="14" height="14" className={i < full ? "on" : ""}>
            <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.9 6.1 20.2 7.3 13.6 2.5 9l6.6-.9z" />
          </svg>
        ))}
      </span>
      {reviews != null && <span className="stars__num">{rating.toFixed(1)} ({reviews})</span>}
    </span>
  );
};

export const ProductImage = ({ product, className = "", showTag = true }) => {
  const u = getUniverse(product.univers);
  if (product.img) {
    return (
      <div className={`pimg pimg--real ${className}`}>
        <img src={RES(product.img)} alt={product.name} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`pimg ${className}`}>
      <div className="pimg__stripes" />
      <span className="pimg__wm">{u ? u.short : "Jeu"}</span>
      {showTag && <span className="pimg__tag">photo produit</span>}
    </div>
  );
};

export const productBadges = function(p) {
  const out = p.stock === 0;
  const b = [];
  if (p.badges.includes("nouveau")) b.push("nouveau");
  if (out) b.push("epuise");
  else if (p.badges.includes("limite") || p.stock <= 5) b.push("limite");
  return b;
};

export const ProductCard = ({ product }) => {
  const { addToCart, navigate } = useStore();
  const open = () => navigate({ name: "product", id: product.id });
  const out = product.stock === 0;
  return (
    <article className={`card ${out ? "card--out" : ""}`} onClick={open}>
      <div className="card__media">
        <ProductImage product={product} />
        <div className="card__badges">
          {productBadges(product).map((t) => <Badge key={t} type={t} />)}
        </div>
        {!out && (
          <button
            className="card__add"
            aria-label="Ajouter au panier"
            onClick={(e) => { e.stopPropagation(); addToCart(product.id, 1); }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 5v14M5 12h14" /></svg>
            <span>Ajouter</span>
          </button>
        )}
      </div>
      <div className="card__body">
        <span className="card__uni">{getUniverse(product.univers)?.short}</span>
        <h3 className="card__name">{product.name}</h3>
        <div className="card__foot">
          <span className="card__prices">
            {product.oldPrice && !out && <span className="card__old">{F(product.oldPrice)}</span>}
            <Price value={product.price} className={product.oldPrice && !out ? "price--promo" : ""} />
          </span>
          {out ? <span className="card__out">Épuisé</span> : product.boutique && <span className="card__shop">● Boutique</span>}
        </div>
      </div>
    </article>
  );
};

const REASSURANCE = [
  { ic: "M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 21V12h6v9", t: "Retrait en boutique", d: "Gratuit à Papeete, prêt en 1 h", acc: "var(--brand)" },
  { ic: "M5 11V7a7 7 0 0 1 14 0v4 M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z M12 15v3", t: "Paiement sécurisé", d: "CB, espèces & virement", acc: "#1F9D55" },
  { ic: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", t: "+21 000 fans", d: "La communauté du fenua", acc: "#E8A11C" },
  { ic: "M16 3h5v5 M21 3l-7 7 M8 21H3v-5 M3 21l7-7", t: "Livraison Tahiti & îles", d: "Expédition dans tout le fenua", acc: "var(--brand)" },
];

export const ReassuranceRow = () => (
  <div className="reassure">
    {REASSURANCE.map((r, i) => (
      <div className="reassure__item" key={i} style={{ "--acc": r.acc }}>
        <span className="reassure__ic"><svg viewBox="0 0 24 24" width="26" height="26"><path d={r.ic} /></svg></span>
        <strong>{r.t}</strong>
        <span className="reassure__d">{r.d}</span>
      </div>
    ))}
  </div>
);

export const EmptyState = ({ mood = "sad", title, children, action }) => (
  <div className="empty">
    <Mascot size={140} mood={mood} />
    <h3>{title}</h3>
    {children && <p>{children}</p>}
    {action}
  </div>
);

export const Loader = ({ label = "Chargement…" }) => (
  <div className="loader">
    <div className="loader__bob"><Mascot size={84} mood="happy" /></div>
    <span>{label}</span>
  </div>
);

export const Toast = () => {
  const { toast } = useStore();
  return (
    <div className={`toast ${toast ? "toast--show" : ""}`} role="status" aria-live="polite">
      <span className="toast__dot" />{toast}
    </div>
  );
};

export const QtyStepper = ({ value, onChange, min = 1, removable = false }) => {
  const showTrash = removable && value <= 1;
  return (
    <div className="qty">
      <button aria-label={showTrash ? "Retirer" : "Diminuer"} className={showTrash ? "qty__rm" : ""} onClick={() => onChange(Math.max(removable ? 0 : min, value - 1))}>
        {showTrash ? <Ic d={ICON.trash} size={15} /> : "−"}
      </button>
      <span>{value}</span>
      <button aria-label="Augmenter" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
};
