import React, { useState, useEffect } from 'react'
import { JIE } from './data.js'
import { useStore, getProduct, getUniverse } from './store.jsx'
import { Btn, Ic, ICON, F, Price, ProductImage, productBadges, Badge, ProductCard, EmptyState, Loader, Stars, QtyStepper } from './components.jsx'
import { SectionHead } from './home.jsx'

export function ProductPage() {
  const { route, navigate, addToCart } = useStore();
  const product = getProduct(route.id);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [tab, setTab] = useState("desc");
  useEffect(() => { setQty(1); setView(0); setTab("desc"); }, [route.id]);

  if (!product) {
    return <div className="page wrap section"><EmptyState mood="sad" title="Produit introuvable" action={<Btn onClick={() => navigate({ name: "catalogue" })}>Retour à la boutique</Btn>} /></div>;
  }

  const u = getUniverse(product.univers);
  const similar = JIE.products.filter((p) => p.univers === product.univers && p.id !== product.id).slice(0, 4);
  const lowStock = product.stock <= 5;
  const out = product.stock === 0;

  return (
    <div className="page product">
      <div className="wrap">
        <div className="crumb">
          <button onClick={() => navigate("home")}>Accueil</button> /
          <button onClick={() => navigate({ name: "catalogue", univers: product.univers })}> {u.name}</button> /
          <span> {product.name}</span>
        </div>

        <div className="pd">
          <div className="pd__gallery">
            <div className="pd__main">
              <ProductImage product={product} showTag />
              <div className="pd__badges">
                {productBadges(product).map((t) => <Badge key={t} type={t} />)}
              </div>
            </div>
            <div className="pd__thumbs">
              {[0, 1, 2, 3].map((i) => (
                <button key={i} className={`pd__thumb ${view === i ? "is-active" : ""}`} onClick={() => setView(i)}>
                  <ProductImage product={product} showTag={false} />
                </button>
              ))}
            </div>
          </div>

          <div className="pd__info">
            <span className="pd__uni" onClick={() => navigate({ name: "catalogue", univers: product.univers })}>{u.name}</span>
            <h1>{product.name}</h1>
            <div className="pd__rating"><Stars rating={product.rating} reviews={product.reviews} /></div>
            <div className="pd__price">
              {product.oldPrice && product.stock > 0 && <span className="pd__old">{F(product.oldPrice)}</span>}
              <Price value={product.price} className={product.oldPrice && product.stock > 0 ? "price--promo" : ""} />
              <span className="pd__ttc">TTC</span>
            </div>

            <div className="pd__stock">
              {product.stock > 0
                ? <span className={`stockdot ${lowStock ? "low" : "ok"}`}>● {lowStock ? `Plus que ${product.stock} en stock` : "En stock"}</span>
                : <span className="stockdot out">● Épuisé</span>}
              {!out && <Badge type="shop" />}
            </div>

            {out ? (
              <div className="pd__buy">
                <button className="btn btn--outline btn--lg btn--block" disabled>Article épuisé</button>
              </div>
            ) : (
              <div className="pd__buy">
                <QtyStepper value={qty} onChange={setQty} />
                <Btn variant="primary" size="lg" onClick={() => addToCart(product.id, qty, true)}>
                  Ajouter au panier · {F(product.price * qty)}
                </Btn>
              </div>
            )}

            <div className="pickup">
              <span className="pickup__ic"><Ic d={ICON.shop} size={26} /></span>
              <div>
                <strong>Retrait en boutique gratuit</strong>
                <span>Prêt en 1 h au 89 Rue Dumont d'Urville, Papeete. Livraison Tahiti & îles également disponible.</span>
              </div>
            </div>

            <div className="tabs">
              <div className="tabs__head">
                <button className={tab === "desc" ? "is-active" : ""} onClick={() => setTab("desc")}>Description</button>
                <button className={tab === "det" ? "is-active" : ""} onClick={() => setTab("det")}>Détails</button>
              </div>
              <div className="tabs__body">
                {tab === "desc"
                  ? <p>{product.desc || "Un indispensable de la boutique, sélectionné pour les passionnés du fenua."}</p>
                  : <ul className="detlist">{product.details.map((d, i) => <li key={i}>{d}</li>)}<li>Disponible au retrait en boutique</li></ul>}
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="section">
            <SectionHead kicker="Vous aimerez aussi" title="Produits similaires" />
            <div className="grid grid--cards">{similar.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </section>
        )}
      </div>
    </div>
  );
}
